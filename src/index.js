import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

import { Provider } from 'react-redux';
import Store from "./Components/App/Store.js";

ReactDOM.render(
    <>
        <Provider store={Store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </>, document.getElementById("root")
);