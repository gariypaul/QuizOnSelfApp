import fetch from "node-fetch";
import { json } from "stream/consumers";
// const question = document.querySelector("#question");
// const choices =Array.from(document.querySelectorAll(".choice-text"));
// const scoreText = document.querySelector("#score");
// const progressText= document.querySelector("#progressText");
// const progressBarFull = document.querySelector("#progressBarFull");

// let currentQuestion = {};
// let acceptingAnswers = true;
// let score = 0;
// let questionCounter = 0;
// let availableQuestions=[];
let questions = [];
// const jsonData = require("./test.json");
// questions = jsonData.questions;
// console.log(questions);
fetch("./test.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));
