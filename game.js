var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');




word.printInfo();



// var questions = [
//   {
//   name: 'letter',
//   message: 'Guess a letter:',
//   type: 'input',
//   filter: function(answers) {
//     return answers.toLowerCase();
//   },
//   validate: function(answers) {
//     return answers !== 'yoda'; //Yoda had *better not* use this application!!
//   }
// }
// ];

// inquirer.prompt(questions).then(function(answers) {
//   console.log('\x1b[32m%s\x1b[0m', 'CORRECT!!');
//   console.log('\x1b[31m%s\x1b[0m', 'Wrong. Try again.');
//   //console.log(JSON.stringify(answers, null, '  '));
// });
