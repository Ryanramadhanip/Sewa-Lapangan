import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// Load Navbar
import Navbar from "./component/Navbar";
// Load halaman
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Member from "./page/Member";
import Lapangan from "./page/Lapangan";
import Sewa from "./page/Sewa";

class Utama extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/home">
          <Navbar />
          <Home />
        </Route>
        <Route path="/member">
          <Navbar />
          <Member />
        </Route>
        <Route path="/lapangan">
          <Navbar />
          <Lapangan />
        </Route>
        <Route path="/sewa">
          <Navbar />
          <Sewa />
        </Route>
      </Switch>
    );
  }
}

export default Utama;
