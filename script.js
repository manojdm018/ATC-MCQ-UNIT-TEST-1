const questions = [
  { q: "What is the smallest unit of a formal language?", options: ["Grammar", "Symbol", "String", "Automaton"], answer: "Symbol" },
  { q: "A DFA is defined as a 5-tuple. What does 'Q' represent?", options: ["Input alphabet", "Finite set of states", "Final states", "Transition function"], answer: "Finite set of states" },
  { q: "Which of the following allows multiple transitions for the same input?", options: ["DFA", "NFA", "PDA", "Turing Machine"], answer: "NFA" },
  { q: "The empty string is usually denoted by which symbol?", options: ["∅", "ε", "λ", "#"], answer: "ε" },
  { q: "In a DFA, for every state and input, there is exactly ___ transition.", options: ["One transition", "Two transitions", "Multiple transitions", "No transition"], answer: "One transition" },
  { q: "Context-Free Grammars (CFG) are used to generate:", options: ["Regular Languages", "Context-Free Languages", "Recursive Languages", "Finite Languages"], answer: "Context-Free Languages" },
  { q: "A derivation tree is also known as a:", options: ["Syntax Tree", "Parse Tree", "Binary Tree", "Decision Tree"], answer: "Parse Tree" },
  { q: "In CFG, the symbols that cannot be replaced are called:", options: ["Non-terminals", "Terminals", "Variables", "States"], answer: "Terminals" },
  { q: "If a string is derived using only the leftmost non-terminal, it is a:", options: ["Right derivation", "Leftmost derivation", "Parallel derivation", "Direct derivation"], answer: "Leftmost derivation" },
  { q: "The set of all possible strings over an alphabet is denoted by:", options: ["Σ+", "Σ*", "Σ0", "Σ∞"], answer: "Σ*" },
  { q: "An NFA with epsilon transitions (epsilon-NFA) can change states:", options: ["After input", "Without consuming input", "Only at final state", "With two inputs"], answer: "Without consuming input" },
  { q: "Regular expressions are used to define:", options: ["Context-Free Languages", "Regular Languages", "Recursive Languages", "Turing Languages"], answer: "Regular Languages" },
  { q: "A regular expression (a+b)^* represents:", options: ["Only a and b", "All strings over {a,b}", "Only ab", "Only aa and bb"], answer: "All strings over {a,b}" },
  { q: "In a Context-Free Grammar, the left side of every production rule must be:", options: ["Two terminals", "Single non-terminal", "Multiple symbols", "Terminal only"], answer: "Single non-terminal" },
  { q: "If a grammar can produce two different parse trees for the same string, it is:", options: ["Regular grammar", "Ambiguous grammar", "Linear grammar", "Recursive grammar"], answer: "Ambiguous grammar" },
  { q: "A Finite Automaton is used for:", options: ["Recognizing regular languages", "Generating CFG", "Compiling programs", "Sorting data"], answer: "Recognizing regular languages" },
  { q: "The \"Pumping\" in Pumping Lemma refers to:", options: ["Removing substring", "Repeating substring", "Reversing string", "Splitting string"], answer: "Repeating substring" },
  { q: "In a derivation tree, the leaf nodes represent:", options: ["Non-terminals", "Terminals", "States", "Variables"], answer: "Terminals" },
  { q: "The state elimination method is used to convert:", options: ["FA → Grammar", "FA → Regular Expression", "Grammar → DFA", "DFA → PDA"], answer: "FA → Regular Expression" },
  { q: "The Pumping Lemma is a ______ tool.", options: ["Generate languages", "Prove language is not regular", "Create DFA", "Build grammar"], answer: "Prove language is not regular" },
  { q: "In grammar G = (V, T, P, S), V stands for:", options: ["Terminals", "Variables (non-terminals)", "Productions", "States"], answer: "Variables (non-terminals)" },
  { q: "Which of the following represents the empty string?", options: ["∅", "ε", "λ", "$"], answer: "ε" },
  { q: "Which of the following represents the empty set?", options: ["ε", "λ", "∅", "#"], answer: "∅" },
  { q: "A string is accepted by a DFA if it ends in:", options: ["Start state", "Dead state", "Final state", "Loop state"], answer: "Final state" },
  { q: "The Pigeonhole Principle is used in Pumping Lemma to:", options: ["Some states repeat", "Strings reverse", "DFA stops", "Grammar grows"], answer: "Some states repeat" },
  { q: "The identity ε + RR* is equal to:", options: ["R", "R*", "RR", "ε"], answer: "R*" },
  { q: "Which of the following operations is NOT closed under regular languages?", options: ["Union", "Concatenation", "Kleene star", "Context-free grammar generation"], answer: "Context-free grammar generation" },
  { q: "The identity (R*)* is equivalent to:", options: ["R", "R*", "RR*", "ε"], answer: "R*" },
  { q: "In the conversion from a Finite Automaton to a Regular Expression, what does a self-loop on a state typically represent in the expression?", options: ["No repetition", "Kleene star repetition", "End state", "Dead state"], answer: "Kleene star repetition" },
  { q: "According to the Distributive Law, a(b + c) is equal to:", options: ["ab + ac", "a + bc", "ab + c", "abc"], answer: "ab + ac" }
];

const state = {
  index: 0,
  score: 0,
  answered: false,
  userAnswers: [],
  optionOrders: []
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
  prevBtn: document.getElementById("prevBtn"),
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
  state.userAnswers = Array(questions.length).fill(null);
  state.optionOrders = questions.map((question) => shuffleOptions(question.options));
  el.scorePill.textContent = `Score: ${state.score}`;
  updateProgress();
  togglePanel(el.quizScreen);
  loadQuestion();
}

function shuffleOptions(options) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadQuestion() {
  const current = questions[state.index];
  const optionOrder = state.optionOrders[state.index];
  state.answered = state.userAnswers[state.index] !== null;
  el.questionCounter.textContent = `Question ${state.index + 1} / ${questions.length}`;
  el.questionText.textContent = current.q;
  el.optionsContainer.innerHTML = "";

  optionOrder.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => checkAnswer(option));
    el.optionsContainer.appendChild(btn);
  });

  const answerAtIndex = state.userAnswers[state.index];
  if (answerAtIndex !== null) {
    lockAnswerView(answerAtIndex);
  } else {
    el.nextBtn.disabled = true;
  }

  el.prevBtn.disabled = state.index === 0;
  updateProgress();
}


function lockAnswerView(selectedAnswer) {
  const current = questions[state.index];
  const allButtons = [...el.optionsContainer.querySelectorAll(".option-btn")];
  const selectedButton = allButtons.find((btn) => btn.textContent === selectedAnswer);

  if (selectedAnswer === current.answer) {
    if (selectedButton) selectedButton.classList.add("correct");
  } else {
    if (selectedButton) selectedButton.classList.add("wrong");
    const correctButton = allButtons.find((btn) => btn.textContent === current.answer);
    if (correctButton) correctButton.classList.add("reveal");
  }

  allButtons.forEach((btn) => {
    btn.disabled = true;
  });

  el.nextBtn.disabled = false;
}

function checkAnswer(selectedAnswer) {
  if (state.answered) return;
  state.answered = true;

  const current = questions[state.index];
  const isCorrect = selectedAnswer === current.answer;
  state.userAnswers[state.index] = selectedAnswer;

  if (isCorrect) {
    state.score += 1;
  }

  lockAnswerView(selectedAnswer);
  el.scorePill.textContent = `Score: ${state.score}`;
}

function nextQuestion() {
  state.index += 1;

  if (state.index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function previousQuestion() {
  if (state.index === 0) return;
  state.index -= 1;
  loadQuestion();
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
el.prevBtn.addEventListener("click", previousQuestion);
el.nextBtn.addEventListener("click", nextQuestion);
el.restartBtn.addEventListener("click", startQuiz);
el.themeToggle.addEventListener("click", toggleTheme);

applySavedTheme();
updateProgress();
