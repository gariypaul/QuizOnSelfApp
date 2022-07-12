const username = document.querySelector("#username");
const saveScorebtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.textContent=mostRecentScore;
const highScores = JSON.parse(localStorage.getItem('highScores'))||[];

const MAX_HIGH_SCORES =5;

finalScore.innerHTML = mostRecentScore;

// document.addEventListener("DOMContentLoaded", e=>{
//     username.addEventListener('keyup', ()=>{
//         saveScorebtn.disabled = !username.value;
//     })
// })


const saveHighScore = (e)=>{
    

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b)=>{
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/highscores.html')
}
