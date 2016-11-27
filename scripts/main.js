var peopleApi = (function() {

  var getData = function(cb) {
    return $.ajax({
        url: 'http://namegame.willowtreemobile.com:2000',
        success: function(people) {
            cb(people)
        }
    });
  }

  return {
    getData: getData
  }

}())

var guessingGame = (function($, window, document) {

  var init = function () {
    cacheDom();
    getNames();
    gameModeListener();
  }

  var $ui, $pictureContainer, $questionContainer, $defaultLink, $reverseLink, questionTemplate, questionTemplatePic, pictureTemplate, list, nameTemplate;
  var gameMode = 'default';

  var cacheDom = function () {
    $ui = $('body');
    $picturesContainer = $ui.find('#pictures-container');
    $questionContainer = $ui.find('#question-container');
    $defaultLink = $ui.find('.default');
    $reverseLink = $ui.find('.reverse');
    nameTemplate = Handlebars.compile($picturesContainer.find('.name-template').html());
    questionTemplate = Handlebars.compile($questionContainer.find('.question-template').html());
    questionTemplatePic = Handlebars.compile($questionContainer.find('.question-template-pic').html());
    pictureTemplate = Handlebars.compile($picturesContainer.find('.picture-template').html());
  }

  var getNames = function() {
    var apiCall = peopleApi.getData( function(people) {
      return people;
    })

    $.when(apiCall).done(function(response) {
      list = response;
      fixNameTypos(list);
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
    var chosenOnes = randomPeople(list)
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

  var gameModeListener = function() {
    $('.nav').click(function(e) {
      e.preventDefault()
      var targetMode = $(e.target).attr('class');
      gameMode = targetMode;
      $reverseLink.parent().removeClass('active')
      $defaultLink.parent().removeClass('active')
      $(e.target).parent().addClass('active');
      nextQuestion();
    })
  }

  var keyboardListeners = function() {
    var possibleAnswers = $picturesContainer.find('.single-pic-container')
    possibleAnswers.each(function(i, val) {
      var numericKey = (i + 1).toString();
      Mousetrap.bind(numericKey, function() {
        var targetOverlay = $(val).find('.overlay').click();
      })
    })
  }

  var fixNameTypos = function(list) {
    var nameRegEx = /[^a-zA-Z\s-]|[-]$/;
    list = list.map(function(val, i) {
      val.name = val.name.replace(nameRegEx, '')
    })
  }

  var renderQuestion = function(person) {
    if (gameMode === 'default') {
      var createdQuestion = questionTemplate({name: person.name})      
    } else {
      var createdQuestion = questionTemplatePic({url: person.url})
    }
    $questionContainer.html(createdQuestion)
  }

  var renderPictures = function(chosenArr) {  
    var pictureHtml = ""
    if (gameMode === 'default') {
      $.each(chosenArr, function(i, val) {
        var answer;
        val.correct ? answer="correct" : answer="incorrect"
        pictureHtml += pictureTemplate({url: val.url, name: val.name, answer: answer})
      })
    } else {
      $.each(chosenArr, function(i, val) {
        var answer;
        val.correct ? answer="correct" : answer="incorrect"
        pictureHtml += nameTemplate({name: val.name, answer: answer})
      })
    }
    $picturesContainer.html(pictureHtml)
    overlayClickListener();
    correctClickListener();
    keyboardListeners();
  }

  $(function() {
    init()
  })

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