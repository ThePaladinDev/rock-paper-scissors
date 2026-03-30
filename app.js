//
// GAME VARIABLES
//

// Constants
// Choices
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
// Players + Outcomes
const HUMAN = 'HUMAN';
const COMPUTER = 'COMPUTER';
const DRAW = 'DRAW';
const GAME_END_SCORE = 5;
// Track Score
let humanScore = 0;
let computerScore = 0;

// Document Element Variables
const humanChoicesContainer = document.querySelector('#human-area');
const humanPlayerBtns = document.querySelectorAll('#human-area .btn');
const humanPlayerScore = document.querySelector('#human-score');
const computerPlayerScore = document.querySelector('#computer-score');
const roundOutcomeStatus = document.querySelector('.round-outcome .status');
const roundOutcomeMessage = document.querySelector('.round-outcome .message');
const gameOutcomeStatus = document.querySelector('.game-outcome .status');
const gameOutcomeMessage = document.querySelector('.game-outcome .message');
const gameResetBtn = document.querySelector('#game-reset-btn');

// Roll the dice...
function rollDice(diceLength) {
  const roll = Math.floor(Math.random() * diceLength);
  return roll;
}

function getRandomHand() {
  const choices = [ROCK, PAPER, SCISSORS];
  const randomIndex = rollDice(choices.length);
  return choices[randomIndex];
}

// 1. Computer Choice
function getComputerChoice() {
  const choice = getRandomHand();
  return choice;
}

// 2. Human Choice
// This is the main thing that drives the game.
// Each round will begin from this
humanChoicesContainer.addEventListener('click', (e) => {
  if (!e.target.closest('.btn')) return;
  const btn = e.target;
  const humanChoice = btn.id;
  playRound(humanChoice.toUpperCase());
  if (gameResetBtn.classList.contains('hidden')) {
    gameResetBtn.classList.remove('hidden');
  }
});

// 3. Logic for a single round
function calcRoundOutcome(humanChoice, computerChoice) {
  // Handle Draw
  if (humanChoice === computerChoice) {
    return DRAW;
  }
  // 'Human' win conditions
  if (
    (humanChoice === ROCK && computerChoice === SCISSORS) ||
    (humanChoice === PAPER && computerChoice === ROCK) ||
    (humanChoice === SCISSORS && computerChoice === PAPER)
  )
    return HUMAN;
  // Otherwise 'Computer' wins
  return COMPUTER;
}

function updateWinnerScore(winner) {
  if (winner === HUMAN) {
    humanScore++;
  } else if (winner === COMPUTER) {
    computerScore++;
  }
  return;
}

function capitalize(word) {
  if (word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function logRoundOutcome(humanChoice, computerChoice, winner) {
  let status;
  const message = `${capitalize(humanChoice)} X ${capitalize(computerChoice)}.`;
  if (winner === HUMAN) {
    status = 'You Win!';
  } else if (winner === COMPUTER) {
    status = 'You Lose!';
  } else {
    status = "It's a Draw!";
  }
  // console.log(status, message);
  humanPlayerScore.textContent = humanScore;
  computerPlayerScore.textContent = computerScore;
  roundOutcomeStatus.textContent = status;
  roundOutcomeMessage.textContent = message;
}

function checkGameEnd() {
  return humanScore >= GAME_END_SCORE || computerScore >= GAME_END_SCORE;
}

function updateGameState(humanChoice, computerChoice, winner) {
  updateWinnerScore(winner);
  logRoundOutcome(humanChoice, computerChoice, winner);
  const isGameEnd = checkGameEnd();
  if (isGameEnd) {
    setGameState('game-end');
  }
}

function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  const winner = calcRoundOutcome(humanChoice, computerChoice);
  updateGameState(humanChoice, computerChoice, winner);
}

// 4. Game End Logging
function logGameOutcome() {
  let status;
  let message;
  if (humanScore > computerScore) {
    status = 'You won the GAME';
    message = 'Hurray!!!';
  } else if (humanScore < computerScore) {
    status = 'You lost the GAME :(';
    message = 'Try Again?';
  } else {
    status = 'Game ends as a DRAW...';
    message = 'Aww... Almost had it.';
  }
  // console.log(status, message);
  // console.log(`Your score: ${humanScore}.`);
  // console.log(`Computer score: ${computerScore}`);
  gameOutcomeStatus.textContent = status;
  gameOutcomeMessage.textContent = message;
}

function setPlayerBtns(newState) {
  for (const playerBtn of humanPlayerBtns) {
    playerBtn.disabled = newState === 'disabled';
  }
}

gameResetBtn.addEventListener('click', (e) => {
  if (!e.target.closest('#game-reset-btn')) return;
  setGameState('game-begin');
});

function setGameState(gameState) {
  if (gameState === 'game-begin') {
    document.body.classList.remove('won-the-game');
    document.body.classList.remove('lost-the-game');
    setPlayerBtns('enabled');
    humanScore = 0;
    computerScore = 0;
    humanPlayerScore.textContent = 0;
    computerPlayerScore.textContent = 0;
    roundOutcomeStatus.textContent = 'Start!';
    roundOutcomeMessage.textContent = '(Go Pick)';
    gameOutcomeStatus.textContent = 'Can you win?';
    gameOutcomeMessage.textContent = 'x-x-x';
    gameResetBtn.classList.add('hidden');
    gameResetBtn.textContent = 'Reset Game';
  } else if (gameState === 'game-end') {
    setPlayerBtns('disabled');
    const winLoseClass =
      humanScore >= GAME_END_SCORE ? 'won-the-game' : 'lost-the-game';
    document.body.classList.add(winLoseClass);
    roundOutcomeStatus.textContent = '';
    roundOutcomeMessage.textContent = '';
    logGameOutcome();
    gameResetBtn.textContent = 'New Game';
    gameResetBtn.classList.remove('hidden');
  }
}

setGameState('game-begin');
