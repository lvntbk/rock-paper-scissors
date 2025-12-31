const choices = ['tas', 'kagit', 'makas'];
const choiceButtons = document.querySelectorAll('.choice-btn');
const resultText = document.getElementById('result-text');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset-btn');
const container = document.querySelector('.game-container');

let scores = {
    user: 0,
    computer: 0
};

const getComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

const updateScoreBoard = () => {
    userScoreSpan.textContent = scores.user;
    computerScoreSpan.textContent = scores.computer;
};

const removeEffects = () => {
    container.classList.remove('shake-animation');
    choiceButtons.forEach(btn => btn.classList.remove('winner-glow'));
};

const showResult = (result, userChoice, computerChoice, userBtnElement) => {
    const formattedUser = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
    const formattedComp = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

    removeEffects();

    if (result === 'win') {
        resultText.innerHTML = `${formattedUser}, ${formattedComp}'ı yendi! <span style="color:#2ecc71">Kazandın!</span>`;
        scores.user++;
        userBtnElement.classList.add('winner-glow');
    } else if (result === 'lose') {
        resultText.innerHTML = `${formattedUser}, ${formattedComp}'a yenildi. <span style="color:#e74c3c">Kaybettin!</span>`;
        scores.computer++;
        container.classList.add('shake-animation');
        setTimeout(() => container.classList.remove('shake-animation'), 500);
    } else {
        resultText.innerHTML = `${formattedUser} ve ${formattedComp}. <span style="color:#bdc3c7">Berabere.</span>`;
    }
    updateScoreBoard();
};

const getWinner = (p, c) => {
    if (p === c) return 'draw';
    if (
        (p === 'tas' && c === 'makas') ||
        (p === 'kagit' && c === 'tas') ||
        (p === 'makas' && c === 'kagit')
    ) {
        return 'win';
    }
    return 'lose';
};

const handleChoice = (e) => {
    const userBtn = e.currentTarget;
    const userChoice = userBtn.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getWinner(userChoice, computerChoice);
    showResult(result, userChoice, computerChoice, userBtn);
};

const resetGame = () => {
    scores.user = 0;
    scores.computer = 0;
    updateScoreBoard();
    resultText.textContent = 'Hamleni Yap';
    removeEffects();
};

choiceButtons.forEach(button => button.addEventListener('click', handleChoice));
resetBtn.addEventListener('click', resetGame);