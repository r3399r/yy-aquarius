# yy-angular-ionic-template

This project is using [Angular Framework](https://angular.io/). After a developer clones the source code from github, please run `npm install` first to install all the required packages.

## Development server

Run `npm start` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate {schematic} {name}` to generate a new component. Please refer to [ng generate](https://angular.io/cli/generate).

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` or `npm run test` to execute the unit tests and check the code coverage. We should improve our code coverage as close to 100% as possible.

## Before commit

Run `npm run pre:dev` to make sure that lint passes, build passes, and unit test passes. It is better if unit test covers all your newly added code. If you cannot implement unit test smoothly, please call someone's help.

## Branch Protection

After creating new repository, please set the restriction to protect master branch.

### Steps

1. Settings
2. Branches
3. Add branch protection rule
   * put **master** as pattern
   * check **Require pull request reviews before merging**
   * check **Dismiss stale pull request approvals when new commits are pushed**
   * check **Require review from Code Owners**
