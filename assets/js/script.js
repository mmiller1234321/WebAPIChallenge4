var quizContainer = document.querySelector("#quiz-container");
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");

var timer;
var timerCount = 0;
var done = false;
var score = 0;
var highScores = [];
var highNames = [];

function init() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    var storedNames = JSON.parse(localStorage.getItem("highNames"));

    if (storedScores !== null) {
        highScores = storedScores;
    }

    if (storedNames !== null) {
        highNames = storedNames;
    }
}

function startGame() {
    timerCount = 60;
    startTimer();
    displayQuestion(0);
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount <= 0 || done) {
            clearInterval(timer);
            if (!done) {
                displayMessage("Game Over!");
                startButton.disabled = false;
            }
        }
    }, 1000);
}

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswerIndex: 2
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswerIndex: 1
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswerIndex: 3
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswerIndex: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correctAnswerIndex: 3
    }
];

function displayQuestion(index) {
    const currentQuestion = questions[index];
    const questionEl = document.createElement("h1");
    questionEl.textContent = currentQuestion.question;
    clearQuizContainer();
    quizContainer.appendChild(questionEl);

    currentQuestion.answers.forEach(function(answer, idx) {
        const answerBtn = document.createElement("button");
        answerBtn.textContent = answer;
        answerBtn.addEventListener("click", function() {
            handleAnswer(index, idx === currentQuestion.correctAnswerIndex);
        });
        quizContainer.appendChild(answerBtn);
    });
}

function handleAnswer(questionIndex, correct) {
    done = true;
    clearInterval(timer);
    if (correct) {
        score = timerCount;
    } else {
        timerCount -= 10;
        if (timerCount < 0) {
            timerCount = 0;
        }
    }
    displayMessage(correct ? "Correct!" : "Wrong!");
    setTimeout(function() {
        if (questionIndex < questions.length - 1) {
            displayQuestion(questionIndex + 1);
        } else {
            displayMessage("All Done!");
            enterScore();
        }
    }, 2000);
}

function displayMessage(message) {
    const messageEl = document.createElement("h1");
    messageEl.textContent = message;
    clearQuizContainer();
    quizContainer.appendChild(messageEl);
}

function clearQuizContainer() {
    while (quizContainer.firstChild) {
        quizContainer.removeChild(quizContainer.lastChild);
    }
}

function enterScore() {
    const initials = prompt("Enter your initials:");
    if (initials) {
        highScores.push(score);
        highNames.push(initials);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        localStorage.setItem("highNames", JSON.stringify(highNames));
    }
}

function leaderBoard() {
    displayMessage("Leaderboard:");
    highScores.forEach(function(score, index) {
        const scoreEl = document.createElement("h2");
        scoreEl.textContent = score + " - " + highNames[index];
        quizContainer.appendChild(scoreEl);
    });
}

function setScores() {
    const storedScores = JSON.parse(localStorage.getItem("highScores"));
    const storedNames = JSON.parse(localStorage.getItem("highNames"));
    const lastScore = JSON.parse(localStorage.getItem("lastScore"));

    if (storedScores !== null) {
        highScores = storedScores;
    }

    if (storedNames !== null) {
        highNames = storedNames;
    }

    if (lastScore !== null) {
        highScores.push(lastScore.score);
        highNames.push(lastScore.initials);
    }

    const sortedScores = highScores.map(function(score, index) {
        return { score: score, name: highNames[index] };
    }).sort(function(a, b) {
        return b.score - a.score;
    });

    highScores = sortedScores.map(function(item) {
        return item.score;
    });

    highNames = sortedScores.map(function(item) {
        return item.name;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.setItem("highNames", JSON.stringify(highNames));
}

init();

startButton.addEventListener("click", startGame);
document.querySelector("#leaderButton").addEventListener("click", leaderBoard);
