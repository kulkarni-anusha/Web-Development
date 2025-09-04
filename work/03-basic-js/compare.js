"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {  // DO NOT MODIFY THIS LINE

  /* YOU MAY MODIFY THE LINES BELOW */

  const firstWord = word.toUpperCase();
  const secondWord = guess.toUpperCase();
  const letterCount = {};
  let matchCount = 0;

  for (const letter of firstWord) {
    if (letterCount[letter]) {
      letterCount[letter]++;
    } else {
      letterCount[letter] = 1;
    }
  }


  for (const letter of secondWord) {
    if (letterCount[letter] && letterCount[letter] > 0) {
      matchCount++;
      letterCount[letter]--;
    }
  }

  return matchCount;
}

