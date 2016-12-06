// : Use JSON to parse data from API file on page load
// : In normal scenarios click events will be bound here
// 		but in our case this cannot happen. Since the image controls
// 		are being dynamically created on the fly, we need to bind a 
// 		click event at the time of creating the control.
var employeeArr = [];
var challengeMode = false;
$(document).ready(function() {
	$.get('API/gameAPI.txt', function(data) {
		employeeArr = JSON.parse(data);
		loadNewEmployees(employeeArr);
	});
	
	$('#backBtn').click(function() { 
		sessionStorage.removeItem('game_mode');
		window.location.href = 'index.html';
	});
	
	// If we are in challenge mode, set controls and logic
	if(sessionStorage.getItem('game_mode') === 'challenge') {
		// Call JQuery plugin TimeCircles on Timer div.
		// Only show necessary controls within plugin
		challengeMode = true;
		$("#timer").TimeCircles({ time: {
			Days: { show: false }
		}});
	}
	else {
		$('.stopwatch').hide();
		sessionStorage.removeItem('game_mode');
	}
});

// Add new employee to an array of 5 random employees based on selected index
function appendNewEmployee(employeeArr, empSelectedArr, selIndex) {
	var employee = employeeArr[selIndex];
	var employeeImg = $('#employeeContainer');
	
	employeeImg.append('<a target="_blank" class="image-container"><img src="'
						+employee.url
						+'" alt="'
						+employee.name
						+'" class="image"></img></a>');
	empSelectedArr.push(employee);
}

// Choose employee to show to user
function employeeSelector(employeeSelectedArr) {
	var randomIndex = Math.floor(Math.random() * employeeSelectedArr.length);
	var employee = employeeSelectedArr[randomIndex];
	
	$('#guessWho').text('Who is ' + employee.name + '?');
}

// Main function to handle loading of UI controls and 
// click events of employee images & names
function loadNewEmployees(employeeArr) {
	
	// Clear any existing employee UI controls
	$('#employeeContainer').empty();
	
	// Load new employee UI controls
	if (employeeArr.length > 0) {
		var employeeSelectedArr = [];
		var indexToSelect = 0;
		for(var i=0; i < 5; i++) {
		
			// Make sure we find new employees and don't have duplicates in the same batch
			indexToSelect = Math.floor(Math.random() * employeeArr.length);
			while(employeeSelectedArr.includes(employeeArr[indexToSelect]) === true) {
				indexToSelect = Math.floor(Math.random() * employeeArr.length);
			}
			
			appendNewEmployee(employeeArr, employeeSelectedArr, indexToSelect);
		}
		
		// Choose an employee's name to present to the user
		// Add click event to the images
		employeeSelector(employeeSelectedArr);
		$('.image').click(handleImageClickEvent);
	}
	else {
		alert('We\'re sorry, there seemed to be a technical issue on our side, please refresh the page and try again!');
	}
}

// Add new item to the leaderboard
function appendNewLeaderboardItem(gameMode, userName, userTime) {
	if(gameMode === 'challenge') {
		var leaderboardArr = JSON.parse(sessionStorage.getItem('challengeMode_Leaderboard'));
		
		console.log(leaderboardArr);
		if(leaderboardArr !== null) {
			leaderboardArr.push({
				'username' : userName,
				'usertime' : userTime
			});
			sessionStorage.setItem('challengeMode_Leaderboard', JSON.stringify(leaderboardArr));
		}
		else {
			leaderboardArr = [];
			leaderboardArr.push({
				'username' : userName,
				'usertime' : userTime
			});
			sessionStorage.setItem('challengeMode_Leaderboard', JSON.stringify(leaderboardArr));
		}
	}
}

// Click event for employee images
function handleImageClickEvent() {
	var employee = {
		'URL'  : $(this).first().attr('src'),
		'name' : $(this).first().attr('alt')
	};
	var guessWho = $('#guessWho');
	var counter = $('#counter');
	
	// If user chooses correctly, iterate counter by 1 and reset employees	
	if(guessWho.text().indexOf(employee.name) >= 0) {
		var count = parseInt(counter.text(), 10) + 1;
		counter.text(count);
		
		// When in challenge mode we don't want to reset employees if
		// they're at 10
		if(challengeMode === true && count === 10) {
			$("#timer.stopwatch").TimeCircles().stop();
			
			var minutes = $('.textDiv_Minutes span').text();
			var seconds = $('.textDiv_Seconds span').text();
			var hours = $('.textDiv_Hours span').text();
			var userTime = hours +':'+ minutes +':'+ seconds;
			var userName = prompt('Great Job, you\'ve reached 10 correct picks!'
									+ '\nYour time was: '
									+ userTime
									+'\nPlease enter your name:');
			
			// If a name or empty string was provided, add new time to leaderboard
			// otherwise, reroute to main menu
			if(userName != null) {
				appendNewLeaderboardItem('challenge', userName, userTime);
				sessionStorage.removeItem('game_mode');
				window.location.href = 'index.html';
			}
			else {
				alert('Thanks for playing! Your score will not be logged');
				sessionStorage.removeItem('game_mode');
				window.location.href = 'index.html';
			}
		}
		else {
			loadNewEmployees(employeeArr);
		}
	}
	else {
		$(this).first().css('border','2px solid red');
	}
}