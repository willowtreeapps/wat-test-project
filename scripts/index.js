$(document).ready(function() {
	// Click events for handling menu options
	$('#gameOptOriginalBtn').click(function() {window.location.href = 'game.html';});
	$('#gameOptChallengeBtn').click(function() {
		sessionStorage.setItem( 'game_mode', 'challenge' );
		var readyFlag = confirm('Are you ready?'
					+' The rules are simple - get 10 correct matches to win!'
					+' The player with the fastest time gets a make-believe cookie!');
					
		if(readyFlag === true) {
			window.location.href = 'game.html';
		}
		else {
			//do nothing, stay on page
		}
	});
	$('#leaderboardBtn').click(function(){window.location.href = 'leaderboard.html';});
	
});
