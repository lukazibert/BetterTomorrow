import React from "react";
import axios from "axios";

class UserRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  QChangeToggle = () => {
    this.props.QRegister({ page: "login" });
  };

  QGetTextFromField = (e) => {
    console.log(e.target.value);
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value },
    }));
  };

  QPostRegister = () => {
    console.log("called register");
    axios
      .post("/users/register", {
        username: this.state.user.username,
        email: this.state.user.email,
        password: this.state.user.password,
      })
      .then((response) => {
        if (typeof response.data === "string") {
          console.log(response);
          alert(response.data);
        } else {
          console.log(response);
          this.props.QSendUserToParent(response.data);
        }
        // // console.log(response);
        // console.log("Sent to server...");
        // this.props.QSendUser2Parent("user", response.data);
      })
      .catch((err) => {
        // alert("Error while registering!");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <form style={{ margin: "20px" }}>
          <div className="mb-3">
            <h2>Register as user</h2>
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

export default UserRegisterForm;
