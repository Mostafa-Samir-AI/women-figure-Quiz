const answers = [
    "حكمت أبو زيد",
    "حتشبسوت",
    "صفية زغلول",
    "نبوية موسى",
    "آسيا داغر",
    "أم كلثوم",
    "إنجي أفلاطون",
    "تهاني الجبالي",
    "جميلة إسماعيل",
    "ملك حفني ناصف",
    "كليوباترا السابعة",
    "صفاء حجازي",
    "أمينة السعيد",
    "هيلانة سيداروس",
    "سعاد حسني",
    "هدى شعراوي",
    "فاتن حمامة",
    "ليلى مراد",
    "نادية مكرم عبيد",
    "جيهان السادات",
    "سارة صبري",
    "سميرة موسى",
    "فايزة أبو النجا",
    "سميرة مراد",
    "فاتن حمامة",
    "أمينة السعيد",
    "عائشة عبد الرحمن",
    "مشيرة خطاب",
    "تحية كاريوكا",
    "شادية",
    "مولان",
    "سندريلا",
    "ياسمين",
    "أرييل",
    "رابونزل",
    "ميريدا",
    "تيانا",
    "آنا",
    "أورورا",
    "آنا",
];

let currentQuestion = 1;
const totalQuestions = 40;
let isReviewMode = false;
let userAnswers = [];
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const questionNumbersContainer =
    document.getElementById("question-numbers");
const resultModal = document.getElementById("result-modal");
const progressTextResult = document.getElementById(
    "progress-text-result"
);
const scoreText = document.getElementById("score-text");
const reviewBtn = document.getElementById("review-btn");
const closeBtn = document.getElementById("close-btn");
const circleFill = document.querySelector(".circle-fill");

function initializeQuestionNumbers() {
    questionNumbersContainer.innerHTML = "";
    for (let i = 1; i <= totalQuestions; i++) {
        const questionNumber = document.createElement("div");
        questionNumber.className = "question-number";
        questionNumber.textContent = i;
        questionNumber.dataset.question = i;
        questionNumber.addEventListener("click", () => navigateToQuestion(i));
        questionNumbersContainer.appendChild(questionNumber);
    }
}

function updateQuestionNumber(questionNum) {
    document.querySelectorAll(".question-number").forEach((el) => {
        el.classList.remove("current");
    });

    const currentNumber = document.querySelector(
        `.question-number[data-question="${questionNum}"]`
    );
    if (currentNumber) {
        currentNumber.classList.add("current");
    }
}

function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
}

function navigateToQuestion(questionNum) {
    if (questionNum < 1 || questionNum > totalQuestions) return;

    document
        .getElementById(`q${currentQuestion}`)
        .classList.remove("active");
    currentQuestion = questionNum;
    document.getElementById(`q${currentQuestion}`).classList.add("active");

    progressText.textContent = `السؤال ${currentQuestion} من ${totalQuestions}`;
    updateProgressBar();

    prevBtn.disabled = currentQuestion === 1;

    if (isReviewMode) {
        nextBtn.textContent =
            currentQuestion === totalQuestions ? "النتائج" : "التالي";
        nextBtn.classList.remove("finish-btn");
    } else {
        if (currentQuestion === totalQuestions) {
            nextBtn.textContent = "إنهاء";
            nextBtn.classList.add("finish-btn");
        } else {
            nextBtn.textContent = "التالي";
            nextBtn.classList.remove("finish-btn");
        }
    }

    updateQuestionNumber(currentQuestion);
}

function showResultsModal(score) {
    const percentage = Math.round((score / totalQuestions) * 100);
    progressTextResult.textContent = `${percentage}%`;
    scoreText.textContent = `درجتك: ${score} من ${totalQuestions}`;

    const circumference = 440;
    const offset = circumference - (percentage / 100) * circumference;
    circleFill.style.strokeDashoffset = offset;

    resultModal.style.display = "flex";
}

function calculateScore() {
    let score = 0;
    userAnswers = [];

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(
            `input[name="q${i}"]:checked`
        );
        if (selectedOption) {
            userAnswers.push({
                question: i,
                answer: selectedOption.value,
                isCorrect: selectedOption.value === answers[i - 1],
            });

            if (selectedOption.value === answers[i - 1]) {
                score++;
            }
        }
    }

    showResultsModal(score);
}

function startReviewMode() {
    isReviewMode = true;
    resultModal.style.display = "none";

    document.querySelectorAll(".option").forEach((option) => {
        option.classList.remove("correct", "incorrect", "correct-answer");
    });

    userAnswers.forEach((item) => {
        const options = document.querySelectorAll(
            `input[name="q${item.question}"]`
        );
        options.forEach((option) => {
            const optionElement = option.closest(".option");
            if (option.value === item.answer) {
                optionElement.classList.add(
                    item.isCorrect ? "correct" : "incorrect"
                );
            }
            if (
                option.value === answers[item.question - 1] &&
                !item.isCorrect
            ) {
                optionElement.classList.add("correct-answer");
            }
        });
    });

    navigateToQuestion(1);
}

function setupEventListeners() {
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            const questionNum = parseInt(this.name.substring(1));
            const questionNumberElement = document.querySelector(
                `.question-number[data-question="${questionNum}"]`
            );
            questionNumberElement.classList.add("answered");
        });
    });

    prevBtn.addEventListener("click", () =>
        navigateToQuestion(currentQuestion - 1)
    );
    nextBtn.addEventListener("click", () => {
        if (isReviewMode && currentQuestion === totalQuestions) {
            calculateScore();
        } else if (!isReviewMode && currentQuestion === totalQuestions) {
            calculateScore();
        } else {
            navigateToQuestion(currentQuestion + 1);
        }
    });

    closeBtn.addEventListener("click", () => {
        resultModal.style.display = "none";
    });

    reviewBtn.addEventListener("click", startReviewMode);
}

function initQuiz() {
    initializeQuestionNumbers();
    updateQuestionNumber(currentQuestion);
    updateProgressBar();
    setupEventListeners();
}

initQuiz();