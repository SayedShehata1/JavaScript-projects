'use strict';

//Selecting elements
const player0E = document.querySelector(`.player--0`);
const player1E = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);

const current0 = document.querySelector(`#current--0`);
const current1 = document.querySelector(`#current--1`);

const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
//Starting conditions
let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0E.classList.remove(`player--winner`);
  player1E.classList.remove(`player--winner`);
  player0E.classList.add(`player--active`);
  player1E.classList.remove(`player--active`);
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E.classList.toggle(`player--active`);
  player1E.classList.toggle(`player--active`);
};

//Rolling dice function
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1 generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2 Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove(`hidden`);
    //3 check for rooled

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    //add current to total score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //if >=100 winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      playing = false;
      diceEl.classList.add(`hidden`);
    } else {
      //switch to next played
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
