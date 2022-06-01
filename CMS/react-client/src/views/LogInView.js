import React from "react";
// import UserRegisterForm from "./components/UserRegisterForm";
// import WorkerRegisterForm from "./components/WorkerRegisterForm";
import RegisterForm from "./components/RegisterForm";
import LogInForm from "./components/LogInForm";

class LogInView extends React.Component {
  constructor() {
    super();
    this.state = {
      login: "login",
      User: {
        logged: false,
      },
    };
  }

  QChangeLogIn = (obj) => {
    this.setState({
      login: obj.page,
    });
  };

  QToggleLogIn = (state) => {
    switch (state.login) {
      case "login":
        return (
          <LogInForm
            QLogIn={this.QChangeLogIn}
            QSendUserToParent={this.props.QSetUser}
          />
        );
      case "register":
        return (
          <RegisterForm
            QLogIn={this.QChangeLogIn}
            QSendUserToParent={this.props.QSetUser}
            // QSendUserToParent={this.props.QSetUSer}
          />
        );
    }
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="container-fluid bg-primary p-3 text-center">
          <div className="display-1 text-white">BetterTomorrow</div>
        </div>
        <div className="container text-center">
          {this.QToggleLogIn(this.state)}
          {/* <RegisterForm /> */}
        </div>
      </div>
    );
  }
}

export default LogInView;
