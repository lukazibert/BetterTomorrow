import React from "react";
import axios from "axios";

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  QChangeToggle = () => {
    this.props.QLogIn({ page: "register" });
  };

  QPostSingIn = () => {
    console.log("postsingin called");
    axios
      .post(
        "/login",
        {
          username: this.state.user.username,
          password: this.state.user.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (typeof response.data === "string") {
          console.log(response);
          alert(response.data);
        } else {
          // console.log("Sent to server...");
          // console.log("login form user:" + response.data);
          this.props.QSendUserToParent(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value },
    }));
  };
  render() {
    return (
      <div className="col d-flex">
        <div
          className="card  mx-auto"
          style={{
            width: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <form style={{ margin: "20px" }}>
            <div className="mb-3">
              <h2>Log In</h2>
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                // id="exampleInputEmail1"
                // aria-describedby="emailHelp"
                onChange={(e) => this.QGetTextFromField(e)}
              />
              {/* <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div> */}
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
            onClick={() => this.QPostSingIn()}
          >
            Submit
          </button>
          <div className="mb-2">
            <a
              href="#"
              onClick={() => this.QChangeToggle()}
              className="link-primary"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInForm;
