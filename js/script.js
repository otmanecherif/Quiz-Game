const start_btn = document.querySelector(".start_btn button");
const rule_box = document.querySelector(".rule_box");
const continue_btn = rule_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const options_list = document.querySelector(".options_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");
let time_text = quiz_box.querySelector(".timer .time_text");


let question_count = 0;      
let startTimeValue = 15;

continue_btn.onclick = ()=>{
    rule_box.classList.remove("activeRule");
    quiz_box.classList.add("activeQuiz");
    showQuestions(question_count);
    startClock(startTimeValue);
}


const next_btn = quiz_box.querySelector(".next_question");
const result_box = document.querySelector(".result_box");
const replay_quiz = result_box.querySelector(".buttons .replay");
const quit_quiz = result_box.querySelector(".buttons .quit");



function showQuestions(index){
    const question_text = document.querySelector(".question_text");
    const footer_qst_number = document.querySelector(".total_questions");

    let question_tag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let options_tag = '<div class="option"><span>'+ questions[index].options[0]+'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[1]+'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[2]+'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[3]+'</span></div>';

    let footer_qst_number_tag = '<div class="total_questions"><span>Question <p>'+ questions[index].number+ '</p> of <p>' + questions.length+ '</p></span></div>';
    question_text.innerHTML = question_tag;
    options_list.innerHTML = options_tag;
    footer_qst_number.innerHTML = footer_qst_number_tag;

    const option = options_list.querySelectorAll(".option");
    for(let index = 0; index < option.length; index++){
        option[index].setAttribute("onclick", "selectedOption(this)");
    }
}


let checkIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let numberOfGoodAnswers = 0;


function selectedOption(answer){
    stopTimer();
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    
    
    if(userAnswer == correctAnswer){
        answer.classList.add("correctAns");
        answer.insertAdjacentHTML("beforeend", checkIcon);
        numberOfGoodAnswers++;
        console.log("bingo!");
    }else{
        answer.classList.add("incorrectAns");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        console.log("ak ghalet sahbé");  

        for (let j = 0; j < options_list.children.length; j++) {
            if(options_list.children[j].textContent == correctAnswer){
                options_list.children[j].setAttribute("class", "option correctAns");
            }
        }
    }

    for (let i = 0; i < options_list.children.length; i++) {
        options_list.children[i].classList.add("disableClick");
    }

    next_btn.style.display = "block";
    
}

let counter;

function startClock(time){
    time_text.innerHTML = "Time Left";

    let correctAnswer = questions[question_count].answer;
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        if(time > 0){
            time = time - 1;
        } else{
            time_text.innerHTML = "Time Off";
            for (let i = 0; i < options_list.children.length; i++) {
                options_list.children[i].classList.add("disableClick");
            }
            for (let j = 0; j < options_list.children.length; j++) {
                if(options_list.children[j].textContent == correctAnswer){
                    options_list.children[j].setAttribute("class", "option correctAns");
                }
            }
            next_btn.style.display = "block";
        }
    }
}

function stopTimer(){
    clearInterval(counter);
}


next_btn.onclick = ()=>{
    
    if(question_count < questions.length-1){
        question_count++;
        showQuestions(question_count);
        clearInterval(counter);
        startClock(startTimeValue);
        next_btn.style.display = "none";
    } else{
        const score_text = result_box.querySelector(".score_text");
        rule_box.classList.remove("activeRule");
        quiz_box.classList.remove("activeQuiz");
        result_box.classList.add("activeResult");
        if (numberOfGoodAnswers < 3){
            let score_tag = '<div class="score_text"><span>You got <p>'+ numberOfGoodAnswers +'</p> out of <p>5</p>. Better luck next time! </span></div>';
            score_text.innerHTML = score_tag;
        }else if(numberOfGoodAnswers < 5){
            let score_tag = '<div class="score_text"><span>Good job! You got <p>'+ numberOfGoodAnswers +'</p> out of <p>5</p></span></div>';
            score_text.innerHTML = score_tag;
        }else{
            let score_tag = '<div class="score_text"><span>Perfect! You got <p>'+ numberOfGoodAnswers +'</p> out of <p>5</p></span></div>';
            score_text.innerHTML = score_tag;
        }
    
        console.log("There are no more questions!");
    }
    
}