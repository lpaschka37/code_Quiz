//define questions array
var questions = [
    {   question: "How to write an IF statement in JavaScript?",
        answers: {
            a: "if (i == 5)",
            b: "if i = 5",
            c: "if i = 5 then",
            d: "if i == 5 then"
        },
        correctAnswer: "a"
    },
    {   question: "How do you call a function named \'myFunction\'?",
        answers: {
            a: "myFunction()",
            b: "call myFunction ()",
            c: "call function myFuncion",
            d: "myFunction(Function)"
        },
        correctAnswer: "a"
    },
    {   question: "Which of the following is considered a string object?",
        answers: {
            a: 64,
            b: "656302",
            c: false,
            d: "",
        },
        correctAnswer: "b"
    },
    {   question: "How do you write \'Hello World\' in an alert box?",
        answers: {
            a:  "msgBox(\'Hello World\')",
            b:  "msg(\'Hello World\')",
            c:  "alert(\'Hello World\')",
            d:  "alertBox(\'Hello World\')",
        },
        correctAnswer: "c"
    },
    {   question: "How does a FOR loop start?",
        answers: {
            a: "for (i = 0; 1 <= 5; i++)",
            b: "for (i <= 5; i++)",
            c: "for i = 1 to 5)",
            d: "for (i = 0; i <= 5)"
        },
        correctAnswer: "a"
    },
    {   question: "What is the correct syntax for referring to an external script called \'script.js\'?",
        answers: {
            a: "<script href=\'script.js\'",
            b: "<link script=\'script.js\'",
            c: "<script text=\'script.js\'",
            d: "<script src=\'script.js\'"
        },
        correctAnswer: "d"
    },
    {   question: "Where is the correct place to insert a JavaScript?",
        answers: {
            a: "The <footer> section",
            b: "Both the <head> section and the <body> section",
            c: "The <head> section",
            d: "The <body> section"
        },
        correctAnswer: "b"
    },
    {   question: "How does a WHILE loop start?",
        answers: {
            a: "while i = 1 to 10",
            b: "while (i <= 10)",
            c: "while (1<= 10; i ++)",
            d: "msg \'(Hello World!)\'"
        },
        correctAnswer: "b"
    },
    {   question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<script>",
            b: "<javascript>",
            c: "<script>",
            d: "<js>"
        },
        correctAnswer: "c"
    }
];

// define a variable to represent the current question
var currentQuestion = 0;
var secondsLeft = 100;
var time;
var score = 0;
var initials = "";
var highscores = [];
var recordCount = 0;

quizMain();

// display the main landing page
function quizMain() {
    // load main view
    mainView();
    $('#highscoresBtn').on("click", getHighscores);
    $("#startBtn").on("click", startQuiz);
}

// the main view layout
function mainView() {
    // hide quiz view, end view, and high scores view
    $('#timerDisplay').addClass('hidden');
    $('.questionContainer').addClass('hidden');
    $('.answers').addClass('hidden');
    $('.resultCont').addClass('hidden');
    $('.gameOver').addClass('hidden');
    $('.highscores').addClass('hidden');
    $('#back').addClass('hidden');
}

function startQuiz() {
    stopTime();
    quizView();
    setTime();
    loadQuestions();
}

function quizView() {
    $('#highscoresBtn').addClass('hidden');
    $('.startQuiz').addClass('hidden');
    // Show quiz 
    $('#timerDisplay').removeClass('hidden');
    $('.questionContainer').removeClass('hidden');
    $('.answers').removeClass('hidden');
    $('.resultCont').removeClass('hidden');
    $('.score').removeClass('hidden');
    $('.initials').removeClass('hidden');
}

// start timer
function setTime() {
    var timeEl = document.querySelector('#time');
    secondsLeft = secondsLeft - 1;
    timeEl.textContent = secondsLeft;
    time = setTimeout(setTime, 1000);
}

function loadQuestions() {
    $('#question').text(questions[currentQuestion].question);
    $('#a').text(questions[currentQuestion].answers.a);
    $('#b').text(questions[currentQuestion].answers.b);
    $('#c').text(questions[currentQuestion].answers.c);
    $('#d').text(questions[currentQuestion].answers.d);

    document.getElementById('a').addEventListener("click", response);
    document.getElementById('b').addEventListener("click", response);
    document.getElementById('c').addEventListener("click", response);
    document.getElementById('d').addEventListener("click", response);
}

// compare user's reponse to the correct answer
function response() {
    
    var response = $(this).attr('id');
    if (currentQuestion === 9) {
        gameOver();
    }
    else if (secondsLeft === 0) {
        secondsLeft = 0;
        gameOver();
    }
    else if (response === questions[currentQuestion].correctAnswer) {
        // document.getElementById("#result1").style.color = "green";
        $('#result').html('CORRECT!');
        $('#result').fadeOut(1000, function () {
            $(this).html('').show();
        });
        currentQuestion += 1;
        loadQuestions();
    }
    else {
        // document.getElementById("#result2").style.color = "red";
        $('#result').html('INCORRECT!');
        $('#result').fadeOut(1000, function () {
            $(this).html('').show();
        });
        if (secondsLeft < 10) {
            secondsLeft = 0;
            gameOver();
        }
        secondsLeft -= 10;
        currentQuestion += 1;
        loadQuestions();
    }
}

// stop timer
function stopTime() {
    //console.log("stopTime");
    clearTimeout(time);
}

// End game
function gameOver() {

    stopTime();
    theEnd();
    score = secondsLeft;
    $('#score').html(score);

    if (score > 0) {
        $('#initals').text("");
        $('#endText').html("HOORAY! APPLAUSE ALL AROUND!");
        $('#endSubText').html("The quiz is over. You made it! Enter your initials and click submit score button to record your Score.");
        $('#submit').click(function () {
            initials = $('#initials').val();

            //console.log(initials);
            if (initials.length == 0) {
                alert("You forgot to enter your initials, dont you want to show the world your highscore?");
            }
            recordCount++;
            submitHighscore();
        });
    } else {
        $('#endTextFail').html("Whoops! Try Again!");
        $('#endText').addClass('hidden');
        $('#submit').addClass('hidden');
        $('.initials').addClass('hidden');
        $('#highscoresBtn').removeClass('hidden');
    }   
    
    $('#restartBtn').on("click", restartQuiz);
}


function theEnd() {    
    $('.questionContainer').addClass('hidden');
    $('.answers').addClass('hidden');
    $('.resultCont').addClass('hidden');
    $('.timer').addClass('hidden');
    $('.gameOver').removeClass('hidden');
}

// retreive highscores for display
function getHighscores(){    
    highScoresView();
    var getScore = localStorage.getItem("score", score);
    var getInitials = localStorage.getItem("initials", initials);
    $('#scoreDisplay').append(getScore + " " + getInitials + "<br>");

}

// view highscores
function submitHighscore () {
    // console.log("submitHighscore");             
    highScoresView();
    saveScore();
    renderHighscores();
    getHighscores();
}

// configure highscores view
function highScoresView() {
    console.log("highscores view");
    $('.startQuiz').addClass('hidden');
    $('.gameOver').addClass('hidden');
    $('.highscores').removeClass('hidden');
    $('#restartBtn').removeClass('hidden');
    $('#highscoresBtn').addClass('hidden');
    $('#back').removeClass('hidden');
    $('#back').click(restartQuiz);
}

// restart the quiz and initialize variables
function restartQuiz() {
    console.log("restartQuiz");
    // Hide intro view, and quizView
    $('#highscoresBtn').removeClass('hidden');
    $('.startQuiz').removeClass('hidden');
    $('.gameOver').addClass('hidden');
    $('#submit').removeClass('hidden');
    $('.initials').removeClass('hidden');
    $('.highscores').addClass('hidden');

    currentQuestion = 0;
    secondsLeft = 60;
    score = 0;
    initials = "";

    stopTime();
    quizMain();
}

// save scores to local storage
function saveScore() {
    // console.log("saveScore");
    // console.log(initials);
    
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
}
var recordCountSpan = $('#recordCountSpan');

function renderHighscores() {
    $('#highscore').html = "";
    recordCountSpan.text = highscores.length;
                      
    for (var i = 0; i < highscores.length; i++) {
        var hScore = highscores[i];

        var li = $('<li>');
        li.textContent = hScore;
        li.setAttribute("data-index", i);

        $('#highscore').append(li);
        
    }
    
}
