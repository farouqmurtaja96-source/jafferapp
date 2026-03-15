// Drawing layer overlay
const TOOL_PEN = "pen";
const TOOL_ERASER = "eraser";

let currentTool = TOOL_PEN;
let isDrawing = false;
let lastPoint = null;
let activePointerId = null;
let activePointerType = null;
let drawingEnabled = false;

function createDrawingUI() {
    const canvas = document.createElement("canvas");
    canvas.id = "drawing-layer";

    const toolbar = document.createElement("div");
    toolbar.id = "drawing-toolbar";

    const penBtn = document.createElement("button");
    penBtn.id = "drawPenBtn";
    penBtn.type = "button";
    penBtn.textContent = "Pen";

    const eraserBtn = document.createElement("button");
    eraserBtn.id = "drawEraserBtn";
    eraserBtn.type = "button";
    eraserBtn.textContent = "Eraser";

    const clearBtn = document.createElement("button");
    clearBtn.id = "drawClearBtn";
    clearBtn.type = "button";
    clearBtn.textContent = "Clear";

    const colorInput = document.createElement("input");
    colorInput.id = "drawColorInput";
    colorInput.type = "color";
    colorInput.value = "#111827";
    colorInput.title = "Pen color";

    const sizeInput = document.createElement("input");
    sizeInput.id = "drawSizeInput";
    sizeInput.type = "range";
    sizeInput.min = "1";
    sizeInput.max = "20";
    sizeInput.value = "3";

    const sizeValue = document.createElement("span");
    sizeValue.id = "drawSizeValue";
    sizeValue.textContent = sizeInput.value + "px";

    const toggleBtn = document.createElement("button");
    toggleBtn.id = "drawToggleBtn";
    toggleBtn.type = "button";
    toggleBtn.textContent = "Draw: Off";

    toolbar.appendChild(penBtn);
    toolbar.appendChild(eraserBtn);
    toolbar.appendChild(clearBtn);
    toolbar.appendChild(colorInput);
    toolbar.appendChild(sizeInput);
    toolbar.appendChild(sizeValue);
    toolbar.appendChild(toggleBtn);

    document.body.appendChild(canvas);
    document.body.appendChild(toolbar);

    return {
        canvas,
        toolbar,
        penBtn,
        eraserBtn,
        clearBtn,
        colorInput,
        sizeInput,
        sizeValue,
        toggleBtn,
    };
}

function getCanvasContext(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2.5;
    return ctx;
}

function setTool(ctx, tool) {
    currentTool = tool;
    if (tool === TOOL_ERASER) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 18;
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = ctx.strokeStyle || "#111827";
        ctx.lineWidth = ctx.lineWidth || 2.5;
    }
}

function resizeCanvas(canvas, ctx) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function getPointFromEvent(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
}

function drawSmoothLine(ctx, from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

function attachDrawHandlers(canvas, ctx) {
    function startDrawing(e) {
        const isMouse = e.pointerType === "mouse" || !e.pointerType;
        const isTouchOrPen = e.pointerType === "touch" || e.pointerType === "pen";
        if (!drawingEnabled) return;
        if (isMouse && e.button !== 0) return;
        e.preventDefault();
        isDrawing = true;
        activePointerId = e.pointerId || null;
        activePointerType = e.pointerType || null;
        lastPoint = getPointFromEvent(e, canvas);
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        document.body.classList.add("drawing-active");
    }

    function moveDrawing(e) {
        if (!isDrawing || !lastPoint) return;
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        if (
            activePointerType === "mouse" &&
            typeof e.buttons === "number" &&
            (e.buttons & 1) === 0
        ) {
            stopDrawing(e);
            return;
        }
        const point = getPointFromEvent(e, canvas);
        drawSmoothLine(ctx, lastPoint, point);
        lastPoint = point;
    }

    function stopDrawing(e) {
        if (!isDrawing) return;
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        isDrawing = false;
        lastPoint = null;
        activePointerId = null;
        activePointerType = null;
        document.body.classList.remove("drawing-active");
    }

    document.addEventListener("pointerdown", startDrawing);
    document.addEventListener("pointermove", moveDrawing);
    document.addEventListener("pointerup", stopDrawing);
    document.addEventListener("pointercancel", stopDrawing);

    document.addEventListener("contextmenu", (e) => {
        if (isDrawing) e.preventDefault();
    });
}

function initDrawingLayer() {
    const {
        canvas,
        penBtn,
        eraserBtn,
        clearBtn,
        colorInput,
        sizeInput,
        sizeValue,
        toggleBtn,
    } = createDrawingUI();
    const ctx = getCanvasContext(canvas);

    function syncButtonState() {
        penBtn.classList.toggle("is-active", currentTool === TOOL_PEN);
        eraserBtn.classList.toggle("is-active", currentTool === TOOL_ERASER);
        toggleBtn.classList.toggle("is-active", drawingEnabled);
        toggleBtn.textContent = drawingEnabled ? "Draw: On" : "Draw: Off";
        document.body.classList.toggle("drawing-enabled", drawingEnabled);
        document.body.classList.toggle("drawing-toolbar-collapsed", !drawingEnabled);
    }

    penBtn.addEventListener("click", () => {
        setTool(ctx, TOOL_PEN);
        syncButtonState();
    });

    eraserBtn.addEventListener("click", () => {
        setTool(ctx, TOOL_ERASER);
        syncButtonState();
    });

    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    colorInput.addEventListener("input", () => {
        if (currentTool !== TOOL_ERASER) {
            ctx.strokeStyle = colorInput.value;
        }
    });

    sizeInput.addEventListener("input", () => {
        const size = Number(sizeInput.value) || 3;
        sizeValue.textContent = size + "px";
        if (currentTool !== TOOL_ERASER) {
            ctx.lineWidth = size;
        }
    });

    toggleBtn.addEventListener("click", () => {
        drawingEnabled = !drawingEnabled;
        syncButtonState();
    });

    setTool(ctx, TOOL_PEN);
    syncButtonState();

    resizeCanvas(canvas, ctx);
    window.addEventListener("resize", () => resizeCanvas(canvas, ctx));

    attachDrawHandlers(canvas, ctx);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDrawingLayer);
} else {
    initDrawingLayer();
}
