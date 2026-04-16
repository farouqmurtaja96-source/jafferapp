export function wireDialogueEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
}) {
    const dlgList = $("#tdDialogueList");
    if (!dlgList) return;

    dlgList.innerHTML = "";
    (lesson.dialogue.lines || []).forEach((line) => {
        const row = document.createElement("div");
        row.className = "td-row td-dialogue-row";
        row.innerHTML = `
      <input class="td-input td-input--small td-speaker" value="${line.speaker || "A"}" />
      <input class="td-input td-input--ar td-ar" value="${line.ar || ""}" placeholder="Arabic line" />
      <input class="td-input td-input--ar td-arabeezy" value="${line.arArabeezy || ""}" placeholder="Arabeezy line" />
      <input class="td-input td-input--en td-en" value="${line.en || ""}" placeholder="English line" />
      <button type="button" class="btn btn--ghost btn--sm td-delete">Delete</button>
    `;
        row.querySelector(".td-delete")?.addEventListener("click", () => row.remove());
        dlgList.appendChild(row);
    });

    $("#tdAddDialogueLine")?.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "td-row td-dialogue-row";
        row.innerHTML = `
      <input class="td-input td-input--small td-speaker" value="A" />
      <input class="td-input td-input--ar td-ar" value="" placeholder="Arabic line" />
      <input class="td-input td-input--ar td-arabeezy" value="" placeholder="Arabeezy line" />
      <input class="td-input td-input--en td-en" value="" placeholder="English line" />
      <button type="button" class="btn btn--ghost btn--sm td-delete">Delete</button>
    `;
        row.querySelector(".td-delete")?.addEventListener("click", () => row.remove());
        dlgList.appendChild(row);
    });

    $("#tdSaveDialogue")?.addEventListener("click", () => {
        const rows = dlgList.querySelectorAll(".td-dialogue-row");
        const newLines = [];
        rows.forEach((r) => {
            const speaker = r.querySelector(".td-speaker")?.value.trim() || "A";
            const ar = r.querySelector(".td-ar")?.value.trim() || "";
            const arArabeezy = r.querySelector(".td-arabeezy")?.value.trim() || "";
            const en = r.querySelector(".td-en")?.value.trim() || "";
            if (ar) newLines.push({ speaker, ar, arArabeezy, en });
        });
        lesson.dialogue.lines = newLines;
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("Dialogue saved.");
    });
}

export function wireGrammarEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
    escapeAttr,
    escapeHtml,
}) {
    const grammarList = $("#tdGrammarList");
    if (!grammarList) return;

    function renderGrammarRows() {
        grammarList.innerHTML = "";
        (lesson.grammar || []).forEach((g) => {
            const exampleLines = Array.isArray(g.examples)
                ? g.examples.map((ex) => [ex.ar, ex.arabeezy, ex.en].filter(Boolean).join(" | ")).join("\n")
                : "";
            const row = document.createElement("div");
            row.className = "td-quiz-row";
            row.innerHTML = `
        <div class="td-label">Rule title</div>
        <input class="td-input td-grammar-title" value="${escapeAttr(g.title || "")}" />
        <div class="td-label">Description</div>
        <textarea class="td-input td-grammar-desc" rows="2">${escapeHtml(g.description || "")}</textarea>
        <div class="td-label">Examples (Arabic | Arabeezy | English)</div>
        <textarea class="td-input td-grammar-examples" rows="3">${escapeHtml(exampleLines)}</textarea>
        <div class="td-label">Teacher notes</div>
        <textarea class="td-input td-grammar-notes" rows="2">${escapeHtml(g.teacherNotes || "")}</textarea>
      `;
            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "btn btn--ghost btn--sm";
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => row.remove());
            row.appendChild(delBtn);
            grammarList.appendChild(row);
        });
    }

    renderGrammarRows();

    $("#tdAddGrammar")?.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "td-quiz-row";
        row.innerHTML = `
      <div class="td-label">Rule title</div>
      <input class="td-input td-grammar-title" placeholder="Rule title" />
      <div class="td-label">Description</div>
      <textarea class="td-input td-grammar-desc" rows="2" placeholder="Description / example"></textarea>
      <div class="td-label">Examples (Arabic | Arabeezy | English)</div>
      <textarea class="td-input td-grammar-examples" rows="3" placeholder="مثال عربي | Arabeezy | English"></textarea>
      <div class="td-label">Teacher notes</div>
      <textarea class="td-input td-grammar-notes" rows="2" placeholder="Notes for teacher mode"></textarea>
    `;
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());
        row.appendChild(delBtn);
        grammarList.appendChild(row);
    });

    $("#tdSaveGrammar")?.addEventListener("click", () => {
        const rows = grammarList.querySelectorAll(".td-quiz-row");
        const newGrammar = [];
        rows.forEach((r) => {
            const title = r.querySelector(".td-grammar-title")?.value.trim() || "";
            const desc = r.querySelector(".td-grammar-desc")?.value.trim() || "";
            const notes = r.querySelector(".td-grammar-notes")?.value.trim() || "";
            const examplesRaw = r.querySelector(".td-grammar-examples")?.value || "";
            const examples = examplesRaw
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                    const parts = line.split("|").map((p) => p.trim());
                    return {
                        ar: parts[0] || "",
                        arabeezy: parts[1] || "",
                        en: parts[2] || "",
                    };
                })
                .filter((ex) => ex.ar || ex.en || ex.arabeezy);
            if (title) {
                newGrammar.push({
                    id: "g_" + Date.now() + Math.random(),
                    title,
                    description: desc,
                    teacherNotes: notes,
                    examples,
                });
            }
        });
        lesson.grammar = newGrammar;
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("Grammar saved.");
    });
}

export function wireTranslationEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
    escapeHtml,
}) {
    const translationList = $("#tdTranslationList");
    if (!translationList) return;

    function createTranslationRow(item = {}) {
        const row = document.createElement("div");
        row.className = "td-quiz-row";
        row.dataset.itemId = item.id || "";

        row.innerHTML = `
      <div class="td-label">Direction</div>
      <select class="td-select td-translation-type">
        <option value="enToAr">English -> Arabic</option>
        <option value="arToEn">Arabic -> English</option>
      </select>
      <div class="td-label">English sentence</div>
      <textarea class="td-input td-translation-en" rows="2">${escapeHtml(item.textEn || "")}</textarea>
      <div class="td-label">Arabic sentence</div>
      <textarea class="td-input td-input--ar td-translation-ar" rows="2">${escapeHtml(item.textAr || "")}</textarea>
    `;

        const typeSel = row.querySelector(".td-translation-type");
        if (typeSel) typeSel.value = item.type || "enToAr";

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());
        row.appendChild(delBtn);
        return row;
    }

    function renderTranslationRows() {
        translationList.innerHTML = "";
        (lesson.practice.translation || []).forEach((t) => {
            translationList.appendChild(createTranslationRow(t));
        });
    }

    renderTranslationRows();

    $("#tdAddTranslation")?.addEventListener("click", () => {
        translationList.appendChild(createTranslationRow({}));
    });

    $("#tdSaveTranslation")?.addEventListener("click", () => {
        const rows = translationList.querySelectorAll(".td-quiz-row");
        const newItems = [];
        rows.forEach((row, idx) => {
            const type = row.querySelector(".td-translation-type")?.value || "enToAr";
            const textEn = row.querySelector(".td-translation-en")?.value.trim() || "";
            const textAr = row.querySelector(".td-translation-ar")?.value.trim() || "";
            if (!textEn && !textAr) return;
            const id = row.dataset.itemId || `t_${Date.now()}_${idx}`;
            newItems.push({ id, type, textEn, textAr });
        });
        lesson.practice.translation = newItems;
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("Translation saved.");
    });
}

export function wireQuizEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
}) {
    const quizList = $("#tdQuizList");
    if (!quizList) return;

    function appendQuizRow(q = null) {
        const row = document.createElement("div");
        row.className = "td-quiz-row";

        const qLabel = document.createElement("div");
        qLabel.className = "td-label";
        qLabel.textContent = "Question (Arabic)";

        const qInput = document.createElement("textarea");
        qInput.className = "td-input td-input--ar td-quiz-question";
        qInput.rows = 2;
        qInput.value = q?.questionAr || "";
        if (!q) qInput.placeholder = "Question in Arabic";

        const optLabel = document.createElement("div");
        optLabel.className = "td-label";
        optLabel.textContent = "Options (English)";

        const optGrid = document.createElement("div");
        optGrid.className = "td-quiz-grid";
        for (let i = 0; i < 3; i++) {
            const inp = document.createElement("input");
            inp.className = "td-input";
            inp.value = q?.optionsEn?.[i] || "";
            if (!q) inp.placeholder = `Option ${i + 1}`;
            optGrid.appendChild(inp);
        }

        const correctWrap = document.createElement("div");
        correctWrap.style.marginTop = "4px";
        correctWrap.style.display = "flex";
        correctWrap.style.justifyContent = "space-between";
        correctWrap.style.alignItems = "center";

        const selLabel = document.createElement("span");
        selLabel.className = "td-label";
        selLabel.textContent = "Correct option:";

        const sel = document.createElement("select");
        sel.className = "td-select";
        ["Option 1", "Option 2", "Option 3"].forEach((lab, idx) => {
            const op = document.createElement("option");
            op.value = String(idx);
            op.textContent = lab;
            sel.appendChild(op);
        });
        sel.value = String(q?.correctIndex || 0);

        const left = document.createElement("div");
        left.style.display = "flex";
        left.style.flexDirection = "column";
        left.style.gap = "2px";
        left.appendChild(selLabel);
        left.appendChild(sel);

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());

        correctWrap.appendChild(left);
        correctWrap.appendChild(delBtn);

        row.appendChild(qLabel);
        row.appendChild(qInput);
        row.appendChild(optLabel);
        row.appendChild(optGrid);
        row.appendChild(correctWrap);
        quizList.appendChild(row);
    }

    quizList.innerHTML = "";
    (lesson.practice.quiz || []).forEach((q) => appendQuizRow(q));

    $("#tdAddQuiz")?.addEventListener("click", () => appendQuizRow());

    $("#tdSaveQuiz")?.addEventListener("click", () => {
        const rows = quizList.querySelectorAll(".td-quiz-row");
        const newQuiz = [];
        rows.forEach((row) => {
            const qInput = row.querySelector(".td-quiz-question");
            const questionAr = qInput?.value.trim() || "";
            if (!questionAr) return;
            const opts = Array.from(row.querySelectorAll(".td-quiz-grid .td-input")).map((i) =>
                i.value.trim()
            );
            if (!opts[0] || !opts[1] || !opts[2]) return;
            const sel = row.querySelector(".td-select");
            const correctIndex = Number(sel?.value) || 0;
            newQuiz.push({
                id: "q_" + Date.now() + "_" + Math.random().toString(16).slice(2),
                questionAr,
                optionsEn: opts,
                correctIndex,
            });
        });
        lesson.practice.quiz = newQuiz;
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("MCQ saved.");
    });
}

export function wireRolePlayEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
}) {
    const roleList = $("#tdRoleList");
    if (!roleList) return;

    roleList.innerHTML = "";
    (lesson.practice.rolePlays || []).forEach((rp) => {
        const row = document.createElement("div");
        row.className = "td-role-row";

        const inp = document.createElement("input");
        inp.className = "td-input td-role-input";
        inp.value = rp || "";

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());

        row.appendChild(inp);
        row.appendChild(delBtn);
        roleList.appendChild(row);
    });

    $("#tdAddRole")?.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "td-role-row";

        const inp = document.createElement("input");
        inp.className = "td-input td-role-input";
        inp.placeholder = "New speaking prompt...";

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());

        row.appendChild(inp);
        row.appendChild(delBtn);
        roleList.appendChild(row);
    });

    $("#tdSaveRole")?.addEventListener("click", () => {
        const rows = roleList.querySelectorAll(".td-role-row");
        const newPrompts = [];
        rows.forEach((r) => {
            const txt = r.querySelector("input")?.value.trim() || "";
            if (txt) newPrompts.push(txt);
        });
        lesson.practice.rolePlays = newPrompts;
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("Role-play prompts saved.");
    });
}

export function wireHomeworkEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
}) {
    const homeworkInput = $("#tdHomeworkText");
    if (!homeworkInput) return;

    homeworkInput.value = lesson.homework.instructions || "";
    $("#tdSaveHomework")?.addEventListener("click", () => {
        lesson.homework.instructions = homeworkInput.value.trim();
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("Homework instructions saved.");
    });
}

export function wireTeacherNotesEditor({
    $,
    lesson,
    lessonId,
    saveLessonToLS,
    saveLessonToCloud,
    editor,
}) {
    const notesInput = $("#tdTeacherNotes");
    if (notesInput) {
        notesInput.value = lesson.teacherNotes.myNotes || "";
    }

    $("#tdSaveTeacherNotes")?.addEventListener("click", () => {
        lesson.teacherNotes.myNotes = notesInput?.value.trim() || "";
        saveLessonToLS(lessonId);
        saveLessonToCloud(lessonId);
        alert("Teacher notes saved.");
    });

    $("#tdCloseEditor")?.addEventListener("click", () => {
        if (!editor) return;
        editor.style.display = "none";
        editor.innerHTML = "";
    });
}
