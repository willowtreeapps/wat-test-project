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
  }

  var $ui, $pictureContainer, $questionContainer, questionTemplate, pictureTemplate, list;

  var cacheDom = function () {
    $ui = $('body');
    $picturesContainer = $ui.find('#pictures-container');
    $questionContainer = $ui.find('#question-container');
    questionTemplate = Handlebars.compile($questionContainer.find('.question-template').html());
    pictureTemplate = Handlebars.compile($picturesContainer.find('.picture-template').html());
  }

  var getNames = function() {
    var apiCall = peopleApi.getData( function(people) {
      return people;
    })

    $.when(apiCall).done(function(response) {
      list = response;
      console.log(list)
    })
  }

  $(function() {
    init()
    getNames()
  })

}(window.jQuery, window, document))