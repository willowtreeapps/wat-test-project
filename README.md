# The Namegame

Learning your coworkers names while starting a new job can be very useful. Your test project is to make it happen! We have a simple version hosted at [https://wta-namegame.herokuapp.com/](https://wta-namegame.herokuapp.com/) which you can test. The API is located at [https://wta-namegame.herokuapp.com/api/game](https://wta-namegame.herokuapp.com/api/game).

## Option 1

Present the user with five faces and ask them to identify the listed name. This is essentially what is working already. To spruce things up, implement a few features of your choice.

1. Team mode. The API returns people who used to work here too. Current team members have titles and former team members don't.
2. Stat tracking. How many correct / incorrect attempts did the user make? How long does it take on average for a person to identify the subject?
3. Reverse mode. Show five names with one picture.
4. Keyboard shortcuts. Power users love keyboard shortcuts; maybe add numbers for faces for mouse free fun.
5. Local scoring. The server might not accept scores, but you can always track it locally. Make metrics of your own and have a leader board!
6. Matt Mode. Roughly 90% of our co-workers are named Matt, so add a challenge mode where you only present the users with a Matt.
7. Hint mode. As people wait, faces disappear until only the correct one is left.
8. Insert your own idea here!

## Option 2

Feel like taking the path less trodden? Do you know a better way to learn faces than to present five options and a name? Come up with your own memory game!

## Conclusion

We have provided you with a few files to get you started. Feel free to discard everything and start from scratch. You may use any framework or library you like.

If you need a simple http server, we recommend [http-server](https://www.npmjs.org/package/http-server).
