$.ajax({
    url: 'http://namegame.willowtreemobile.com:2000',
    success: function(people) {
        $("#test").append(`${people[0].name}`);
    }
});
