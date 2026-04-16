import { branchingDialogues, findBranchingIdFor } from '../branching/index.js';

const LS_BRANCH_PREFIX = 'pal_arabic_branching_';

function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

function showScreen(id) {
  $all('.screen').forEach((sec) => sec.classList.toggle('screen--active', sec.id === id));
}

function getCurrentStudent() {
  const st = window.appState && window.appState.students ? window.appState.students : [];
  const id = window.appState ? window.appState.currentStudentId : null;
  return st.find((s) => s.id === id) || null;
}

function readCustomUnits() {
  try {
    const raw = localStorage.getItem('pal_arabic_custom_units');
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) {
    return {};
  }
}

function storageKey(studentId, dialogueId) {
  return `${LS_BRANCH_PREFIX}${studentId}__${dialogueId}`;
}

function loadBranchState(studentId, dialogueId) {
  try {
    const raw = localStorage.getItem(storageKey(studentId, dialogueId));
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || typeof s !== 'object') return null;
    return s;
  } catch (_) {
    return null;
  }
}

function saveBranchState(studentId, dialogueId, state) {
  try {
    localStorage.setItem(storageKey(studentId, dialogueId), JSON.stringify(state));
  } catch (_) {
    // ignore
  }
}

function getDialogueOrPlaceholder(dialogueId, level, unit) {
  if (branchingDialogues[dialogueId]) return branchingDialogues[dialogueId];
  // should not happen for default units (we ship placeholders), but keep safe
  return {
    meta: { level, unit, title: `${unit} - Decisions` },
    startNodeId: 'n1',
    nodes: {
      n1: {
        speaker: 'System',
        ar: 'هالمحادثة لسه مش جاهزة. قريباً إن شاء الله ✅',
        en: 'This branching dialogue is not ready yet. Coming soon ✅',
        choices: [],
      },
    },
  };
}

function resolveCurrentNodeId(dialogue, history) {
  let nodeId = dialogue.startNodeId;
  for (const step of history) {
    const node = dialogue.nodes[nodeId];
    if (!node || !Array.isArray(node.choices)) break;
    const choice = node.choices.find((c) => c.id === step.choiceId);
    if (!choice || !choice.next) break;
    nodeId = choice.next;
  }
  return nodeId;
}

function makeDialogueLine({ speaker, text, isArabic }) {
  const line = document.createElement('div');
  line.className = 'dialogue-line';

  const sp = document.createElement('div');
  sp.className = isArabic ? 'dialogue-speaker-ar' : 'dialogue-speaker-en';
  sp.textContent = speaker;

  const tx = document.createElement('div');
  tx.className = 'dialogue-text';
  tx.textContent = text;

  line.appendChild(sp);
  line.appendChild(tx);
  return line;
}

function renderBranching(dialogueId, level, unit) {
  const isGuest = !!(window.appState && window.appState.currentUser && window.appState.currentUser.role === 'guest');
  if (isGuest && (level !== 'Beginner' || (unit !== 'Greetings' && unit !== 'Family'))) {
    if (typeof window.toast === 'function') {
      window.toast('Guest access is limited to the first two units.');
    }
    if (typeof window.showScreen === 'function') {
      window.showScreen('subscribe-screen');
    }
    return;
  }
  const student = getCurrentStudent();
  if (!student) {
    showScreen('levels-screen');
    return;
  }

  const dialogue = getDialogueOrPlaceholder(dialogueId, level, unit);

  // UI headers
  const meta = `${dialogue.meta.level} – ${dialogue.meta.unit}`;
  $('#branchingStudentName').textContent = student.name;
  $('#branchingMeta').textContent = meta;

  // restore state
  const saved = loadBranchState(student.id, dialogueId) || {};
  const history = Array.isArray(saved.history) ? saved.history : [];
  let hideAr = !!saved.hideAr;
  let hideEn = !!saved.hideEn;

  // Use the same global lesson font size if present
  const baseFont = (window.appState && typeof window.appState.lessonFontSize === 'number')
    ? window.appState.lessonFontSize
    : 1.0;

  const state = {
    dialogueId,
    level,
    unit,
    history,
    hideAr,
    hideEn,
    font: baseFont,
  };

  function persist() {
    saveBranchState(student.id, dialogueId, {
      history: state.history,
      hideAr: state.hideAr,
      hideEn: state.hideEn,
    });
  }

  function applyVisibility(layout, enCol, arCol) {
    const englishVisible = !state.hideEn;
    const arabicVisible = !state.hideAr;

    if (englishVisible && arabicVisible) {
      layout.style.gridTemplateColumns = 'minmax(0, 1fr) minmax(0, 1fr)';
      enCol.style.display = 'block';
      arCol.style.display = 'block';
      enCol.style.margin = '0';
      arCol.style.margin = '0';
    } else if (englishVisible && !arabicVisible) {
      layout.style.gridTemplateColumns = 'minmax(0, 1fr)';
      enCol.style.display = 'block';
      arCol.style.display = 'none';
      enCol.style.margin = '0 auto';
    } else if (!englishVisible && arabicVisible) {
      layout.style.gridTemplateColumns = 'minmax(0, 1fr)';
      enCol.style.display = 'none';
      arCol.style.display = 'block';
      arCol.style.margin = '0 auto';
    } else {
      layout.style.gridTemplateColumns = 'minmax(0, 1fr)';
      enCol.style.display = 'none';
      arCol.style.display = 'none';
    }

    const btnAr = $('#btnBranchingToggleAr');
    const btnEn = $('#btnBranchingToggleEn');
    btnAr.textContent = state.hideAr ? 'Show Arabic' : 'Hide Arabic';
    btnEn.textContent = state.hideEn ? 'Show English' : 'Hide English';
  }

  function draw() {
    const host = $('#branchingContent');
    host.innerHTML = '';
    host.style.fontSize = `${state.font}em`;

    const wrap = document.createElement('div');
    wrap.className = 'branching-wrap';

    // Dialogue layout (re-use existing classes so it looks identical)
    const layout = document.createElement('div');
    layout.className = 'dialogue-layout';

    const enCol = document.createElement('div');
    enCol.className = 'dialogue-col';

    const arCol = document.createElement('div');
    arCol.className = 'dialogue-col dialogue-col--ar';

    // Build transcript: node line + choice line for each history step
    let nodeId = dialogue.startNodeId;
    for (const step of state.history) {
      const node = dialogue.nodes[nodeId];
      if (!node) break;

      // node line
      enCol.appendChild(makeDialogueLine({ speaker: node.speaker || 'A', text: node.en || '', isArabic: false }));
      arCol.appendChild(makeDialogueLine({ speaker: node.speaker || 'A', text: node.ar || '', isArabic: true }));

      // chosen line
      const choice = (node.choices || []).find((c) => c.id === step.choiceId);
      if (!choice) break;
      enCol.appendChild(makeDialogueLine({ speaker: 'You', text: choice.en || '', isArabic: false }));
      arCol.appendChild(makeDialogueLine({ speaker: 'أنتِ', text: choice.ar || '', isArabic: true }));

      nodeId = choice.next || nodeId;
    }

    // current node
    const currentId = resolveCurrentNodeId(dialogue, state.history);
    const current = dialogue.nodes[currentId];

    if (current) {
      enCol.appendChild(makeDialogueLine({ speaker: current.speaker || 'A', text: current.en || '', isArabic: false }));
      arCol.appendChild(makeDialogueLine({ speaker: current.speaker || 'A', text: current.ar || '', isArabic: true }));
    }

    layout.appendChild(enCol);
    layout.appendChild(arCol);

    // Choices
    const choicesWrap = document.createElement('div');
    choicesWrap.className = 'branching-choices';

    const choices = current && Array.isArray(current.choices) ? current.choices : [];

    if (choices.length) {
      choices.forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'branch-choice';

        const en = document.createElement('div');
        en.className = 'branch-choice__en';
        en.textContent = c.en || '';

        const ar = document.createElement('div');
        ar.className = 'branch-choice__ar';
        ar.textContent = c.ar || '';

        btn.appendChild(en);
        btn.appendChild(ar);

        btn.addEventListener('click', () => {
          state.history.push({ choiceId: c.id });
          persist();
          draw();
        });

        choicesWrap.appendChild(btn);
      });
    } else {
      const end = document.createElement('div');
      end.className = 'branching-end';
      const t = document.createElement('strong');
      t.textContent = 'End';
      const p = document.createElement('div');
      p.textContent = 'You reached an ending. You can restart or go back.';
      end.appendChild(t);
      end.appendChild(p);
      choicesWrap.appendChild(end);
    }

    wrap.appendChild(layout);
    wrap.appendChild(choicesWrap);
    host.appendChild(wrap);

    applyVisibility(layout, enCol, arCol);
  }

  // Screen buttons
  $('#btnBackToLevelsFromBranching').onclick = () => {
    showScreen('levels-screen');
  };
  $('#btnBranchingRestart').onclick = () => {
    state.history = [];
    persist();
    draw();
  };
  $('#btnBranchingUndo').onclick = () => {
    if (state.history.length) state.history.pop();
    persist();
    draw();
  };
  $('#btnBranchingToggleAr').onclick = () => {
    state.hideAr = !state.hideAr;
    persist();
    draw();
  };
  $('#btnBranchingToggleEn').onclick = () => {
    state.hideEn = !state.hideEn;
    persist();
    draw();
  };

  // Font size controls (share same appState.lessonFontSize if exists)
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  $('#btnBranchingFontSmaller').onclick = () => {
    state.font = clamp((window.appState && window.appState.lessonFontSize ? window.appState.lessonFontSize : state.font) - 0.05, 0.85, 1.4);
    if (window.appState) window.appState.lessonFontSize = state.font;
    draw();
  };
  $('#btnBranchingFontLarger').onclick = () => {
    state.font = clamp((window.appState && window.appState.lessonFontSize ? window.appState.lessonFontSize : state.font) + 0.05, 0.85, 1.4);
    if (window.appState) window.appState.lessonFontSize = state.font;
    draw();
  };

  showScreen('branching-screen');
  draw();
}

export function renderDialogueOnlyLevels() {
  const container = $('#dialogueOnlyContainer');
  if (!container) return;
  container.innerHTML = '';

  const levelsDef = [
    { level: 'Beginner', units: ['Greetings', 'Daily Routine', 'Food & Drink', 'Family', 'trans'] },
    { level: 'Pre-Intermediate', units: ['Work & Study', 'Health & Emergencies', 'Shopping & Prices', 'Weather & Small Talk', 'Apartment & Problems'] },
    { level: 'Intermediate', units: ['Opinions', 'Complaints', 'Plans & Future', 'Free Time & Hobbies', 'Feelings & Mental State'] },
  ];

  const customUnits = readCustomUnits();

  const student = getCurrentStudent();

  levelsDef.forEach((lvl) => {
    const card = document.createElement('article');
    card.className = 'level-card';

    const titleRow = document.createElement('div');
    titleRow.className = 'level-card__title';

    const title = document.createElement('h4');
    title.className = 'td-lessonitem__title';
    title.textContent = lvl.level;

    const badge = document.createElement('span');
    badge.className = 'badge badge--soft';
    badge.textContent = 'Dialogue Only';

    titleRow.appendChild(title);
    titleRow.appendChild(badge);

    const unitsContainer = document.createElement('div');
    unitsContainer.className = 'level-card__units';

    const allUnits = [...lvl.units];
    if (customUnits[lvl.level] && Array.isArray(customUnits[lvl.level])) {
      customUnits[lvl.level].forEach((u) => { if (!allUnits.includes(u)) allUnits.push(u); });
    }

  const isGuest = !!(window.appState && window.appState.currentUser && window.appState.currentUser.role === 'guest');
  const guestAllowed = new Set(['Greetings', 'Family']);

  allUnits.forEach((unitName) => {
    const pill = document.createElement('div');
    pill.className = 'unit-pill';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'unit-pill__name';
    nameSpan.textContent = unitName;

      const statusSpan = document.createElement('span');
      statusSpan.className = 'unit-pill__status';

      // Always visible (Option 1). If no script, we still allow open.
    const branchingId = findBranchingIdFor(lvl.level, unitName) || `BD::CUSTOM::${lvl.level}::${unitName}`;
    const isLocked = isGuest && (lvl.level !== 'Beginner' || !guestAllowed.has(unitName));

    // progress (lightweight): count steps in history
    if (student) {
      const saved = loadBranchState(student.id, branchingId);
      const steps = saved && Array.isArray(saved.history) ? saved.history.length : 0;
      if (isLocked) {
        statusSpan.textContent = 'Locked (Guest)';
        pill.classList.add('unit-pill--locked');
      } else {
        statusSpan.textContent = steps ? `Progress: ${steps} choice(s)` : 'Start dialogue';
        pill.classList.add(steps ? 'unit-pill--mid' : 'unit-pill--low');
      }
    } else {
      if (isLocked) {
        statusSpan.textContent = 'Locked (Guest)';
        pill.classList.add('unit-pill--locked');
      } else {
        statusSpan.textContent = 'Start dialogue';
        pill.classList.add('unit-pill--low');
      }
    }

    if (!isLocked) {
      pill.classList.add('unit-pill--clickable');
      pill.addEventListener('click', () => {
        const id = findBranchingIdFor(lvl.level, unitName) || branchingId;
        renderBranching(id, lvl.level, unitName);
      });
    }

      pill.appendChild(nameSpan);
      pill.appendChild(statusSpan);
      unitsContainer.appendChild(pill);
    });

    card.appendChild(titleRow);
    card.appendChild(unitsContainer);
    container.appendChild(card);
  });
}

// Make callable from legacy code
try {
  window.renderDialogueOnlyLevels = renderDialogueOnlyLevels;
} catch (_) {}
