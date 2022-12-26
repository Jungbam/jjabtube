import "./App.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Router from "./shares/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./redux/modules/signSlice";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth());
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
