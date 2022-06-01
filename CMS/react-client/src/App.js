import React from "react";
// import { useState } from "react";
import LogInView from "./views/LogInView";
import HomeView from "./views/HomeView";
import axios from "axios";
// import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      logged: false,
      user: {},
    };
  }

  componentDidMount() {
    axios.get("http://88.200.63.148:5111/login").then((response) => {
      console.log("COmponent did mount: ", response);
    });
  }

  QLogOut = () => {
    this.setState({
      logged: false,
      user: {},
    });
    axios.get("/login/logout").then((response) => {
      console.log(response);
    });
  };

  QSetUser = (obj) => {
    this.setState({
      user: obj,
      logged: true,
    });
    console.log("user: ", this.state.user);
  };

  render() {
    if (this.state.logged === false) {
      return <LogInView QSetUser={this.QSetUser} />;
    } else {
      return <HomeView user={this.state.user} QLogOut={this.QLogOut} />;
    }
  }
}

export default App;
