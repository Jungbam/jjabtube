import "./App.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Router from "./shares/Router";
import StButton from "./UI/StButton";
import { useEffect } from 'react';
import { auth } from './redux/modules/signSlice';
import { useDispatch } from 'react-redux';

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [])

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
