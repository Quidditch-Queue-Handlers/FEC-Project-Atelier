import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { store } from './state/store';
import App from "./App";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
