import React from 'react';
import {Switch, Route} from "react-router-dom";
import GuideProfile from "./components/GuideProfile";
import LoginAndRegister from "./components/LoginAndRegister";
import TourListings from "./components/TourListings";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";

export default(
    <Switch>
        <Route path="/guide" component={GuideProfile} />
        <Route path="/user" component={UserProfile} />
        <Route path="/login" component={LoginAndRegister} />
        <Route path="/tours" component={TourListings} />
        <Route exact path="/" component={Home} />

    </Switch>
)