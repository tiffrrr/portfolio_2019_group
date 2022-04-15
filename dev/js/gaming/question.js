var btn=[];
var questions = [];
var testArr = [];

function Question(question, choices, answer,solution) {
    this.question = question;
    this.choices = choices;
    this.answer = answer; 
    this.solution = solution;
    this.displayQuestion = function(){
        choicesBar.innerHTML = '';
        questionBar.innerHTML ='<span style="font-size:24px;font-weight:700;">問題: </span>'+this.question;
        for(var i=0;i<this.choices.length; i++){
            btn.push(document.createElement('p'));
            btn[i].innerText = this.choices[i];
            choicesBar.appendChild(btn[i]);
            btn[i].addEventListener('click',getUserChoice);
        } 
    }
    this.checkAnswer = function(uChoice){
        if(this.answer == uChoice){
            choicesBar.innerHTML = '';
            questionBar.innerText = '你答對了! 可以繼續玩!';
            questionPage.style.display="none";
            setTimeout(function(){
                life=3;
                n = Math.floor( Math.random()* questions.length);
                questions[n].displayQuestion();    
                loop();
            },100);
        }else{
            choicesBar.innerHTML = '';
            solutionHead.innerHTML = `<p style="font-size:18px; font-weight:700">正確答案是<span style="color:red;font-size:24px;width:30px;"> ${this.answer+1}</span></p>`;
            solutionText.innerHTML = `<p>${this.solution}</p>`;
            calculation.style.display="block";
            message.style.display="block";
            questionPage.style.display="none";
            console.log(this.solution);

        }
    }
}


function getQuestions(){
    var xhr = new XMLHttpRequest();
    xhr.onload=function(){
        if( xhr.status == 200 ){ 
            questionData = JSON.parse(xhr.responseText);;
            questions = buildQuestion(questionData, testArr);
            n = Math.floor(Math.random()*questions.length);
            questions[n].displayQuestion();
        }else{
            alert( xhr.status );
        }
    }
    var url = "php/game/getQuestions.php";
    xhr.open("Get", url, true);  //readyState : 1
    xhr.send( null );
}




function buildQuestion(queArray,questions){
    for(var i=0; i<queArray.length; i++){
        var q= new Question(queArray[i].question_name,[queArray[i].question_option1, queArray[i].question_option2, queArray[i].question_option3, queArray[i].question_option4], 
            parseInt(queArray[i].question_ans)-1,
            queArray[i].ans_description);
        questions.push(q);
    }
    return questions;
}

function getUserChoice(e){    
    questions[n].checkAnswer(btn.indexOf(e.target));
}








