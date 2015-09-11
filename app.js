var guesses_remaining = 6;
var answer = Math.round(100*Math.random());

function evaluateGuess(guess, answer) {
	//temp changes background, message is displayed
	var response = {temp:'invalid', message:'invalid'};
	var diff = Math.abs(guess - answer);
	if (!(guess < 1 || guess > 100)) {
		if (guess > answer) {
			response.message = 'Guess Lower';
		} else if (guess < answer) {
			response.message = 'Guess Higher';
		}
		if (diff === 0) {
			response.temp = 'win';
			response.message = 'You Win!';
			$('h5').text('');
		} else if (diff <= 5) {
			response.temp = 'veryhot';
		} else if (diff <= 15) {
			response.temp = 'hot';
		} else if (diff <= 30) {
			response.temp = 'cold';
		} else {
			response.temp = 'verycold';
		}
	}
	return response;
}

function updateGuessesRemaining() {
	guesses_remaining--;
	var output_str;
	if (guesses_remaining <= 0) {
		output_str = "Game Over - YOU LOSE";
	} else {
		output_str = guesses_remaining + " Guesses Remaining";
	}
	$("h5").text(output_str);
}

function updateBackground(keyword) {
	$("body").css('background-image', 'url(\'img/' + keyword + '.jpg\')');
}

$("#submit").click(function() {
	if (guesses_remaining > 0) {
		updateGuessesRemaining();
		var guess = $("input").val();
		$("h4").text(evaluateGuess(guess, answer).message);
		updateBackground(evaluateGuess(guess,answer).temp);
	}
});

$("#hint").click(function() {
	$("h4").text("The number you were looking for was " + answer);
	guesses_remaining = 0;
	updateGuessesRemaining();
});

$("#new_game").click(function() {
	answer = Math.round(100*Math.random());
	$("h4").text("");
	guesses_remaining = 6;
	updateGuessesRemaining();
	//updateBackground('question');
	$("body").css('background-image', 'url(\'img/question.jpg\')');
});







