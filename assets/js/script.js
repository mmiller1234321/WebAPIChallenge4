// Variable Declarations
var quizSpace = document.querySelector("#quiz-container");
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var timer;
var timerCount = 0;
var done = false;
var answer = false;
var score = 0;
var highScores = [];
var highNames = [];

// Initialize function that sets values for local storage
function init() {
    var storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var storedNames = JSON.parse(localStorage.getItem("highNames")) || [];
    highScores = storedScores;
    highNames = storedNames;
}

// Function to start the game
function startGame() {
    timerCount = 60;
    startTimer();
    questionOne();
}

// Function to start the timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0 && done) {
            score = timerCount;
            startButton.disabled = true;
            clearInterval(timer);
            clearQuizSpace();
            enterScore();
        }
        if (timerCount <= 0) {
            clearQuizSpace();
            var gameOver = document.createElement("h1");
            gameOver.textContent = "Game Over!";
            quizSpace.appendChild(gameOver);
            clearInterval(timer);
            startButton.disabled = false;
        }
    }, 1000);
}

// Function to clear quiz space
function clearQuizSpace() {
    while (quizSpace.firstChild) {
        quizSpace.removeChild(quizSpace.lastChild);
    }
}

// Function to create a question card
function createQuestionCard(questionText, answers, correctAnswerIndex, nextQuestionFunction) {
    clearQuizSpace();
    var questionCard = document.createElement("div");
    questionCard.classList.add("question-card");
    var question = document.createElement("h1");
    question.textContent = questionText;
    questionCard.appendChild(question);
    answers.forEach(function(answerText, index) {
        var answerButton = document.createElement("button");
        answerButton.textContent = answerText;
        answerButton.addEventListener("click", function() {
            answer = index === correctAnswerIndex;
            timerCount -= answer ? 0 : 10;
            nextQuestionFunction();
        });
        questionCard.appendChild(answerButton);
    });
    quizSpace.appendChild(questionCard);
}

// Functions for each question
function questionOne() {
    createQuestionCard(
        "Commonly used data types DO NOT include:",
        ["strings", "booleans", "alerts", "numbers"],
        2,
        questionTwo
    );
}

function questionTwo() {
    createQuestionCard(
        "The condition in an if / else statement is enclosed within ____.",
        ["quotes", "curly brackets", "parentheses", "square brackets"],
        2,
        questionThree
    );
}

function questionThree() {
    createQuestionCard(
        "Arrays in JavaScript can be used to store ____.",
        ["numbers and strings", "other arrays", "booleans", "all of the above"],
        3,
        questionFour
    );
}

function questionFour() {
    createQuestionCard(
        "String values must be enclosed within ____ when being assigned to variables.",
        ["commas", "curly brackets", "quotes", "parentheses"],
        2,
        questionFive
    );
}

function questionFive() {
    createQuestionCard(
        "A very useful tool used during development and debugging for printing content to the debugger is:",
        ["JavaScript", "terminal / bash", "for loops", "console.log"],
        3,
        function() {
            done = true;
        }
    );
}

// Function to allow the user to input their score and initials into local storage
function enterScore() {
    clearQuizSpace();
    var response = document.createElement("form");
    response.textContent = "Enter your initials: ";
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    var submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.addEventListener("click", function() {
        var yourScore = {
            initials: initials.value.trim(),
            score: score
        };
        localStorage.setItem("lastScore", JSON.stringify(yourScore));
        done = false;
        startButton.disabled = false;
        setScores();
        leaderBoard();
    });
    response.appendChild(initials);
    response.appendChild(submit);
    quizSpace.appendChild(response);
}

// Function to set scores
function setScores() {
    var lastScore = JSON.parse(localStorage.getItem("lastScore"));
    if (lastScore) {
        highScores.push(lastScore.score);
        highNames.push(lastScore.initials);
    }
    var sortedScores = highScores.map(function(score, index) {
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

// Function to display leaderboard
function leaderBoard() {
    clearQuizSpace();
    var leaderBoardCard = document.createElement("div");
    leaderBoardCard.classList.add("question-card");
    var leaderBoardTitle = document.createElement("h1");
    leaderBoardTitle.textContent = "Leader Board";
    leaderBoardCard.appendChild(leaderBoardTitle);
    highScores.forEach(function(score, index) {
        var scoreElement = document.createElement("h2");
        scoreElement.textContent = score + " - " + highNames[index];
        leaderBoardCard.appendChild(scoreElement);
    });
    quizSpace.appendChild(leaderBoardCard);
}

// Event Listeners
startButton.addEventListener("click", startGame);
leaderButton.addEventListener("click", leaderBoard);

// Run init function on page load
init();
