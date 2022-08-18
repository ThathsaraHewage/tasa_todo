import { BrowserRouter as Router,Route} from "react-router-dom";
import React from 'react';
import Routes from "./Routes/routes.js";

function App() {
  return (
    <Router>
      <div>
        <Routes/>
      </div>
    </Router>

  );
}

export default App;
