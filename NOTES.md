# Notes

The following is supporting documentation for this project.

## Process

Before diving into code, it was important to understand the user flow so could create a quick wireframe to serve as the basis for the task.

### Flow

![flow chart](/flow-chart.png)

### Wireframe

![wireframe](/wireframe.png)

## What was achieved

- Can play a single game against the computer or a multiplayer game, against another player
- Players take turns to select an option (in multiplayer mode only)
- A results view
  - Shows the game result and updated score
  - Allows players to play again, save the game or finish
- A game can be loaded from the main menu

## Technical

Given the time constraints, the following decision was made to use:

- Angular material for speed of prototyping, so can focus on the logic
- Component store for simple state management

## Known issues

- Starting a new game after saving a game keeps the previous player data, i.e. score
  - Can be resolved by setting the state of players to the initial state when selecting a game mode

## Improvements

- Use an API service instead of LocalStorage
  - The store would call methods via `game-api.service` which would return observables
- Save/load multiple games
  - The store would need to be updated to have a unique ID per game
- When playing again, players should take alternate turns to start a game
  - Could be handled by storing 'FirstTurn' in state
- Create a type for `submitForm` event data as currently _defined_ in two places
- Remove usage of `UntypedFormBuilder` for better type safety
- Potentially move game components (stateless) into their own sub-folder and co-locate the game store and container
- Move default form field options into app component, so a global setting

## Further improvements

Some of the below could be considered out of scope.

- Improve UI to better display selecting an option and the result view
- Show the current score when a player selects an option
- Ability to reset scores/game
- Include player draws and losses as part of their user profile
- Add test coverage; unit tests
- Add Linting of TS and SCSS files via eslint and stylelint
- Use of storybook to further document components and their usage
- Use of animations and images to provide a "game" feel
- Use Web sockets so two players can play on separate browsers
