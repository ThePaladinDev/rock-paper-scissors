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

// Get rock, paper, or scissor
function rollDice() {
  let roll = 0;
  // Get a dice roll in range [0.1, 1)
  while (roll < 0.1) {
    // Math.random --> [Inclusive, Exclusive) --> [0, 1)
    roll = Math.random();
  }
  return roll;
}

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

function getRandomHand() {
  const roll = rollDice();
  return roll < 0.34 ? ROCK : roll < 0.67 ? PAPER : SCISSORS;
}

// 1. Computer Choice
function getComputerChoice() {
  const choice = getRandomHand();
  return choice;
}

// 2. Human Choice
// getHumanChoice --> Use parseInt(prompt)
function getHumanChoice() {
  let choice = prompt(
    '\nEnter your choice: Rock, Paper, or Scissors.\n\n(Note: You get a random hand if your input is invalid.)\n',
  );

  choice = choice.toUpperCase();
  if (choice !== ROCK && choice !== PAPER && choice !== SCISSORS) {
    choice = getRandomHand();
  }

  return choice;
}

// 3. Track Score
// humanScore & computerScore

// 4. Logic for a single round
// playRound(humanChoice, computerChoice)

// 5. Play 5 rounds in total
// playGame --> 5 * playRound
