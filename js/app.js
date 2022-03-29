const quiz = document.getElementById("quiz");
const choices = Array.from(document.getElementsByClassName("answer-text"));
const userInput = document.getElementById("userInput");
const error = document.getElementById("error");
const gohome = document.getElementById("go-home");


// VARIABLES

let presentQuestion = {};
let accessibleQuestions = {};
let quizCounter = 0;
let acceptingAnswers = false;

// CONSTANTS

const MAXIMUM_QUESTIONS = accessibleQuestions.length;

let quizes = [];

// Fetching json file 

fetch("quizes.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuizes => {
        quizes = loadedQuizes;
        startApp();
    })
    .catch(err => {
        console.error(err);
    });

// functions

// Starting the Application

startApp = () => {
    accessibleQuestions = [...quizes];
    loadNextQuestion();
}

// Loading the next question

loadNextQuestion = () => {
    // populating questions

    const quizIndex = Math.floor(Math.random() * accessibleQuestions.length);
    presentQuestion = accessibleQuestions[quizIndex];
    quiz.innerText = presentQuestion.question;

    // Iterating through the answers 

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = presentQuestion['choice' + number];
    });
    accessibleQuestions.splice(quizIndex, 1);
    acceptingAnswers = true;
    quizCounter++;


};

// Validating answer

checkAnswer = () => {
    // Get what the user typed in

    acceptingAnswers = false;
    const inputAnswer = userInput.value; 
    const correctAnswer = presentQuestion.answer;
    
    choices.forEach(choice => {
        const dataSetValue = choice.dataset['number'];
        if (dataSetValue == correctAnswer) {
            const actualAnswer = choice.innerText;

            const styleToApply = inputAnswer.toLowerCase().trim() == actualAnswer.toLowerCase() ? "correct" : "incorrect";
            if (styleToApply == "incorrect") {
                userInput.parentElement.classList.add(styleToApply); // Adding class
                setTimeout(() => {
                    userInput.parentElement.classList.remove(styleToApply);
                    userInput.value = "";
                    error.textContent = "Wrong Answer! Please Try Again";
                    error.style.color = "#dc3545";
                }, 1000);
                return presentQuestion.question;
            } else {
                userInput.parentElement.classList.add(styleToApply);
                error.textContent = "Good! Correct Answer";
                error.style.color = "#28a745";
                setTimeout(() => {
                    userInput.parentElement.classList.remove(styleToApply);
                    error.textContent = "";
                    userInput.value = "";
                    loadNextQuestion();
                }, 1000);
                
                
            }
        }
        
        
    });
}

// Go Home

gohome.addEventListener("click", function() {
    
    return window.location.assign("/index.html");
});



// Resetting Question

// goHome = () => {
//     return window.location.assign("/index.html");
// }



