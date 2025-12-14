let quizData = [];
let currentIndex = 0;
let score = 0;
let selectedOption = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// Load questions dynamically from JSON file
async function loadQuestions() {
    const res = await fetch("questions.json");
    quizData = await res.json();
    loadQuestion();
}

function loadQuestion() {
    selectedOption = null;
    nextBtn.disabled = true;

    const q = quizData[currentIndex];
    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;

        div.onclick = () => selectOption(div, index);

        optionsEl.appendChild(div);
    });
}

function selectOption(div, index) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.classList.remove("selected"));

    div.classList.add("selected");
    selectedOption = index;
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    if (selectedOption === quizData[currentIndex].answer) {
        score++;
    }

    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${quizData.length}`;
}

restartBtn.onclick = () => {
    currentIndex = 0;
    score = 0;
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    loadQuestion();
};

// Start the quiz
loadQuestions();
