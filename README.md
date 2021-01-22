# The Namegame for Web

Leading scientists have proven, via science, that learning your coworkers names while starting a new job is useful. Your test project is to make it happen!

## Your mission

1. Use this [JSON API](https://willowtreeapps.com/api/v1.0/profiles/), which returns a list of employees along with their headshots, as a datasource for the game. A swagger spec for this API will be created soon to use as a reference.

2. Use [these Figma designs](https://www.figma.com/file/yUzRfmltt1m1UT9UkKL3y6/namegame?node-id=134%3A1026) as a reference for your implementation of the game. All assets can be exported from Figma directly following these [instructions](https://help.figma.com/hc/en-us/articles/360040028114-Getting-Started-with-Exports). If you want to show off your UX abilities instead, feel free to create your own design!

Note: You will need to create a figma account (it’s free) to download the assets if you would like to use them. Here are [instructions on how to export assets from figma](https://help.figma.com/hc/en-us/articles/360040028114-Getting-Started-with-Exports).

![Web Main Menu](assets/screenshots/web_home.png)

3. Clicking “Start Game” on the menu screen will navigate to a new page or route showing the game screen. On the game screen, the game will select 6 employees at random from the list of employees and display their headshots in random order. Out of the 6, the name of one of those random employees will appear at the top.

4. The user must select the headshot that belongs to that person. If they guess correct, a message will display saying “Correct!” and a new 6 random employees will be displayed along with another name.

5. This will continue until a user correctly guesses 5 times. They are then taken to a stats screen which displays the number of correct and incorrect guesses. The user can select the “home” button which takes them back to the splash screen.

6. You can implement this app however you choose, that said, your Name Game test project will be evaluated according to [this rubric](namegame_web_evaluation_rubric.pdf).

## What we're looking for

You should demonstrate your abilities in writing accessible applications using semantic HTML, CSS and Javascript. Ideally, we would like to see:

- Custom CSS, as opposed to CSS frameworks.
- Attention to accessibility concerns.
- Responsive layouts that adhere to the provided designs. Note that mobile designs are not provided, so do whatever you think makes sense for the mobile layout.

We understand that time is limited, but these bullet points will be especially important for higher-level positions (Senior and higher).

## Tooling and Configuration

We recommend that you don’t spend too much time on tooling, as it will not be our focus for evaluating your project. Use whatever tools you feel most comfortable with to write your web app!

See below if you need some good tools for spinning up a site:

- [Parcel](https://github.com/parcel-bundler/parcel) is a great zero configuration bundler for general purpose web applications.
- [Next](https://github.com/zeit/next.js) or
- [Create React App](https://github.com/facebook/create-react-app) are both great starting places for react applications.
