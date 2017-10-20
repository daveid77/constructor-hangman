var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');

// VARIABLES
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// MAIN GAME OBJECT
var game = {
  initialize: function() {
    var wordChoice = word[Math.floor(Math.random() * word.length)];
    // console.log(wordChoice);
  }
}


var wordTokens = word[0].split("");
  // console.log(wordTokens);

var letters = []

for (var i=0; i< wordTokens.length; i++) {
    letters.push(new letter(wordTokens[i]))
}

function buildDisplayString(letterArray) {

  var displayString = '';
  for (var i=0; i<letterArray.length; i++) {
      if (letterArray[i].isVisible) {
          displayString += letterArray[i].value;
      } else {
          displayString += '_';
      }
  }
  return displayString;

}

var displayString = buildDisplayString(letters);

updateDisplayString();

function revealLetter(letter) {
  for (var i=0; i < letters.length; i++) {
      if (letter.toLowerCase() === letters[i].value.toLowerCase()) {
          letters[i].isVisible = true;
      }
  }
}

function updateDisplayString() {
  displayString = buildDisplayString(letters);
}

updateDisplayString();

function checkForWin() {

  for (var i=0; i < letters.length; i++) {
      if (!letters[i].isVisible) {
          return false;
      }
  }
  return true;

}

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
    console.log('\x1b[32m%s\x1b[0m', 'CORRECT!!');
    console.log('\x1b[31m%s\x1b[0m', 'Wrong. Try again.');
    //console.log(JSON.stringify(answer, null, '  '));
  });

}
userInput();
