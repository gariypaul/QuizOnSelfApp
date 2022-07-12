
const question = document.querySelector("#question");
const choices =Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
const progressText= document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions=[];

let questions =[{question:"What city was I born in ?", choice1:"Mombasa",choice2:"Homa Bay", choice3:"Ruiru", choice4:"Nairobi", answer:"4"},
{question:"What is(are) my middle name(s)", choice1:"Odhiambo",choice2:"Abiero", choice3:"1 and 2", choice4:"none", answer:"3"},
{question:"What day was my birthday", choice1:"Friday",choice2:"Monday", choice3:"Thursday", choice4:"Sunday", answer:"1"},
{question:"How long has my longest relationship lasted?", choice1:"12 months",choice2:"16 months", choice3:"3 months", choice4:"6 months", answer:"2"},
{question:"What is my favourite knowledge field (Not necessarily in an academic sense)?", choice1:"Chemistry",choice2:"Philosophy", choice3:"Ethics", choice4:"Physics", answer:"4"},
{question:"What is my highest core belief ?", choice1:"peace",choice2:"creativity", choice3:"competence", choice4:"success", answer:"1"},
{question:"What is my favorite book genre ?", choice1:"romance",choice2:"thriller", choice3:"fantasy", choice4:"Literary fiction", answer:"4"},
];



const SCORE_POINTS = 100;
const MAX_QUESTIONS= questions.length;
const incrementScore= (num)=>{
    score+=num;
    scoreText.textContent=score;
}
const getNewQuestion=()=>{
    if(availableQuestions.length===0||questionCounter>MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.textContent= `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
   
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.textContent=currentQuestion.question;

    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.textContent= currentQuestion[`choice${number}`]
    })

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers=true;
}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer? 'correct':'incorrect';

        if(classToApply==='correct'){
            incrementScore(SCORE_POINTS);
            
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1500)
    })
});
const startGame= ()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
}
startGame();
 