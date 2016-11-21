$.ajax({
    url: 'http://namegame.willowtreemobile.com:2000',
    success: function(people) {
        $("#test").append(`${people[0].name}`);

        document.getElementById('employee-1-pic').src = people[0].url
        document.getElementById('employee-2-pic').src = people[1].url
        document.getElementById('employee-3-pic').src = people[2].url
        document.getElementById('employee-4-pic').src = people[3].url
        document.getElementById('employee-5-pic').src = people[4].url


        $("#employee-1-name").append(`${people[0].name}`)
        $("#employee-2-name").append(`${people[1].name}`)
        $("#employee-3-name").append(`${people[2].name}`)
        $("#employee-4-name").append(`${people[3].name}`)
        $("#employee-5-name").append(`${people[4].name}`)
    }
});
