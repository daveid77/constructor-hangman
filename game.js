var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');

// VARIABLES
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var wordArr = [];
var lettersArr = [];

// MAIN GAME OBJECT
var game = {
  initialize: function() {
    var newWord = word[Math.floor(Math.random() * word.length)];
      console.log('newWord: ' + newWord);
    lowerWord = newWord.toLowerCase();
      // console.log('lowerWord: ' + lowerWord);
    wordArr = lowerWord.split('');
      // console.log(wordArr);
    for (var i = 0; i < wordArr.length; i++) {
      lettersArr.push(new letter(wordArr[i]))
    }
    this.buildDisplayString(lettersArr);
  },
  buildDisplayString: function(lettersArr) {
    var displayString = '';
    for (var i = 0; i<lettersArr.length; i++) {
        if (lettersArr[i].isVisible) {
            displayString += lettersArr[i].value;
        } else {
            displayString += '_';
        }
    }
    console.log(displayString.split('').join(' ') + '\n');
    userInput();
    return displayString;
  },
  updateDisplayString: function() {
    displayString = game.buildDisplayString(lettersArr);
    // console.log(displayString);
  },
  compareLetters: function(letter) {
    var match = wordArr.indexOf(letter);
    if (match !== -1) {
      console.log('\x1b[32m%s\x1b[0m', '\nCORRECT!!\n');
    } else {
      console.log('\x1b[31m%s\x1b[0m', '\nWrong. Try again.\n');
      console.log('9 guesses remaining.');
    }
    game.revealLetter(letter);
  }, 
  revealLetter: function(letter) {
    for (var i = 0; i < lettersArr.length; i++) {
        if (letter.toLowerCase() === lettersArr[i].value.toLowerCase()) {
            lettersArr[i].isVisible = true
        }
    }
    game.updateDisplayString();
  },
  checkForWin: function() {
    for (var i = 0; i < lettersArr.length; i++) {
        if (!lettersArr[i].isVisible) {
            return false;
        }
    }
    return true;
  }
}
game.initialize();


// game.updateDisplayString();

// console.log(displayString);

// game.revealLetter('a');
// game.revealLetter('w');

// game.updateDisplayString();

// console.log(displayString);

// console.log(game.checkForWin());

// INQUIRER USER INPUT 
function userInput() {

  var question = [
    {
      name: 'letter',
      message: 'Guess a letter:',
      type: 'input',
      filter: function(answer) {
        return answer.toLowerCase();
      },
      validate: function(answer) {
        var alphaIncl = alphabet.includes(answer);
        if ((answer.length !== 1) || (!alphaIncl)) {
          return 'Please, enter one letter.';
        }
        return true;
      }
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    game.compareLetters(answer.letter);
  });

}
