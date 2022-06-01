import React from "react";
import DefaultIcon from "../assets/user-icon.svg";

class AccountView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 m-3" style={{ height: 300, width: 300 }}>
            <img
              src={
                this.state.user.profile_photo === null
                  ? DefaultIcon
                  : this.state.user.profile_photo
              }
              alt=""
              className="card-img-left rounded"
              style={{
                resizeMode: "contain",
                height: 300,
                width: 300,
              }}
            />
          </div>
          <div className="col-6 m-2">
            <div className="h1">{this.state.user.username}</div>
            <div className="text-secondary">{this.state.user.username}</div>
            <div className="row mt-4">
              <div className="col-2">
                <div className="text-dark" id="gender">
                  Spol:
                </div>
                <div className="text-dark" id="age">
                  Starost:
                </div>
                <div className="text-dark" id="height">
                  Višina:
                </div>
                <div className="text-dark" id="weight">
                  Teža:
                </div>
              </div>
              <div className="col-2">
                <div className="text-secondary" id="gender">
                  {this.state.user.gender}
                </div>
                <div className="text-secondary" id="age">
                  {this.state.user.age}
                </div>
                <div className="text-secondary" id="height">
                  {this.state.user.height}
                </div>
                <div className="text-secondary" id="weight">
                  {this.state.user.weight}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <lable className="form-lable">
            Bolečina v ledveni hrbtenici (1-10)
          </lable>
          <input
            type="range"
            className="range m-2"
            min="1"
            max="10"
            step="1"
            list="mylist"
            disabled
          />
          <datalist id="mylist">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option value="7"></option>
            <option value="8"></option>
            <option value="9"></option>
            <option value="10"></option>
          </datalist>
        </div>
        <div className="row mt-4 text-center">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.QLogOut();
                // this.setState({
                //   user: {},
                // });
                localStorage.setItem("user", {});
                localStorage.setItem("logged", false);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountView;
