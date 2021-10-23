# Juan test project

This web application recreates an exchange order book. Some of its features are:  
    - Show purchase orders and sales orders grouped in a list in real time  
    - Toggle between BTC / ETH currencies  
    - It is responsive
## Hosting
This web app is deployed on [firebase](https://juan-test-1f3ad.web.app/)

## Dependencies

Remember if you want to use this repo on local you have to install dependencies(npm i).
If you want to deploy you have to install firebase tools and setup

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`
executes npm run run build and after build deploys the app on firebase hosting.