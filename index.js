var questions = [
  {
      prompt: "Commonly used data types DO NOT include:",
      options: [" strings ", " booleans ", " alerts ", " numbers "],
      answer: " alerts "
  },
  {
      prompt: "The condition in  an if/else statement is enclosed within _______.",
      options: [" quotes ", " curly brackets ", " parenthesis ", " square brackets "],
      answer: " curly brackets "
  },
  {
      prompt: "Arrays in JavaScript can be used to store _______.",
      options: [" numbers and strings ", " other arrays ", " booleans ", " all of the above "],
      answer: " all of the above "
  },
  {
      prompt: "String values must be enclosed within ______ when being assigned to variables.",
      options: ["commas", " curly brackets ", " quotes ", " parenthesis "],
      answer: " quotes "
  },
  {
      prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [" JaveScript ", " terminal/bash ", " for loops ", " console.log "],
      answer: " console.log "
  }
];

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var startBtn = document.querySelector("#start");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  var landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function(choice, i) {
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("value", choice.trim()); // Trim whitespace
      choiceBtn.textContent = i + 1 + ". " + choice.trim(); // Trim whitespace
      choiceBtn.onclick = questionClick;
      choicesEl.appendChild(choiceBtn);
  });
}

function questionClick() {
  if (this.value.toLowerCase() !== questions[currentQuestionIndex].answer.toLowerCase()) { // Case-insensitive comparison
      time -= 10;
      if (time < 0) {
          time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
  } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
      feedbackEl.textContent = ""; // Clear previous feedback
      feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
      quizEnd();
  } else {
      getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
      quizEnd();
  }
}

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
      try {
          var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
          var newScore = {
              score: time,
              name: name
          };
          highscores.push(newScore);
          window.localStorage.setItem("highscores", JSON.stringify(highscores));
      } catch (error) {
          console.error("Error saving highscore:", error);
      }
  } else {
      console.error("Name cannot be empty");
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
      saveHighscore();
  }
}

startBtn.onclick = quizStart;
nameEl.onkeyup = checkForEnter;
submitBtn.onclick = saveHighscore;
