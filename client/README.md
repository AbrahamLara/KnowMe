# KnowMe client side React app

This is the client side directory that utilizes React for the frontend. The React component library of choice is **reactstrap** and **react-transition-group** for effects such as fading in and out.

React Redux is utilized to handle managing updates to the UI for authentication, errors, loading, etc.

Axios is the preffered HTTP client for handling requests to our backend.

## Actions

The /actions folder is where we create actions for each possible change to the state. The shared.js file is where most of the HTTP requests are made and actions are dispatched.

## Reducers

The /reducers folder contains all the reducers for making updates to state based on request errors and user interactions throughout the app.

## Middleware

The /middleware folder contains custom redux middleware and [redux-thunk](https://www.npmjs.com/package/redux-thunk#motivation) which allows for asynchronous dispatching.