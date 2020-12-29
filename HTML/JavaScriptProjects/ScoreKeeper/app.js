console.log('logging...')

const home = {
    score: 0,
    scoreDisplay: document.querySelector('#homeScore'),
    addOneBtn: document.querySelector('#addToHome'),
    teamBanner: document.querySelector('#homeBanner')
}

const away = {
    score: 0,
    scoreDisplay: document.querySelector('#awayScore'),
    addOneBtn: document.querySelector('#addToAway'),
    teamBanner: document.querySelector('#awayBanner')
}

const scoreControl = document.querySelector('#maxScore');
const resetGame = document.querySelector('#reset');

let maxScore = 0;
let isGameOver = true;

scoreControl.addEventListener('change', function (e) {
    maxScore = parseInt(this.value);
    if (!isGameOver) {
        gameReset(maxScore, maxScore);
    }
    if (maxScore > 0) {
        isGameOver = false;
    }
})

resetGame.addEventListener('click', function (e) {
    gameReset('Choose a max score', 0);
    resetGame.blur();
})

home.addOneBtn.addEventListener('click', function (e) {
    updateScore(home, away);
})

away.addOneBtn.addEventListener('click', function (e) {
    updateScore(away, home);
})

const updateScore = function (team, opposingTeam) {
    if (!isGameOver) {
        team.score += 1;
        if (team.score >= maxScore) {
            isGameOver = true;

            team.addOneBtn.disabled = true;
            opposingTeam.addOneBtn.disabled = true;

            team.teamBanner.classList.add('cWinningBoarder');
            team.scoreDisplay.classList.add('cWinningText');
            opposingTeam.scoreDisplay.classList.add('cLosingText');
        }
        team.scoreDisplay.textContent = team.score;
    }
    team.addOneBtn.blur();
}

const gameReset = function (sControl, newMax) {
    scoreControl.value = sControl;
    maxScore = newMax;

    for (let p of [home, away]) {
        p.score = 0;
        p.scoreDisplay.textContent = 0;
        p.teamBanner.classList.remove('cWinningBoarder', 'cLosingBoarder');
        p.scoreDisplay.classList.remove('cWinningText', 'cLosingText');
        p.addOneBtn.disabled = false;
    }
}