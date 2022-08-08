import React from "react";
import DefaultIcon from "../assets/user-icon.svg";
import EditAccountView from "./EditAccountView";

class AccountView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
      edit: false,
      pain_sliders: [
        { name: "(sample) Bolečina v ledveni hrbtenici (1-10)", value: 10 },
      ],
    };
  }
  componentDidMount() {
    console.log(this.props.user.pain_levels);
    this.setState({
      user: this.props.user,
      pain_sliders: JSON.parse(this.props.user.pain_levels),
    });
  }

  render() {
    if (this.state.edit) {
      return (
        <EditAccountView
          user={this.props.user}
          edit={() => {
            this.setState({ edit: false });
            this.componentDidMount();
          }}
        />
      );
    } else {
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
            <div className="col-4 m-2">
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
                <div className="col-3 ms-2">
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
            <div className="col-4 my-3">
              <i
                class="d-flex btn justify-content-end bi bi-gear-wide-connected"
                style={{
                  fontSize: "2rem",
                }}
                onClick={() => {
                  this.setState({
                    edit: true,
                  });
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            {this.state.pain_sliders.map((el) => (
              <div className="">
                <lable className="form-label text-secondary">{el.name}</lable>
                <div className="d-flex flex-row w-100 align-items-center">
                  <input
                    type="range"
                    className="range m-2 w-100"
                    id={el}
                    min="1"
                    max="10"
                    step="1"
                    defaultValue={el.value}
                    disabled
                  />
                  <span class="badge bg-primary badge-pill">{el.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-4 text-center">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.props.QLogOut();
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
}

export default AccountView;
