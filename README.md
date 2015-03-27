# The Namegame

Leading scientists have proven, via science, that learning your coworkers names while starting a new job is useful. Your test project is to make it happen! We have a simple version hosted at [namegame.willowtreemobile.com](http://namegame.willowtreemobile.com/) which you can test. The api is located at [http://api.namegame.willowtreemobile.com/](http://api.namegame.willowtreemobile.com/).

## Option 1

Present the user with five faces and ask them to identify the listed name. This is essentially what is working already. To spruce things up, implement a few features of your choice.

1. Stat tracking. How many correct / incorrect attempts did the user make? How long does it take on average for a person to identify the subject?
2. Reverse mode, Show five names with one picture.
3. Keyboard shortcuts. Power users love keyboard shortcuts, maybe add numbers for faces for mouse free fun. Bonus points for Vim shortcuts. Negative points for Emacs**.
4. Local Scoring. The server might not accept scores, but you can always track it locally. Make metrics of your own and have a leader board!
5. Mat(t) Mode. Roughly 90% of our co-workers are named Mat(t), so add a challenge mode where you only present the users with A Mat(t).
6. Hint mode. As people wait, faces disappear until only the correct one is left.
7. Insert your own idea here!


## Option 2

Feel like taking the path less trodden? Do you know a better way to learn faces than to present five options and a name? Come up with your own memory game!

## Conclusion

We have provided you with a few files to get you started. Feel free to discard everything and start from scratch. You may use any framework or library you like.

If you need a simple http server, we recommend [http-server](https://www.npmjs.org/package/http-server).

** The Web Apps Team Lead uses Emacs. So, like, use your own discretion here.
