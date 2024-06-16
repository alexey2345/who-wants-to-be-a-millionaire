const questions = [
    {
        question: "?מה היא חברת התחבורה הכי גדולה בארץ",
        answers: ["אגד", "דן", "מטרופולין", "רכבת ישראל"],
        correct: 0,
        prize: "$100"
    },
    {
        question: "?מתי הוקמה מדינת ישראל",
        answers: ["1958", "1942", "1948", "1955"],
        correct: 2,
        prize: "$300"
    },
    {
        question: "?כמה חברי להקה היו בביטלס",
        answers: ["8", "4", "2", "6"],
        correct: 1,
        prize: "$600"
    },
    {
        question: "?איך קוראים לשחקן ששיחק את הארי פוטר",
        answers: ["דייב באטיסטה","סמואל ל. ג'קסון","לאונרדו די קפריו","דניאל רדקליף"],
        correct: 3,
        prize: "$1200"
    },
    {
        question: "?מי הסולן בלהקת קווין",
        answers: ["פרדי מרקורי","ג'ון לנון","ג'יימס בראון","ג'קי וילסון"],
        correct: 0,
        prize: "$3600"
    },
    {
        question: "?מי לא גילם את ספיידרמן",
        answers: ["טובי מגווייר","אנדרו גרפילד","מייקל ג'קסון","טום הולנד"],
        correct: 2,
        prize: "$10800"
    },
    {
        question: "?מי היה ראש הממשלה הראשון של ישראל",
        answers: ["דוד בן גוריון", "יצחק רבין", "אריאל שרון", "שמעון פרס"],
        correct: 0,
        prize: "$32400"
    },
    {
        question: "?למי מצבי הנינגה יש מסיכה בצבע כחול",
        answers: ["לאונרדו","מיכלאנג'לו","דונטלו","רפאל"],
        correct: 0,
        prize: "$500000"
    },
    {
        question: "?מי השתתף בהנסיך המדליק מבל אייר",
        answers: ["ג'קי צאן","דויין ג'ונסון","כריס רוק","וויל סמית"],
        correct: 3,
        prize: "$900000"
    },
    {
        question: "?מה היא המדינה הכי עשירה בעולם",
        answers: ["יפן","לוכסמבורג","שווייץ","נורווגיה"],
        correct: 1,
        prize: "$1000000"
    }
];

let currentQuestionIndex = 0;
let splitUsed = false;
let callUsed = false;
let pollUsed = false;
document.addEventListener("DOMContentLoaded", function() {
const cq1 = document.getElementById("question");
const ca1 = document.getElementById("answer1");
const ca2 = document.getElementById("answer2");
const ca3 = document.getElementById("answer3");
const ca4 = document.getElementById("answer4");

function startGame() {
    document.getElementById("start").style.display = "none";
    loadQuestion();
    updatePrize();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    cq1.innerHTML = currentQuestion.question;
    ca1.innerHTML = currentQuestion.answers[0];
    ca2.innerHTML = currentQuestion.answers[1];
    ca3.innerHTML = currentQuestion.answers[2];
    ca4.innerHTML = currentQuestion.answers[3];
    resetAnswerStyles();
}

function resetAnswerStyles() {
    ca1.style.display = 'block';
    ca2.style.display = 'block';
    ca3.style.display = 'block';
    ca4.style.display = 'block';
}

function answer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
        alert("צודק!");
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            updatePrize();
        } else {
            alert("You've completed the quiz!");
            resetGame();
        }
    } else {
        alert("נסה שנית.");
        resetGame();
    }
}

function updatePrize() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("current-prize").innerText = `Current Prize: ${currentQuestion.prize}`;
    highlightCurrentPrize();
}

function highlightCurrentPrize() {
    const prizeIds = [
        "prize1", "prize2", "prize3", "prize4", "prize5",
        "prize6", "prize7", "prize8", "prize9", "prize10"
    ];
    prizeIds.forEach(id => {
        document.getElementById(id).classList.remove("prize-highlight");
    });
    document.getElementById(prizeIds[currentQuestionIndex]).classList.add("prize-highlight");
}

function resetGame() {
    currentQuestionIndex = 0;
    splitUsed = false;
    callUsed = false;
    pollUsed = false;
    document.getElementById("splitAnswers").style.pointerEvents = 'auto';
    document.getElementById("phoneCall").style.pointerEvents = 'auto';
    document.getElementById("peoplesChoice").style.pointerEvents = 'auto';
    loadQuestion();
    updatePrize();
}
document.getElementById("splitAnswers").addEventListener("click", split);
function split() {
    
    if (splitUsed) return;
    splitUsed = true;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct;
    let incorrectAnswers = [0, 1, 2, 3].filter(index => index !== correctAnswer);
    incorrectAnswers = incorrectAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);
    incorrectAnswers.forEach(index => {
        document.getElementById(`answer${index + 1}`).style.display = 'none';
    });
    document.getElementById("splitAnswers").style.pointerEvents = 'none';
}
document.getElementById("phoneCall").addEventListener("click", call);
function call() {
    if (callUsed) return;
    callUsed = true;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correct;
    

    const giveCorrectAnswer = Math.random() < 0.5;
    
    let answerToGive;
    if (giveCorrectAnswer) {
        answerToGive = currentQuestion.answers[correctAnswerIndex];
    } else {

        const wrongAnswers = currentQuestion.answers.filter((_, index) => index !== correctAnswerIndex);
        answerToGive = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    }
    
    alert("אח שלי היקר אני חושב שהתשובה היא " + answerToGive);
    document.getElementById("phoneCall").style.pointerEvents = 'none';
}
document.getElementById("peoplesChoice").addEventListener("click", poll);
function poll() {
    if (pollUsed) return;
    pollUsed = true;
    
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correct;


    const showWrongAnswer = Math.random() < 0.9;

    let answerToShow;
    if (showWrongAnswer) {

        const wrongAnswers = currentQuestion.answers.filter((_, index) => index !== correctAnswerIndex);
        answerToShow = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    } else {

        answerToShow = currentQuestion.answers[correctAnswerIndex];
    }


    alert("התשובה של הקהל היא " + answerToShow);
    document.getElementById("peoplesChoice").style.pointerEvents = 'none';
}

document.getElementById("start").addEventListener("click", startGame);
ca1.addEventListener("click", () => answer(0));
ca2.addEventListener("click", () => answer(1));
ca3.addEventListener("click", () => answer(2));
ca4.addEventListener("click", () => answer(3));
});
