// random number from 1 to 6 like a normal die (dice)
/* welcome to my script */
const h1header        = document.getElementById('header-h1');
const howtoplay       = document.getElementById('section-howtoplay');
const pfooter         = document.getElementById('footer-p');
const newGameButton   = document.getElementById('newgame');

let firstPlayerScore  = document.getElementById('firstscore');
let secondPlayerScore = document.getElementById('secondscore');
let firstTotalScore   = document.getElementById('firsttotalscore');
let secondTotalScore  = document.getElementById('secondtotalscore');
let wrapper           = document.getElementById('wrapper');
let rerolldice        = document.getElementById('reroll');
let output            = document.getElementById('output');

const welcomeWindow   = document.getElementById('welcome');
const startButton     = document.getElementById('button-play');
const nav             = document.getElementById('nav');
const rules           = document.getElementById('rules');
let summary           = document.getElementById('summary');

const lowestValueOne    = 1;
const lowestScore       = 0;
let startingRound       = 0;
let finalRound          = 3;
let playerOneScore      = 0;
let playerTwoScore      = 0;
let playerOneRoundScore = 0;
let playerTwoRoundScore = 0;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;



startButton.addEventListener("click", gameStart);

h1GamePlay();
styleHowToPlay();
styleFooter();
randomDiceFunction();
shakeAnimation();


/* starts the game */
function gameStart() {
  welcomeWindow.classList.add('fade-img');
  const removeElement = document.querySelector("#welcome");
  wrapper.removeChild(removeElement);
}


/* one big random dice roll function */
function randomDiceFunction() {
  shakeAnimation();

  /* constants for all 4 random dice rolls */
  const firstRandomNum  = Math.floor(Math.random() * 6) + 1;
  const secondRandomNum = Math.floor(Math.random() * 6) + 1;
  const thirdRandomNum  = Math.floor(Math.random() * 6) + 1;
  const fourthRandomNum = Math.floor(Math.random() * 6) + 1;


  /* constants for all 4 dice images concatenated to the random element */
  const diceImageOne   = 'images/dice' + firstRandomNum  + '.png';
  const diceImageTwo   = 'images/dice' + secondRandomNum + '.png';
  const diceImageThree = 'images/dice' + thirdRandomNum  + '.png';
  const diceImageFour  = 'images/dice' + fourthRandomNum + '.png';


  /* query selectors for each array element that checks the img src and the random number */
  document.querySelectorAll('img')[0].setAttribute('src', diceImageOne);
  document.querySelectorAll('img')[1].setAttribute('src', diceImageTwo);
  document.querySelectorAll('img')[2].setAttribute('src', diceImageThree);
  document.querySelectorAll('img')[3].setAttribute('src', diceImageFour);


  /* console log tests to make sure the random generators are working
  console.log(firstRandomNum);
  console.log(secondRandomNum);
  console.log(thirdRandomNum);
  console.log(fourthRandomNum);
  */


  /*       checks the if conditions        */
  /* checks lowestvalue is a constant of 1. if either player hits a 1, they score 0 for that round */
  if (firstRandomNum == lowestValueOne || secondRandomNum == lowestValueOne) {
    document.querySelector('#firstscore').innerHTML = `<p>You scored a ${lowestScore} for this round</p>`;
  } else if (firstRandomNum == secondRandomNum) {
    document.querySelector('#firstscore').innerHTML = `<p>You scored a ${(firstRandomNum + secondRandomNum) * 2}!</p>`
    playerOneScore += (firstRandomNum + secondRandomNum) * 2;
  } else {
    playerOneScore += (firstRandomNum + secondRandomNum);
    document.querySelector('#firstscore').innerHTML = `<p>You scored a ${playerOneScore} for this round</p>`;
  }

  /* checks the computer opponent now */
  if (thirdRandomNum == lowestValueOne || fourthRandomNum == lowestValueOne) {
    document.querySelector('#secondscore').innerHTML = `<p>You scored a ${lowestScore} for this round</p>`;
  } else if (thirdRandomNum == fourthRandomNum) {
    document.querySelector('#secondscore').innerHTML = `<p>You scored a ${(thirdRandomNum + fourthRandomNum) * 2}!</p>`
    playerTwoScore += (thirdRandomNum + fourthRandomNum) * 2;
  } else {
    playerTwoScore += thirdRandomNum + fourthRandomNum;
    document.querySelector('#secondscore').innerHTML = `<p>You scored a ${playerTwoScore} for this round</p>`;
  }
  

  /* outputs the final score to the DOM */
  firstTotalScore.innerHTML = `<span>Total Score: </span>` + playerOneScore;
  secondTotalScore.innerHTML = `<span>Total Score: </span>` + playerTwoScore;

  
  /* checks the rounds are less than 3 */
  if(startingRound < finalRound) {
      startingRound++;
  } else {
      newGameButton.innerHTML       = "Play Again?";
      newGameButton.style.fontSize  = '1.2em';
      newGameButton.addEventListener("click", playAgain);
      //winner(playerOneScore.value, playerTwoScore.value);
      summary.innerHTML             += winner(playerOneScore, playerTwoScore);
      rerolldice.style.display      = 'none';
      rerolldice.removeChild();
      newGameButton.style.display   = 'block';
      newGameButton.style.textAlign = 'center';
  }
  calculateWinner(firstRandomNum, secondRandomNum, thirdRandomNum, fourthRandomNum);
}


/* function to play again, resets the player scores */
function playAgain() {
    playerOneScore.setScore(0);
    playerTwoScore.setScore(0);
    output        = "";
    startingRound = 1;
    
    newGameButton.removeEventListener("click", playAgain);
    newGameButton.innerHTML = "Click to Roll";
    newGameButton.addEventListener("click", randomDiceFunction);
}


/* first attempt to calculate a winner */
function calculateWinner(first, second, third, fourth) {
  let firstPlayerPoints  = first + second;
  let secondPlayerPoints = third + fourth;
  document.getElementById('firsttotalscore').value  += firstPlayerPoints;
  document.getElementById('secondtotalscore').value += secondPlayerPoints;
}


/* function to add the dice */
function roundScore(dice) {
  const ONE  = 1;
  const ZERO = 0;
  const equalRoll  = 2;
  const firstRoll  = dice[0];
  const secondRoll = dice[1];

  if (dice.includes(ONE)) {
    return ZERO;
  } else if (firstRoll == secondRoll) {
    let score = equalRoll * (firstRoll + secondRoll)
    return score;
  } else {
    return firstRoll + secondRoll;
  }
}


/* checks for a winner, output appropriate message to the DOM */
function winner(player, opponent) {
  if (player < opponent) {
    return `<p>You lose!<br> You scored ${player} points and the opponent scored ${opponent} points</p><br><br>`;
  }
  if (opponent < player) {
    return `<br><p>You win!<br> You scored ${player} points and the opponent scored ${opponent} points</p><br><br>`;
  }
  if (player == opponent) {
    return `<p>Tie game!<br> You scored ${player} points and the opponent scored ${opponent} points</p><br><br>`;
  }
}


/* function to reload the page with the new game button */
function reload() {
  window.location.reload();
}


/* funky shake animation */
function shakeAnimation() {
  let dice = document.querySelectorAll("img");
  dice.forEach(function (die) {
    die.classList.add("shake");
  });
  setTimeout(function () {
    dice.forEach(function (die) {
      die.classList.remove("shake");
    });
  },
    500);
}


function h1GamePlay() {
  h1header.innerHTML += `<h1>Dice Game</h1>`;
  nav.innerHTML      += `<p>Welcome to Dice - COMP 2132</p>`;
  h1header.style.textAlign = 'center';
  nav.style.textAlign  = 'center';
  nav.style.padding    = '2em';
  nav.style.fontSize   = '1.3em';

}


/* all the game rules and some styling */
function styleHowToPlay() {
  howtoplay.innerHTML += `<h2>How to play:</h2>`;
  howtoplay.innerHTML += `<li>Click the 'Roll Dice' button to begin.</li>`;
  howtoplay.innerHTML += `<li>To play the next round, click 'Roll Dice' again.</li>`;
  howtoplay.innerHTML += `<li>Your score will be added at the end.</li>`;
  howtoplay.innerHTML += `<li>Click the 'New Game' button to play again, or refresh the page.</li><hr>`;
  howtoplay.innerHTML += `<h2>Rules</h2>`;
  howtoplay.innerHTML += `<li>Each round, you and a computer both roll a pair of dice.</li>`;
  howtoplay.innerHTML += `<li>Your score for the round is based on the sum of dice.</li>`;
  howtoplay.innerHTML += `<li>If you roll doubles (e.g. a 3 and a 3) your score is multiplied by 2.</li>`;
  howtoplay.innerHTML += `<li>Rolling a 1 will give a score of 0 for that round.</li>`;
  howtoplay.innerHTML += `<li>The player with the most points by the end of the game wins.</li><hr>`;
}

/* styles the footer element */
function styleFooter() {
  pfooter.innerHTML      += `<p>COMP 2132</p>`;
  pfooter.style.fontSize = '1em';
  pfooter.style.color    = 'white';
  pfooter.style.padding  = '2em';
  pfooter.style.maxWidth = '74%';
  pfooter.style.margin   = '0 auto';
}

