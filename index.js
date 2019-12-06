'use strict';

//questions
const STORE = {
    questions: [
      {
        question: "What is the name of the first villain we see Saitama punch?",
        choices: [
          "Crablante", 
          "Earth Creature", 
          "Green Man", 
          "Vaccine Man"
        ],
        correctAnswer: "Crablante"
      },
      {
        question: "What colour was Saitama's hair?",
        choices: [
          "Black", 
          "Blond", 
          "Brown", 
          "He’s bald"
        ],
        correctAnswer: "He’s bald"
      },
      {
        question: "What was Saitama's workout routine?",
        choices: [
          "100 situps 100 pushups 100 squats 10 Km run", 
          "Fasting every other day Cycling 15 Km Boxing", 
          "No sleep Exercise from sunrise to sunset", 
          "Gym rat cardio and lifting Protein only diet"
        ],
        correctAnswer: "100 situps 100 pushups 100 squats 10 Km run"
      },
      {
        question: "What is the name of the villain Genos fights in episode 2?",
        choices: [
          "Mosquito Monster", 
          "Mosquito Girl", 
          "Mosquitorious", 
          "Mosquito Woman"
        ],
        correctAnswer: "Mosquito Girl"
      },
      {
        question: "Which of these characters are not in the Hero Association's Class S rank?",
        choices: [
          "Genos", 
          "Blast", 
          "Stinger", 
          "Pig God"
        ],
        correctAnswer: "Stinger"
      },
      {
        question: "What did the big chinned boy do to upset Crablante?",
        choices: [
          "The boy called him lobster man", 
          "The boy poisoned the crab that resulted in Crablante’s reaction", 
          "The boy drew fake nipples on Crablante’s shell", 
          "Crablante found the boy’s big chin repulsive"
        ],
        correctAnswer: "The boy drew fake nipples on Crablante’s shell"
      },
      {
        question: "How far does Boros punch Saitama?",
        choices: [
          "The surface of the moon", 
          "The bottom of the ocean", 
          "Into an alternate dimension", 
          "The surface of the sun"
        ],
        correctAnswer: "The surface of the moon"
      },
      {
        question: "She is a petite 28-year-old woman, whose youthful appearance leads others to confuse her for a lost little girl. The above description best describes:",
        choices: [
          "Terrible Tornado Tornado", 
          "Flashy Flash", 
          "Stinger", 
          "Samurai"
        ],
        correctAnswer: "Terrible Tornado Tornado"
      },
      {
        question: "He easily defeats monsters with a single punch.The  above description best describes",
        choices: [
          "Bang", 
          "Saitama", 
          "King", 
          "Sitch"
        ],
        correctAnswer: "Saitama"
      },
      {
        question: "Blue Fire lost his hands to one of the following characters.",
        choices: [
          "Peach Terry", 
          "Magicman", 
          "Garou", 
          "Lightning Genji"
        ],
        correctAnswer: "Garou"
      }
    ],
    questionNo: 0,
    score: 0
}   

//starts the quiz
function startQuiz(){
    $('.quiz-box').on('click', '.startBtn', function(event) {
        event.preventDefault();      
        $('.quiz-box').removeClass('start-box');    
        renderQuestionAndAnswer();
    });
}

//construct the questions and the choices
function generateQuestionAndAnswers(){
    $('.question-and-score').empty();
    if(STORE.questionNo < STORE.questions.length){
        generateQuestion();
        generateChoices();
        updateQuestionAndScore();
    }
    else{
        finalResult();
    }
}

//template to generate the question
function generateQuestion(){
    let question = STORE.questions[STORE.questionNo];
    $('.quiz-box').empty();
    let generatedQuestion = $(`<form id="question-form">
        <fieldset>
            <div>
                <legend class="question">${question.question}</legend>
                <p class="feedback feedback-container">Choose the correct answer:</p>
            </div>     
        </fieldset>
    </form>`);
    $(".quiz-box").append(generatedQuestion);    
}

//will add a class for the selected choice
function selectValue() {
  $('.quiz-box').on('click', '.answers', function() {
    $('.quiz-box').find('.selected').each(function() {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');
    $(this).find('input[type=radio]').prop('checked', true);
  })
}

//template to generate choice
function generateChoices(){
    let question = STORE.questions[STORE.questionNo];
    let divSelector = $("#question-form").find("div");
    divSelector.append("<ul>");
    for(let i=0; i<question.choices.length; i++)
    {      
        $(".quiz-box").find("ul").append(`<li class="answers">
        <input type = "radio" name="choices" id="option-${i+1}" value= "${question.choices[i]}"> 
            <label for="option-${i+1}"> ${question.choices[i]}</label></li>
        `);
    }
    divSelector.append(`</ul><button type="submit" class="submitBtn button">Submit</button>
    <button type="button" class="nextBtn button">Next</button>`);
    $('input[type=radio]:first').prop('checked', true);
    $('input[type=radio]:first').parent().addClass('selected');
    $(".nextBtn").hide();
}

//resulting feedback for correct answer
function correctAnswer(){
    let feedbackSelector = $('.feedback');
    feedbackSelector.removeClass('incorrect').addClass('correct');
    feedbackSelector.append('Your answer is correct!');
}

//resulting feedback for correct answer
function incorrectAnswer(){
    let feedbackSelector = $('.feedback');
    let userAnswer = $('input:checked');
    let question = STORE.questions[STORE.questionNo];
    let correctAnswer = question.correctAnswer;
    feedbackSelector.removeClass('correct').addClass('incorrect');
    feedbackSelector.append(`Your answer is incorrect! The correct answer is "${correctAnswer}".`);
    userAnswer.addClass('correct-selected');
}

//template to show the updated values of question number and score
function updateQuestionAndScore(){
    $('.question-and-score').prepend(`<ul>   
        <li id="js-question-no">Question: ${STORE.questionNo + 1}/${STORE.questions.length}</li>
        <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
}

//generates the next question
function nextQuestion(){
    $('.quiz-box').on('click', '.nextBtn', function (event) {
        renderQuestionAndAnswer();
    });
}

//submits the answer and checked if it is correct
function submitAnswer(){
    $('.quiz-box').on('click', '.submitBtn', function(event) {
        event.preventDefault();
        let userAnswer = $('input:checked').val();
        let question = STORE.questions[STORE.questionNo];
        let actualAnswer = question.correctAnswer;        
        $('.feedback').empty();
        if (userAnswer === actualAnswer) {  
            correctAnswer();
            STORE.score++; 
        } 
        else {
            incorrectAnswer();
        }
        STORE.questionNo++;
        $('#js-score').text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('.submitBtn').hide();
        $('.nextBtn').show();
    });
}

//generate the final result of the completed quiz
function finalResult(){
    let percentage = STORE.score * 10;
    $('.quiz-box').empty();
    $('.quiz-box').addClass('quiz-result');
    $('.question-and-score').hide();
    let generatedResult = $(`<form>
        <fieldset>
            <div>
                <legend>Your Score</legend>
                <h2>${percentage} %</h2>
                <button type="button" class="restartBtn button">Try Again</button>
            </div>     
        </fieldset>
    </form>`);
    $('.quiz-box').append(generatedResult);
    STORE.questionNo = 0;
    STORE.score = 0;
}

//restart the quiz
function restartQuiz(){
    $('.quiz-box').on('click', '.restartBtn', function(event) {
        $('.question-and-score').show();
        $('.quiz-box').removeClass('quiz-result');
        renderQuestionAndAnswer();
      });
}

function renderQuestionAndAnswer(){   
    generateQuestionAndAnswers();
}

//runs the functions
function launchQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
    selectValue()
  }
  
  $(launchQuiz);
