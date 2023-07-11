import ReactDOM from "react-dom/client";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
