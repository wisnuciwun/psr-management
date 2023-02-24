import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./config/redux/persistConfig";
import { BrowserRouter } from "react-router-dom";

export const MainProgram = ({ children = null }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
          {children}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export const roots = ReactDOM.createRoot(document.getElementById("root"));
roots.render(<MainProgram />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
