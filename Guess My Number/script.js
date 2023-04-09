'use strict';

let scoreNumber = Math.trunc(Math.random() * 20) + 1;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let score = 20;
let highscore = 0;
document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);
  console.log(guess, typeof guess);
  //when threr is no input
  if (!guess) {
    displayMessage(` ⛔ No number!`);
  }
  //when the answer is correct
  else if (scoreNumber === guess) {
    document.querySelector(`.number`).textContent = scoreNumber;
    displayMessage(`🎁 correct number! `);
    document.querySelector(`body`).style.backgroundColor = `#60b347`;
    document.querySelector(`.number`).style.width = `30rem`;
    if (score > highscore) {
      highscore = score;
      document.querySelector(`.highscore`).textContent = highscore;
    }
  }
  // when the answer is wrong
  else if (guess !== scoreNumber) {
    if (score > 1)
      displayMessage(guess > scoreNumber ? ` 📈 Too high ` : ` 📉 Too low `);
    score--;
    document.querySelector(`.score`).textContent = score;
  } else {
    displayMessage(` 💥 You lost the game `);
    document.querySelector(`.score`).textContent = 0;
  }
});

// again btn
document.querySelector(`.again`).addEventListener(`click`, function () {
  scoreNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector(`.score`).textContent = score;
  displayMessage(`Start guessing...`);
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.guess`).value = ``;
});
