import React from "react";
import axios from "axios";

class WorkerRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: {},
    };
  }

  QChangeToggle = () => {
    this.props.QRegister({ page: "login" });
  };

  QGetTextFromField = (e) => {
    console.log(e.target.value);
    this.setState((prevState) => ({
      worker: { ...prevState.worker, [e.target.name]: e.target.value },
    }));
  };

  QPostRegister = () => {
    console.log("called register");
    axios
      .post("/workers/register", {
        username: this.state.worker.username,
        email: this.state.worker.email,
        password: this.state.worker.password,
        profession: this.state.worker.profession,
      })
      .then((response) => {
        if (typeof response.data === "string") {
          console.log(response);
          alert(response.data);
        } else {
          console.log("Sent to server...");
          console.log("login form user:" + response.data);
          this.props.QSendUserToParent(response.data);
        }
      })
      .catch((err) => {
        console.log("error while register post");
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <form style={{ margin: "20px" }}>
          <div className="mb-3">
            <h2>Start working at BetterTomorrow</h2>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => this.QGetTextFromField(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => this.QGetTextFromField(e)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => this.QGetTextFromField(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profession</label>
            <input
              name="profession"
              type="text"
              className="form-control"
              onChange={(e) => this.QGetTextFromField(e)}
            />
          </div>
        </form>
        <button
          style={{ margin: "10px" }}
          className="btn btn-primary bt"
          onClick={() => this.QPostRegister()}
        >
          Submit
        </button>
        <div className="mb-2">
          <a
            href="#"
            onClick={() => this.QChangeToggle()}
            className="link-primary"
          >
            Already have an account?
          </a>
        </div>
      </div>
    );
  }
}

export default WorkerRegisterForm;
