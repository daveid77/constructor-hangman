var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

console.log(alphabet.join('')); 

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
      if (answer.length !== 1) {
        return 'Please, enter a single letter.';
      } else if (!alphaIncl) {
        return 'Please, enter a letter.';
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
