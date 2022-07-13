
const question = document.querySelector("#question");
const choices =Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
const progressText= document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");
const hintExpSpan = document.querySelector("#hint");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions=[];


let questions =[{question:"What city was I born in ?", choice1:"Mombasa",choice2:"Homa Bay", choice3:"Ruiru", choice4:"Nairobi", answer:"4", hint:"Capital",explanation:"No explanation really"},
{question:"What is(are) my middle name(s)", choice1:"Odhiambo",choice2:"Abiero", choice3:"1 and 2", choice4:"none", answer:"3",hint:"Hint: 2" ,explanation:"Hehehe"},
{question:"What day was my birthday", choice1:"Friday",choice2:"Monday", choice3:"Thursday", choice4:"Sunday", answer:"1",hint:"Hint: Capitalist Happiness",explanation:"Yeet"},
{question:"What is my favourite knowledge field (Not necessarily in an academic sense)?", choice1:"Chemistry",choice2:"Philosophy", choice3:"Ethics", choice4:"Physics", answer:"4",hint:"Hint: The world",explanation:"I love physics when I am not getting tested for it"},
{question:"What is my highest core belief ?", choice1:"peace",choice2:"creativity", choice3:"competence", choice4:"success", answer:"1",hint:"Hint: Inner Self" ,explanation:"I love peace. Call me competent UN!"},
{question:"What is my favorite book genre ?", choice1:"romance",choice2:"thriller", choice3:"fantasy", choice4:"Literary fiction", answer:"4",hint:"Hint: I don't know either",explanation:"I like the authorial creative authority in this genre. Can get true gems here"},
{question:"What supernatural ability would I like to have ?", choice1:"Invisibility",choice2:"Telepathy and Telekinesis", choice3:"Embody someone’s experience", choice4:"Ability to fly", answer:"3",hint:"Hint: Think connection ",explanation:"In the sense that I could be able to physically connect with so many different perspectives and life experiences"},
{question:"My most fulfilling hobby ?", choice1:"Drawing",choice2:"Making music", choice3:"Football", choice4:"Gaming", answer:"2",hint:"Hint: Sonic the hedgehog",explanation:"I love when sonic experiences jumpstart the imagination to different feelings and worlds. Only when I can make such music anyways"},
{question:"What type of house architecture would I prefer?", choice1:"Modern Contemporary ",choice2:"Post Modern", choice3:"Baroque", choice4:"Neo Classical", answer:"2",hint:"Hint: No hint needed; will make it too obvious",explanation:"I love how the style is not too limited and can be made to sync with nature more if done right"},
{question:"My current favourite comic based series?", choice1:"Marvel Movies",choice2:"The Umbrella Academy", choice3:"South Park", choice4:"Archer", answer:"4",hint:"Hint: It's a secret",explanation:"Been watching it this summer and its good"},
{question:"My favourite form of transportation?", choice1:"Rail",choice2:"Airplanes", choice3:"Cars", choice4:"Ships and water vessels", answer:"1",hint:"Hint: Sheldon from big bang theory",explanation:"Best form if implemented well and is clean because serves a lot of people and kills car supremacy when efficient"},
{question:"What animal would I rather be?", choice1:"Lion",choice2:"Panda", choice3:"Elephant", choice4:"Deer", answer:"2",hint:"Hint: They are cool and chonky bois",explanation:"Because they look peaceful as hell."},
{question:"What is the most likely reason for my insomnia", choice1:"Stress",choice2:"Depression", choice3:"Sickness", choice4:"Discomfort", answer:"4",hint:"Hint: I’ve told you about it-ish",explanation:"My leg is still not properly aligned, and it stops me from getting good sleep quality most nights. Subluxation is a bitch"},
{question:"If I could trade places with someone for a day, who would I be", choice1:"Jeff Bezos",choice2:"Kendrick Lamar", choice3:"My Parents", choice4:"Noone", answer:"3",hint:"Hint: Underappreciated potential ",explanation:"I feel like I sometimes underappreciate my parents and would be nice to know what they really experience. Daddy Bezos is a close second"},
{question:"What do I feel most proud of currently ?", choice1:"Getting more money",choice2:"Having better friendships over the years", choice3:"Overall great personal growth", choice4:"Being a better computer science nerd", answer:"4",hint:"Hint: Growth is unavoidable" ,explanation:"I feel like personal growth stuff is obvious if you're alive so I'll go with nerd"},
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

    hintExpSpan.textContent = currentQuestion.hint;

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
            hintExpSpan.textContent = currentQuestion.explanation;
        }
        selectedChoice.parentElement.classList.add(classToApply);

       

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },2000)
    })
});
const startGame= ()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
}
startGame();
 