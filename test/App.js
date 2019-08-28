import React from 'react';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from './stores/reducers'
import Navigation from './src/Navigation'

const store = createStore(reducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
}
