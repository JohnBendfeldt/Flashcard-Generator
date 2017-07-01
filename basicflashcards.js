var inquirer = require('inquirer');
// Pulls the Cloze constructor from the js file
var clozecard = require('./ClozeCard.js');
//Pulls the questions needed from the questions array
var questions = require('./questions.js').questions;

// Establishes initial variables to set the game stage
var Questions = [], currentQuestion = 0, correct =0, wrong = 0;

//Grabs the full and cloze statements and pushes them into an actiave array
for (var i = 0; i < questions.length; i++) {
	var flashcard = new clozecard.ClozeCard(questions[i].full, questions[i].cloze);
	Questions.push(flashcard);
}

// The function that askes the questions using Inquirer
function startGame() {
	inquirer.prompt([
		{
			type: 'input',
			// Shows only the partial statement from the constructor
			message: Questions[currentQuestion].partial + '\nAnswer: ',
			name: 'guess'
		}
	]).then(function (answers) {
		console.log('\n');
		// Tests if asnwer is correct
		if (answers.guess.toLowerCase() === Questions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct, Comrade! \nТы могучий воин (You are a Mighty Warrior)\n');
			// Keeps track of the score
			correct++;
		} else {
			console.log('Wrong, Comrade! \nВы должны научиться ходить, прежде чем вы сможете убежать. (You must learn to walk before you can escape.)\n');
			// Keeps track of the score
			wrong++;
		}
		// Shows the correct answer
		console.log(Questions[currentQuestion].full);
		// Keeps going until there are no more questions, ending the game
		if (currentQuestion < Questions.length - 1) {
			currentQuestion++;
			startGame();
		} else {
			console.log('Game Over!');
			console.log('Correct Answers: ' + correct);
			console.log('Incorrect Answers: ' + wrong);
			console.log('\nВы должны научиться ходить, прежде чем вы сможете убежать. (You must learn to walk before you can escape.)\n');

			// Play again prompt
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to play again, Comrade?',
					name: 'Again'
				}
			]).then(function (answers) {
				if (answers.Again) {
					// Resetting the gamestate
					currentQuestion = 0;
					correct = 0;
					wrong = 0;
					// If the answer is yes the game starts again
					startGame();
				} else {
					console.log('Thanks for playing, Comrade!');
				}
			})
		}
	})
}
console.log('Welcome to Putin Trivia, Comrade! \n');
// Initializes the game
startGame();