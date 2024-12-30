import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./routes/Routes";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
