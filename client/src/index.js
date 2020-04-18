import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";

import "./Resources/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "./reducers";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const chromeDebugTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, chromeDebugTool)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
