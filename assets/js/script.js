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

//initialize function that sets values for local storage
function init() {
    //gets scores and names from local storage
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    var storedNames = JSON.parse(localStorage.getItem("highNames"));
    //checks for null values and sets them if they are not null
    if (storedScores !== null) {
        highScores = storedScores;
    }

    if (storedNames !== null) {
        highNames = storedNames;
    }
}   

//function that runs on start press. Sets time, starts win condition, and runs first question
function startGame() {
    timerCount = 60;
    
    startTimer()
    questionOne();
}

function startTimer() {
//timer function that decrements every second and checks if you have won or not
timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    
    if (timerCount >= 0 && done) {
        score = timerCount;
        startButton.disabled = true;
        clearInterval(timer);
        //this for loop removes all children from quizSpace
        for (var i = 0; i = quizSpace.childElementCount; i++) {
            quizSpace.removeChild(quizSpace.lastChild);
        }
        enterScore();
    }
    // Function to test if you ran out of time
    if (timerCount <= 0) {

        for (var i = 0; i = quizSpace.childElementCount; i++) {
            quizSpace.removeChild(quizSpace.lastChild);
        }
        //If you lost you get a prompt telling user and resetting the start button so user can play again
        var gameOver = document.createElement("h1");
        gameOver.textContent = "Game Over!";
        quizSpace.appendChild(gameOver);

        clearInterval(timer);
        startButton.disabled = false;
        }
    }, 1000);
}
//the start of a series of loops that creates the elements, content, appends them to quizSpace, and creates eventlisteners for each answer.
function questionOne() {
    //for loop to remove all children from quizSpace
    for (var i = 0; i = quizSpace.childElementCount; i++) {
        quizSpace.removeChild(quizSpace.lastChild);
    }
    //Creates a question card
    var questionCard = document.createElement("div");
    questionCard.classList.add("question-card");
    //Creates a header 1 element and assigns it to a variable 
    var question = document.createElement("h1");
    //sets the text of the variable
    question.textContent = "Commonly used data types DO NOT include:";
    //appends the variable to questionCard
    questionCard.appendChild(question);

    //creates a button for each potential answer
    var answer1 = document.createElement("button");
    answer1.textContent = "strings";
    questionCard.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.textContent = "booleans";
    questionCard.appendChild(answer2);

    var answer3 = document.createElement("button");
    answer3.textContent = "alerts";
    questionCard.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.textContent = "numbers";
    questionCard.appendChild(answer4);

    //attaches an event listener to each button that sets the answer variable to true or false and runs the next question
    answer1.addEventListener("click", function() {
        //sets answer to false which will effect a variable in the next loop
        answer = false;
        //since the user lost they lose 10 seconds
        timerCount = timerCount - 10;
        //moves onto the next question loop
        questionTwo();
    });
    answer2.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionTwo();
    });
    answer3.addEventListener("click", function() {
        answer = true;
        questionTwo();
    });
    answer4.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionTwo();
    });

    quizSpace.appendChild(questionCard);
}
//Question 2 loop, same as the first
function questionTwo() {
    //for loop to remove all children from quizSpace
    for (var i = 0; i = quizSpace.childElementCount; i++) {
        quizSpace.removeChild(quizSpace.lastChild);
    }

    //Creates a question card
    var questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    var question = document.createElement("h1");
    question.textContent = "The condition in an if / else statement is enclosed within ____.";
    questionCard.appendChild(question);

    var answer1 = document.createElement("button");
    answer1.textContent = "quotes";
    questionCard.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.textContent = "curly brackets";
    questionCard.appendChild(answer2);

    var answer3 = document.createElement("button");
    answer3.textContent = "parentheses";
    questionCard.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.textContent = "square brackets";
    questionCard.appendChild(answer4);

    //if statement that is set by the previous loop depending on if they answered correctly or not in the previous question
    if(answer) {
        var response = document.createElement("h3")
        response.textContent = "Correct!";
        questionCard.appendChild(response);
    } else {
        var response = document.createElement("h3")
        response.textContent = "Wrong!";
        questionCard.appendChild(response);
    }

    answer1.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionThree();
    });
    answer2.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionThree();
    });
    answer3.addEventListener("click", function() {
        answer = true;
        questionThree();
    });
    answer4.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionThree();
    });

    quizSpace.appendChild(questionCard);
}
//Question loop 3 same as 1 and 2
function questionThree() {
    //for loop to remove all children from quizSpace
    for (var i = 0; i = quizSpace.childElementCount; i++) {
        quizSpace.removeChild(quizSpace.lastChild);
    }

    //Creates a question card
    var questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    var question = document.createElement("h1");
    question.textContent = "Arrays in JavaScript can be used to store ____.";
    questionCard.appendChild(question);
    
    var answer1 = document.createElement("button");
    answer1.textContent = "numbers and strings";
    questionCard.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.textContent = "other arrays";
    questionCard.appendChild(answer2);

    var answer3 = document.createElement("button");
    answer3.textContent = "booleans";
    questionCard.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.textContent = "all of the above";
    questionCard.appendChild(answer4);

    if(answer) {
        var response = document.createElement("h3")
        response.textContent = "Correct!";
        questionCard.appendChild(response);
    } else {
        var response = document.createElement("h3")
        response.textContent = "Wrong!";
        questionCard.appendChild(response);
    }

    answer1.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionFour();
    });
    answer2.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionFour();
    });
    answer3.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionFour();
    });
    answer4.addEventListener("click", function() {
        answer = true;
        questionFour();
    });

    quizSpace.appendChild(questionCard);
}
//question loop 4 same as 1, 2, and 3
function questionFour() {
    //for loop to remove all children from quizSpace
    for (var i = 0; i = quizSpace.childElementCount; i++) {
        quizSpace.removeChild(quizSpace.lastChild);
    }

    //Creates a question card
    var questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    var question = document.createElement("h1");
    question.textContent = "String values must be enclosed within ____ when being assigned to variables.";
    questionCard.appendChild(question);

    var answer1 = document.createElement("button");
    answer1.textContent = "commas";
    questionCard.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.textContent = "curly brackets";
    questionCard.appendChild(answer2);
    
    var answer3 = document.createElement("button");
    answer3.textContent = "quotes";
    questionCard.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.textContent = "parentheses";
    questionCard.appendChild(answer4);

    if(answer) {
        var response = document.createElement("h3")
        response.textContent = "Correct!";
        questionCard.appendChild(response);
    } else {
        var response = document.createElement("h3")
        response.textContent = "Wrong!";
        questionCard.appendChild(response);
    }

    answer1.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionFive();
    });
    answer2.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionFive();
    });
    answer3.addEventListener("click", function() {
        answer = true;
        questionFive();
    });
    answer4.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        questionFive();
    });

    quizSpace.appendChild(questionCard);
}
//Question loop 5 similar to the rest but will break out upon selecting an answer
function questionFive() {
    //for loop to remove all children from quizSpace
    for (var i = 0; i = quizSpace.childElementCount; i++) {
        quizSpace.removeChild(quizSpace.lastChild);
    }

    //Creates a question card
    var questionCard = document.createElement("div");
    questionCard.classList.add("question-card");

    var question = document.createElement("h1");
    question.textContent = "A very useful tool used during development and debugging for printing content to the debugger is:";
    questionCard.appendChild(question);

    var answer1 = document.createElement("button");
    answer1.textContent = "JavaScript";
    questionCard.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.textContent = "terminal / bash";
    questionCard.appendChild(answer2);

    var answer3 = document.createElement("button");
    answer3.textContent = "for loops";
    questionCard.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.textContent = "console.log";
    questionCard.appendChild(answer4);

    if(answer) {
        var response = document.createElement("h3")
        response.textContent = "Correct!";
        questionCard.appendChild(response);
    } else {
        var response = document.createElement("h3")
        response.textContent = "Wrong!";
        questionCard.appendChild(response);
    }

    answer1.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        //done variable breaks the user out of the question loop
        done = true;
    });
    answer2.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        done = true;
    });
    answer3.addEventListener("click", function() {
        answer = false;
        timerCount = timerCount - 10;
        done = true;
    });
    answer4.addEventListener("click", function() {
        answer = true;
        done = true;
    });

    quizSpace.appendChild(questionCard);
}
//function to allow the user to input their score and intitals into local storage
function enterScore() {
    //creates a form element and sets the text content
    var response = document.createElement("form")
    response.textContent = "Enter your initials: ";
    quizSpace.appendChild(response);
    //creates an input element for the user to input their ititials
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    quizSpace.appendChild(initials);
    //buttom to submit the form
    var submit = document.createElement("button");
    submit.textContent = "Submit";
    quizSpace.appendChild(submit);
    //event listener for the form that adds the score and initials to local storage
    submit.addEventListener("click", function() {
        
        var yourScore = {
            initials: initials.value.trim(),
            score: score
        };

    localStorage.setItem("lastScore", JSON.stringify(yourScore));
    //resets done and start button to allow the user to play again
    done = false;
    startButton.disabled = false;

    setScores();
    leaderBoard();

    });

}

function setScores() {
    //pulls scores and names from local storage
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    var storedNames = JSON.parse(localStorage.getItem("highNames"));
    var lastScore = JSON.parse(localStorage.getItem("lastScore"));
    //Checks local storage values to see if they are empty and sets them to the variables
    if (storedScores !== null) {
        highScores = storedScores;
    }

    if (storedNames !== null) {
        highNames = storedNames;
    }
    //push adds the last score from the user to the array
    if (lastScore !== null) {
        highScores.push(lastScore.score);
        highNames.push(lastScore.initials);
    }
    //creates a variable that combines the scores and names into one array and maps them together
    var sortedScores = highScores.map(function(score, index) {
        return { score: score, name: highNames[index] };
    //sorts the scores and keeps the position of highNames and highScores together while sorting highScores descending
    }).sort(function(a, b) {
        return b.score - a.score;
    });

    //updates highScores and highNames arrays with the sorted values
    highScores = sortedScores.map(function(item) {
        return item.score;
    });

    highNames = sortedScores.map(function(item) {
        return item.name;
    });
    //Side note i could have just put scores and names into an object like i did yourScore but just forgot by this point and just searched up an obviously more complicated
    //method of sorting arrays and keeping them together. 

    //sets the scores and names to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.setItem("highNames", JSON.stringify(highNames));
}
//function for diplaying leaderboard
function leaderBoard() {
    //clears child elements
    for (var i = 0; i = quizSpace.childElementCount; i++) {
        quizSpace.removeChild(quizSpace.lastChild);
    }
    //creates leaderboard card
    var leaderBoardCard = document.createElement("div");
    leaderBoardCard.classList.add("question-card");

    //creates header for leaderboard title
    var leaderBoardTitle = document.createElement("h1");
    leaderBoardTitle.textContent = "Leader Board";
    leaderBoardCard.appendChild(leaderBoardTitle);

    //for loop to create an h2 elecment for each score and name
    for (var i = 0; i < highScores.length; i++) {
        var score = document.createElement("h2");
        score.textContent = highScores[i] + " - " + highNames[i];
        leaderBoardCard.appendChild(score);
    }

    quizSpace.appendChild(leaderBoardCard);
}


//runs init function on page load
init();
//button listeners for start and leaderboard buttons
startButton.addEventListener("click", startGame);
leaderButton.addEventListener("click", leaderBoard);
