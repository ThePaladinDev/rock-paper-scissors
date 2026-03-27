// 'helper' to wait for the 'load' event
const pageIsLoaded = new Promise((resolve) => {
  if (document.readyState == 'complete') resolve();
  else window.addEventListener('load', resolve);
});

// 'Pause' the script execution right here,
// until the page is painted.
await pageIsLoaded;

/* * * * * * * * * *
 *
 * CODE STARTS HERE
 *
 *
 */

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
// Track Score
let humanScore = 0;
let computerScore = 0;

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
function getHumanChoice() {
  let choice = prompt(
    '\nPick your hand: Rock, Paper, or Scissors.\n\n(Note: You get a random hand if your input is invalid.)\n\nYour Choice?\n',
  );

  if (choice) {
    choice = choice.toUpperCase();
  }
  if (choice !== ROCK && choice !== PAPER && choice !== SCISSORS) {
    choice = getRandomHand();
  }

  return choice;
}

// *. Get Choice --> Abstract
function getChoice(player) {
  return player === COMPUTER ? getComputerChoice() : getHumanChoice();
}

// 3. Logic for a single round
// playRound(humanChoice, computerChoice)
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

function logRoundOutcome(humanChoice, computerChoice, winner) {
  let msg;
  if (winner === HUMAN) {
    msg = `You win!\n${humanChoice} beats ${computerChoice}.`;
  } else if (winner === COMPUTER) {
    msg = `You lose!\n${humanChoice} loses to ${computerChoice}.`;
  } else {
    msg = 'Draw!';
  }
  console.log(msg);
}

function updateGameState(humanChoice, computerChoice, winner) {
  updateWinnerScore(winner);
  logRoundOutcome(humanChoice, computerChoice, winner);
}

function playRound() {
  const humanChoice = getChoice(HUMAN);
  const computerChoice = getChoice(COMPUTER);
  const winner = calcRoundOutcome(humanChoice, computerChoice);
  updateGameState(humanChoice, computerChoice, winner);
}

// 4. Game Loop
// Let our game have 5 rounds by default.
// We play 1 game (of 5 rounds), and print the outcome.
function logGameOutcome() {
  let msg;
  if (humanScore > computerScore) {
    msg = 'You won the GAME!!!';
  } else if (humanScore < computerScore) {
    msg = 'You lost the GAME :(';
  } else {
    msg = 'Game ends as a DRAW...';
  }
  console.log(
    `${msg}\nYour score: ${humanScore}.\nComputer score: ${computerScore}`,
  );
}

function playGame(totalRounds = 5) {
  for (let i = 0; i < totalRounds; i++) {
    playRound();
  }
  logGameOutcome();
}

playGame();
