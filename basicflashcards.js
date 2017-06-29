var inquirer = require('inquirer');

var basiccard = require('./BasicCard.js');

var clozecard = require('./ClozeCard.js');

var questions = require('./questions.js').questions;


var closeQuestions = [];

for (var i = 0; i < questions.length; i++) {
	var flashcard = new clozecard.ClozeCard(questions[i].full, questions[i].cloze);
	closeQuestions.push(flashcard);
}

var currentQuestion = 0;
var correct = 0;
var wrong = 0;

function askQuestion() {
	inquirer.prompt([
		{
			type: 'input',
			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');
		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct, Comrade! \nТы могучий воин\n');
			correct++;
		} else {
			console.log('Wrong, Comrade! \nВы должны научиться ходить, прежде чем вы сможете убежать.\n');
			wrong++;
		}
		console.log(closeQuestions[currentQuestion].full);

		if (currentQuestion < closeQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + correct);
			console.log('Incorrect Answers: ' + wrong);
			console.log('\nВы должны научиться ходить, прежде чем вы сможете убежать.\n');

			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again?',
					name: 'Again'
				}
			]).then(function (answers) {
				if (answers.Again) {
					currentQuestion = 0;
					correct = 0;
					wrong = 0;

					askQuestion();
				} else {
					console.log('Thanks for playing, Comrade!');
				}
			})
		}
	})
}
console.log('Welcome to Putin Trivia, Comrade! \n')
askQuestion();