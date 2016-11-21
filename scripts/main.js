function renderNewNames(){
$.ajax({
    url: 'http://namegame.willowtreemobile.com:2000',
    success: function(people) {
      people.sort(function(){
        return 0.5 - Math.random()
      })

      var correctAnswer = [people[0], people[1], people[2], people[3], people[4]]

      correctAnswer.sort(function(){
        return 0.5 - Math.random()
      })
      var employees = document.getElementsByClassName('employee')
        for (var employee = 0; employee < employees.length; employee++){
          var overlay = employees[employee].children[0]
          var name = employees[employee].children[0].children[0]
          $(`#${overlay.id}`).addClass('hidden-overlay').removeClass('incorrect-guess')
          $(`#${overlay.id}`).addClass('hidden-overlay').removeClass('correct-guess')
          $(`#${name.id}`).addClass('hidden-name-text').removeClass('guessed-name-text')
        }

      $("#question").empty().append(`${correctAnswer[0].name}`)

      document.getElementById('employee-1-pic').src = people[0].url
      document.getElementById('employee-2-pic').src = people[1].url
      document.getElementById('employee-3-pic').src = people[2].url
      document.getElementById('employee-4-pic').src = people[3].url
      document.getElementById('employee-5-pic').src = people[4].url

      $("#employee-1-name").empty().append(`${people[0].name}`)
      $("#employee-2-name").empty().append(`${people[1].name}`)
      $("#employee-3-name").empty().append(`${people[2].name}`)
      $("#employee-4-name").empty().append(`${people[3].name}`)
      $("#employee-5-name").empty().append(`${people[4].name}`)
    }
  });
};
