const questions = [
    {
        question: "В якому році екіпаж приземлився на Марс?",
        answers: ["2026 (M)", "2027 (Y)", "2028 (K)", "2030 (Z)"]
    },
    {
        question: "Яка поломка сталася на кораблі?",
        answers: ["Брак кисню (B)", "Перегрів двигуна (A)", "Збій зв'язку (L)", "Метеорит (P)"]
    },
    {
        question: "Скільки астронавтів було на борту?",
        answers: ["5 осіб (E)", "10 осіб (R)", "12 осіб (Q)", "20 осіб (W)"]
    },
    {
        question: "Хто надіслав рятівний код?",
        answers: ["Центр на Землі (H)", "Марсіанський сигнал (S)", "Автопілот (V)", "Прибульці (N)"]
    },
    {
        question: "Який основний колір марсіанського ґрунту?",
        answers: ["Синій (U)", "Зелений (I)", "Червоний (0)", "Чорний (T)"]
    },
    {
        question: "Як називається ваш корабель?",
        answers: ["Galaxy-1 (1)", "Apollo-11 (G)", "Starship-X (F)", "Vostok (D)"]
    }
];

let currentQuestionIndex = 0;
const finalSecret = "MARS01"; 

const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const codeInput = document.getElementById('code-input');
const scoreText = document.getElementById('score-text');
const checkCodeBtn = document.getElementById('check-code-button');
const restartBtn = document.getElementById('restart-button');

function startQuiz() {
    currentQuestionIndex = 0;
    quizBox.style.display = 'block';
    resultBox.style.display = 'none';
    restartBtn.style.display = 'none';
    checkCodeBtn.innerText = "ПІДТВЕРДИТИ КОД";
    checkCodeBtn.onclick = handleCodeCheck; 
    codeInput.value = "";
    scoreText.innerText = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    let q = questions[currentQuestionIndex];
    document.getElementById('progress').innerText = `Крок ${currentQuestionIndex + 1} з ${questions.length}`;
    questionElement.innerText = q.question;

    q.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.onclick = () => {
            Array.from(answerButtonsElement.children).forEach(b => {
                b.disabled = true;
                b.classList.remove('selected');
            });
            button.classList.add('selected');
            nextButton.disabled = false;
        };
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.disabled = true;
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        quizBox.style.display = 'none';
        resultBox.style.display = 'block';
    }
};

function handleCodeCheck() {
    const enteredValue = codeInput.value.toUpperCase().trim();
    if (enteredValue === finalSecret) {
        scoreText.innerHTML = "СИСТЕМА РОЗБЛОКОВАНА. <br>Доступ до архіву відкрито.";
        scoreText.style.color = "#ffa500";
        checkCodeBtn.innerText = "УВІЙТИ";
        checkCodeBtn.onclick = () => {
            window.location.href = "https://arko4325.github.io/file/";
        };
    } else {
        scoreText.innerHTML = "ПОМИЛКА: КОД НЕВІРНИЙ.";
        scoreText.style.color = "#ff4444";
        restartBtn.style.display = "block";
    }
}

checkCodeBtn.onclick = handleCodeCheck;
restartBtn.onclick = startQuiz;

startQuiz();
