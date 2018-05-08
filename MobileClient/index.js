import React from "react";
import { AppRegistry } from "react-native";
import App from "./components/App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import popcornProject from "./redux/reducers";

const store = createStore(popcornProject);

const appContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("AwesomeProject", () => appContainer);
