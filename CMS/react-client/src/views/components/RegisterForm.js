import React from "react";
import WorkerRegisterForm from "./WorkerRegisterForm";
import UserRegisterForm from "./UserRegisterForm";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "user",
    };
  }

  QChangeToggle = () => {
    this.props.QLogIn({ page: "login" });
  };

  QChangeWorkerUser = (data) => {
    this.setState({
      display: data,
    });
  };
  render() {
    return (
      <div className="col">
        <div
          className="card"
          style={{
            width: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div className="card-header">
            <div className="row">
              <div
                className={`col ${
                  this.state.display === "user"
                    ? "rounded bg-secondary text-white"
                    : ""
                }`}
                onClick={() => this.QChangeWorkerUser("user")}
              >
                <h2>User</h2>
              </div>
              <div
                className={`col ${
                  this.state.display === "worker"
                    ? "rounded bg-secondary text-white"
                    : ""
                }`}
                onClick={() => this.QChangeWorkerUser("worker")}
              >
                <h2>Worker</h2>
              </div>
            </div>
          </div>
          {this.state.display === "user" ? (
            <UserRegisterForm
              QRegister={this.QChangeToggle}
              QSendUserToParent={this.props.QSendUserToParent}
            />
          ) : (
            <WorkerRegisterForm
              QRegister={this.QChangeToggle}
              QSendUserToParent={this.props.QSendUserToParent}
            />
          )}
        </div>
      </div>
    );
  }
}

export default RegisterForm;
