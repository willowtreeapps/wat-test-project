var peopleApi = (function() {

  var getData = function(cb) {
    return $.ajax({
        url: 'http://namegame.willowtreemobile.com:2000',
        success: function(people) {
            var fixedList = fixNameTypos(people)
            cb(fixedList)
        }
    });
  }

  var fixNameTypos = function(list) {
    var nameRegEx = /[^a-zA-Z\s-]|[-]$/;
    var fixedList = list.map(function(val, i) {
      val.name = val.name.replace(nameRegEx, '');
    })
    return fixedList;
  }

  return {
    getData: getData
  }

}())

var nameGame = (function($, window, document) {

  var init = function () {
    cacheDom();
    getNames();
  }

  var $ui, $answersContainer, $questionContainer, questionTemplate, questionTemplatePic, pictureTemplate, list, nameTemplate;
  var gameMode = {
    type: 'default',
    matt: false
  }

  var cacheDom = function () {
    $ui = $('body');
    $answersContainer = $ui.find('#answers-container');
    $questionContainer = $ui.find('#question-container');
    nameTemplate = Handlebars.compile($answersContainer.find('.name-template').html());
    questionTemplate = Handlebars.compile($questionContainer.find('.question-template').html());
    questionTemplatePic = Handlebars.compile($questionContainer.find('.question-template-pic').html());
    pictureTemplate = Handlebars.compile($answersContainer.find('.picture-template').html());
  }

  var getNames = function() {
    var apiCall = peopleApi.getData( function(people) {
      return people;
    })

    $.when(apiCall).done(function(response) {
      list = response;
      nextQuestion();
    })
  }

  var chooseWinner = function(chosenOnes) {
    var chosenIndex = Math.floor(Math.random()*5)
    var correctPerson = chosenOnes[chosenIndex]
    chosenOnes[chosenIndex].correct = true;
    return correctPerson;
  }

  var randomPeople = function(list) {
    var chosenArr = []
    for(var i = 0; i < 5; i++) {
      var randIndex = Math.floor(Math.random()*list.length) 
      // Check if person already exists in array
      if (chosenArr.includes(list[randIndex])) {
        i--
      } else {
        chosenArr.push(list[randIndex])
      }
    }
    return chosenArr;
  }

  var nextQuestion = function() {
    if(gameModeModule.matt) {
      var currentList = onlyMatts(list);
    } else {
      var currentList = list;
    }
    var chosenOnes = randomPeople(currentList)
    var correctPerson = chooseWinner(chosenOnes)
    renderQuestion(correctPerson)
    renderPictures(chosenOnes) 
  }

  var correctClickListener = function() {
    $('.correct').on('click', function(e) {
      setTimeout(function() {
        nextQuestion()        
      }, 1000);
    })
  }

  var overlayClickListener = function() {
    $('.overlay').on('click', function(e) {
      $(this).fadeTo("slow", 0.7).siblings('.name-text').fadeTo("slow", 1)
      statsModule.incrementStats($(this))
      $(this).off('click');
    })
  }

  var keyboardListeners = function() {
    var possibleAnswers = $answersContainer.find('.single-item-container')
    possibleAnswers.each(function(i, val) {
      var numericKey = (i + 1).toString();
      Mousetrap.bind(numericKey, function() {
        var targetOverlay = $(val).find('.overlay').click();
      })
    })
  }

  var onlyMatts = function(list) {
    var mattRegEx = /^(Matt)|^(Mat)/;
    var mattList = []
    list.map(function(val, i) {
      if(mattRegEx.test(val.name)) {
        mattList.push(val)
      }
    })
    return mattList;
  }

  var renderQuestion = function(person) {
    if (gameModeModule.type === 'default') {
      var createdQuestion = questionTemplate({name: person.name})      
    } else {
      var createdQuestion = questionTemplatePic({url: person.url})
    }
    $questionContainer.html(createdQuestion)
  }

  var renderPictures = function(chosenArr) {  
    var pictureHtml = ""
    if (gameModeModule.type === 'default') {
      $.each(chosenArr, function(i, val) {
        var answer;
        val.correct ? answer="correct" : answer="incorrect"
        pictureHtml += pictureTemplate({url: val.url, name: val.name, answer: answer})
        // reset value for future games
        val.correct = false;
      })
    } else {
      $.each(chosenArr, function(i, val) {
        var answer;
        val.correct ? answer="correct" : answer="incorrect"
        pictureHtml += nameTemplate({name: val.name, answer: answer})
        val.correct = false;
      })
    }
    $answersContainer.html(pictureHtml)
    overlayClickListener();
    correctClickListener();
    keyboardListeners();
  }

  $(function() {
    init()
  })

  return {
    nextQuestion: nextQuestion
  }

}(window.jQuery, window, document))

// GAME MODE MODULE

var gameModeModule = (function($, window, document) {
  

  var init = function() {
    cacheDom();
    gameModeListener();
    mattModeListener();
  }

  var gameMode = {
    type: 'default',
    matt: false
  }
  var $defaultLink, $reverseLink, $mattLink;

  var cacheDom = function() {
    $defaultLink = $('.default');
    $reverseLink = $('.reverse');
    $mattLink = $('.matt');
  }

  var gameModeListener = function() {
    $('.game-mode').click(function(e) {
      e.preventDefault()
      var targetMode = $(e.target).attr('name');
      gameMode.type = targetMode;
      $reverseLink.parent().removeClass('active')
      $defaultLink.parent().removeClass('active')
      $(e.target).parent().addClass('active');
      nameGame.nextQuestion();
    })
  }

  var mattModeListener = function() {
    $mattLink.on('click', function(e) {
      e.preventDefault();
      $mattLink.parent().toggleClass('active');
      if ($mattLink.parent().hasClass('active')) {
        gameMode.matt = true;
      } else {
        gameMode.matt = false;
      }
      nameGame.nextQuestion();
    })
  }

  $(function() {
    init();
  })

  return gameMode;

}(window.jQuery, window, document))

var statsModule = (function($, window, document) {
  
  var correct = 0;
  var incorrect = 0;

  var statsTemplate, statsContainer;

  var init = function() {
    cacheDom();
    renderStats();
  }

  var cacheDom = function() {
    $statsContainer = $('#stats-container')
    statsTemplate = Handlebars.compile($statsContainer.find('.stats-template').html())
  }

  var renderStats = function() {
    var statsHtml = statsTemplate({correctNum: correct, incorrectNum: incorrect, averageNum: average()})
    $statsContainer.html(statsHtml)
  }

  var average = function() {
    if (correct === 0 || incorrect === 0) {
      return '∞';
    }
    var roundedNum = Math.round(((correct+incorrect)/correct) * 100)/100;
    return roundedNum
  }

  var incrementStats = function($element) {
    $element.hasClass("incorrect") ? incorrect++ : correct++
    renderStats();
  }

  $(function() {
    init();
  })


  return {
    correct: correct,
    incorrect: incorrect,
    average: average,
    incrementStats: incrementStats
  }

}(window.jQuery, window, document))