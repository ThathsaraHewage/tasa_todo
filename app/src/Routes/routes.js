import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../components/home.js";

const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
                <Route path="/" exact component = {Home}/>

       </Switch>
        </BrowserRouter>
    );
}

export default Routes;