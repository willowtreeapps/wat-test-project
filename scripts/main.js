function renderNewNames(){
$.ajax({
    url: 'http://namegame.willowtreemobile.com:2000',
    success: function(people) {
      people.sort(function(){
        return 0.5 - Math.random()
      })

      var choices = [people[0], people[1], people[2], people[3], people[4]]

      for (var person = 0; person < choices.length; person ++){
        if (choices[person].name.match(/[^A-z]$/)){
          choices[person].name = choices[person].name.slice(0,-1)
          //debugger
        }
      }

      var employees = document.getElementsByClassName('employee')
        for (var employee = 0; employee < employees.length; employee++){
          var overlay = employees[employee].children[0]
          var name = employees[employee].children[0].children[0]
          $(`#${overlay.id}`).addClass('hidden-overlay').removeClass('incorrect-guess')
          $(`#${overlay.id}`).addClass('hidden-overlay').removeClass('correct-guess')
          $(`#${name.id}`).addClass('hidden-name-text').removeClass('guessed-name-text')
        }

      $("#question").empty().append(`${choices[0].name}`)

      choices.sort(function(){
        return 0.5 - Math.random()
      })

      document.getElementById('employee-1-pic').src = choices[0].url
      document.getElementById('employee-2-pic').src = choices[1].url
      document.getElementById('employee-3-pic').src = choices[2].url
      document.getElementById('employee-4-pic').src = choices[3].url
      document.getElementById('employee-5-pic').src = choices[4].url

      $("#employee-1-name").empty().append(`${choices[0].name}`)
      $("#employee-2-name").empty().append(`${choices[1].name}`)
      $("#employee-3-name").empty().append(`${choices[2].name}`)
      $("#employee-4-name").empty().append(`${choices[3].name}`)
      $("#employee-5-name").empty().append(`${choices[4].name}`)
    }
  });
};

function renderReverse(){
  $.ajax({
    url: 'http://namegame.willowtreemobile.com:2000',
    success: function(people) {
        people.sort(function(){
          return 0.5 - Math.random()
        })
        var choices = [people[0], people[1], people[2], people[3], people[4]]

        for (var person = 0; person < choices.length; person ++){
          if (choices[person].name.match(/[^A-z]$/)){
            choices[person].name = choices[person].name.slice(0,-1)
          }
        }

         var employees = document.getElementsByClassName('employee')
            for (var employee = 0; employee < employees.length; employee++){
                var person = employees[employee]
                $(`#${person.id}`).removeClass('hidden').removeClass('correct-button')
              }

        document.getElementById('employee-pic').src = choices[0].url

        $('#answer').empty().append(`${choices[0].name}`)

        choices.sort(function(){
          return 0.5 - Math.random()
        })

        $("#employee-1").empty().append(`${choices[0].name}`)
        $("#employee-2").empty().append(`${choices[1].name}`)
        $("#employee-3").empty().append(`${choices[2].name}`)
        $("#employee-4").empty().append(`${choices[3].name}`)
        $("#employee-5").empty().append(`${choices[4].name}`)
    }
});
};
