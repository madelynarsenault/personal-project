import React from 'react';
import {Switch, Route} from "react-router-dom";
import GuideLanding from "./components/GuideLanding";
import LoginAndRegister from "./components/LoginAndRegister";
import TourListings from "./components/TourListings";
import UserLanding from "./components/UserLanding";
import Home from "./components/Home";

export default(
    <Switch>
        <Route path="/guide" component={GuideLanding} />
        <Route path="/user" component={UserLanding} />
        <Route path="/login" component={LoginAndRegister} />
        <Route path="/tours" component={TourListings} />
        <Route exact path="/" component={Home} />

    </Switch>
)