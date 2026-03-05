const questions = [
  { q: "What is the smallest unit of a formal language?", options: ["Grammar", "Symbol", "String", "Automaton"], answer: "Symbol" },
  { q: "In DFA = (Q, Σ, δ, q0, F), what does Q represent?", options: ["Input alphabet", "Finite set of states", "Final states", "Transition function"], answer: "Finite set of states" },
  { q: "Which automaton allows multiple transitions for the same input?", options: ["DFA", "NFA", "PDA", "Turing Machine"], answer: "NFA" },
  { q: "The empty string is represented by:", options: ["∅", "ε", "λ", "#"], answer: "ε" },
  { q: "In a DFA, for every state and input there is exactly:", options: ["One transition", "Two transitions", "Multiple transitions", "No transition"], answer: "One transition" },
  { q: "Context-Free Grammars generate:", options: ["Regular Languages", "Context-Free Languages", "Recursive Languages", "Finite Languages"], answer: "Context-Free Languages" },
  { q: "A derivation tree is also known as:", options: ["Syntax Tree", "Parse Tree", "Binary Tree", "Decision Tree"], answer: "Parse Tree" },
  { q: "Symbols in CFG that cannot be replaced are:", options: ["Non-terminals", "Terminals", "Variables", "States"], answer: "Terminals" },
  { q: "Derivation using only the leftmost non-terminal is called:", options: ["Right derivation", "Leftmost derivation", "Parallel derivation", "Direct derivation"], answer: "Leftmost derivation" },
  { q: "The set of all possible strings over alphabet Σ is:", options: ["Σ+", "Σ*", "Σ0", "Σ∞"], answer: "Σ*" },
  { q: "ε-NFA can change states:", options: ["After input", "Without consuming input", "Only at final state", "With two inputs"], answer: "Without consuming input" },
  { q: "Regular expressions define:", options: ["Context-Free Languages", "Regular Languages", "Recursive Languages", "Turing Languages"], answer: "Regular Languages" },
  { q: "(a+b)* represents:", options: ["Only a and b", "All strings over {a,b}", "Only ab", "Only aa and bb"], answer: "All strings over {a,b}" },
  { q: "In CFG the left side of production must be:", options: ["Two terminals", "Single non-terminal", "Multiple symbols", "Terminal only"], answer: "Single non-terminal" },
  { q: "Grammar producing two parse trees for same string is:", options: ["Regular grammar", "Ambiguous grammar", "Linear grammar", "Recursive grammar"], answer: "Ambiguous grammar" },
  { q: "Finite Automaton is used for:", options: ["Recognizing regular languages", "Generating CFG", "Compiling programs", "Sorting data"], answer: "Recognizing regular languages" },
  { q: "Pumping in Pumping Lemma means:", options: ["Removing substring", "Repeating substring", "Reversing string", "Splitting string"], answer: "Repeating substring" },
  { q: "Leaf nodes in a parse tree represent:", options: ["Non-terminals", "Terminals", "States", "Variables"], answer: "Terminals" },
  { q: "State elimination method converts:", options: ["FA → Grammar", "FA → Regular Expression", "Grammar → DFA", "DFA → PDA"], answer: "FA → Regular Expression" },
  { q: "Pumping Lemma is used to:", options: ["Generate languages", "Prove language is not regular", "Create DFA", "Build grammar"], answer: "Prove language is not regular" },
  { q: "In grammar G = (V,T,P,S), V represents:", options: ["Terminals", "Variables (non-terminals)", "Productions", "States"], answer: "Variables (non-terminals)" },
  { q: "Symbol for empty string is:", options: ["∅", "ε", "λ", "$"], answer: "ε" },
  { q: "Symbol for empty set is:", options: ["ε", "λ", "∅", "#"], answer: "∅" },
  { q: "A string is accepted by DFA if it ends in:", options: ["Start state", "Dead state", "Final state", "Loop state"], answer: "Final state" },
  { q: "Pigeonhole Principle in Pumping Lemma shows:", options: ["Some states repeat", "Strings reverse", "DFA stops", "Grammar grows"], answer: "Some states repeat" },
  { q: "Identity: ε + RR* =", options: ["R", "R*", "RR", "ε"], answer: "R*" },
  { q: "Which operation is not closed under regular languages?", options: ["Union", "Concatenation", "Kleene star", "Context-free grammar generation"], answer: "Context-free grammar generation" },
  { q: "(R*)* equals:", options: ["R", "R*", "RR*", "ε"], answer: "R*" },
  { q: "A self-loop in FA represents:", options: ["No repetition", "Kleene star repetition", "End state", "Dead state"], answer: "Kleene star repetition" },
  { q: "Distributive law: a(b + c) =", options: ["ab + ac", "a + bc", "ab + c", "abc"], answer: "ab + ac" }
];

const state = {
  index: 0,
  score: 0,
  answered: false
};

const el = {
  progressBar: document.getElementById("progressBar"),
  startScreen: document.getElementById("startScreen"),
  quizScreen: document.getElementById("quizScreen"),
  resultScreen: document.getElementById("resultScreen"),
  questionCounter: document.getElementById("questionCounter"),
  scorePill: document.getElementById("scorePill"),
  questionText: document.getElementById("questionText"),
  optionsContainer: document.getElementById("optionsContainer"),
  nextBtn: document.getElementById("nextBtn"),
  finalScore: document.getElementById("finalScore"),
  resultMessage: document.getElementById("resultMessage"),
  resultTitle: document.getElementById("resultTitle"),
  startBtn: document.getElementById("startBtn"),
  restartBtn: document.getElementById("restartBtn"),
  themeToggle: document.getElementById("themeToggle")
};

function togglePanel(panelToShow) {
  [el.startScreen, el.quizScreen, el.resultScreen].forEach((panel) => {
    const isActive = panel === panelToShow;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

function updateProgress() {
  const progress = (state.index / questions.length) * 100;
  el.progressBar.style.width = `${progress}%`;
}

function startQuiz() {
  state.index = 0;
  state.score = 0;
  state.answered = false;
  el.scorePill.textContent = `Score: ${state.score}`;
  updateProgress();
  togglePanel(el.quizScreen);
  loadQuestion();
}

function loadQuestion() {
  const current = questions[state.index];
  state.answered = false;
  el.nextBtn.disabled = true;
  el.questionCounter.textContent = `Question ${state.index + 1} / ${questions.length}`;
  el.questionText.textContent = current.q;
  el.optionsContainer.innerHTML = "";

  current.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => checkAnswer(btn, option));
    el.optionsContainer.appendChild(btn);
  });
}

function checkAnswer(button, selectedAnswer) {
  if (state.answered) return;
  state.answered = true;

  const current = questions[state.index];
  const isCorrect = selectedAnswer === current.answer;
  const allButtons = [...el.optionsContainer.querySelectorAll(".option-btn")];

  if (isCorrect) {
    state.score += 1;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
    const correctButton = allButtons.find((btn) => btn.textContent === current.answer);
    if (correctButton) correctButton.classList.add("reveal");
  }

  allButtons.forEach((btn) => {
    btn.disabled = true;
  });

  el.scorePill.textContent = `Score: ${state.score}`;
  el.nextBtn.disabled = false;
}

function nextQuestion() {
  state.index += 1;
  updateProgress();

  if (state.index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  el.progressBar.style.width = "100%";
  togglePanel(el.resultScreen);

  const percent = Math.round((state.score / questions.length) * 100);
  el.finalScore.textContent = `You scored ${state.score} / ${questions.length} (${percent}%)`;

  if (percent >= 85) {
    el.resultTitle.textContent = "Legendary!";
    el.resultMessage.textContent = "You crushed it like a quiz champion 🚀";
  } else if (percent >= 60) {
    el.resultTitle.textContent = "Strong Work!";
    el.resultMessage.textContent = "Great understanding — one more run for mastery 💪";
  } else {
    el.resultTitle.textContent = "Keep Going!";
    el.resultMessage.textContent = "You are learning fast. Try again and beat your score 🔥";
  }
}

function applySavedTheme() {
  const saved = localStorage.getItem("quiz-theme");
  if (saved === "dark") document.body.classList.add("dark");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const nextTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("quiz-theme", nextTheme);
}

el.startBtn.addEventListener("click", startQuiz);
el.nextBtn.addEventListener("click", nextQuestion);
el.restartBtn.addEventListener("click", startQuiz);
el.themeToggle.addEventListener("click", toggleTheme);

applySavedTheme();
updateProgress();
