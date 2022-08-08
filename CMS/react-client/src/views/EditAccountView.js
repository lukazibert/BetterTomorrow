import React from "react";
import DefaultIcon from "../assets/user-icon.svg";
import ReactDOM from "react-dom";
import axios from "axios";

class EditAccountView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
      pain_sliders: [],
    };
  }

  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value },
    }));
  };
  componentDidMount() {
    this.setState({
      user: this.props.user,
      pain_sliders: this.props.user.pain_levels
        ? JSON.parse(this.props.user.pain_levels)
        : [{ name: "(sample) Bolečina v ledveni hrbtenici (1-10)", value: 10 }],
    });
  }

  QAddPainMeasure = () => {
    this.setState((prevState) => ({
      pain_sliders: [...prevState.pain_sliders, { name: "", value: 10 }],
    }));
  };

  QSetNewName = (e) => {
    console.log("id: ", e.target.id);
    console.log("value: ", e.target.value);
    this.setState((prevState) => ({
      pain_sliders: prevState.pain_sliders.map(
        (el, index) => {
          if (index == e.target.id) {
            return { ...el, name: e.target.value };
          } else {
            return el;
          }
        }
        // index === e.target.id ? { ...el, name: e.target.value } : el
      ),
    }));
    // console.log(this.state.pain_sliders[e.target.id].name);
  };

  QSetNewValue = (e) => {
    this.setState((prevState) => ({
      pain_sliders: prevState.pain_sliders.map((el, index) =>
        index == e.target.id ? { ...el, value: e.target.value } : el
      ),
    }));
  };

  QRemovePainMeasure = (i) => {
    this.setState((prevState) => ({
      pain_sliders: prevState.pain_sliders.filter((el, index) => {
        if (index !== i) {
          return el;
        }
      }),
    }));
  };

  QSaveUserInfo = async () => {
    let pain = JSON.stringify(this.state.pain_sliders);
    console.log("pain: ", typeof pain);

    await axios
      .post("/users/update", {
        id: this.state.user.id,
        username: this.state.user.username,
        gender: this.state.user.gender,
        age: this.state.user.age,
        height: this.state.user.height,
        weight: this.state.user.weight,
        pain_levels: pain,
      })
      .then((response) => {
        console.log(response);
        this.props.edit();
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3 m-3" style={{ height: 300, width: 300 }}>
            <img
              src={
                this.state.user.profile_photo != null
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
            {/* <div className="h1">{this.state.user.username}</div> */}
            <input
              type="text"
              name="username"
              id=""
              defaultValue={this.state.user.username}
              className="form-control-lg w-100"
              onChange={(e) => this.QGetTextFromField(e)}
            />
            {/* <div className="text-secondary">{this.state.user.username}</div> */}
            <div className="d-flex flex-column align-item-between mt-3">
              <div className="d-flex flex-row my-1 alight-items-center">
                <div className="text-dark" id="gender">
                  Spol:
                </div>
                <input
                  type="text"
                  name="gender"
                  id=""
                  className="form-control ms-2"
                  defaultValue={this.state.user.gender || "Spol"}
                  onChange={(e) => this.QGetTextFromField(e)}
                />
              </div>
              <div className="d-flex flex-row my-1 alight-items-center">
                <div className="text-dark my-3" id="age">
                  Starost:
                </div>
                <input
                  type="text"
                  name="age"
                  id=""
                  className="form-control ms-2"
                  onChange={(e) => this.QGetTextFromField(e)}
                  defaultValue={this.state.user.age}
                />
              </div>
              <div className="d-flex flex-row my-1 alight-items-center">
                <div className="text-dark my-3" id="height">
                  Višina:
                </div>
                <input
                  type="text"
                  name="height"
                  id=""
                  className="form-control ms-2"
                  defaultValue={this.state.user.height}
                  onChange={(e) => this.QGetTextFromField(e)}
                />
              </div>
              <div className="d-flex flex-row my-1 alight-items-center">
                <div className="text-dark my-3" id="weight">
                  Teža:
                </div>
                <input
                  type="text"
                  name="weight"
                  id=""
                  className="form-control ms-2"
                  defaultValue={this.state.user.weight}
                  onChange={(e) => this.QGetTextFromField(e)}
                />
              </div>
            </div>
          </div>
          <div className="col-4 my-3">
            <div className="d-flex justify-content-end">
              <div
                className="btn btn-primary"
                onClick={() => this.QSaveUserInfo()}
              >
                Save
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column" id="pain_column">
          {this.state.pain_sliders.map((el, index) => {
            return (
              <div className="d-flex flex-row my-4 align-items-center">
                <div className="w-100">
                  <input
                    type="text"
                    id={index}
                    className="form-control"
                    onChange={(e) => {
                      this.QSetNewName(e);
                    }}
                    defaultValue={el.name}
                  />
                  <div className="d-flex flex-row align-items-center">
                    <input
                      type="range"
                      className="range m-2 w-100"
                      id={index}
                      min="1"
                      max="10"
                      step="1"
                      defaultValue={el.value}
                      onChange={(e) => {
                        this.QSetNewValue(e);
                      }}
                    />
                    <span class="badge bg-primary badge-pill">{el.value}</span>
                  </div>
                </div>
                <div className="">
                  <i
                    class="btn bi bi-trash m-2"
                    style={{
                      fontSize: "2rem",
                    }}
                    onClick={() => {
                      this.QRemovePainMeasure(index);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row mt-4 text-center">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.QAddPainMeasure();
              }}
            >
              Dodaj novo merilo bolečine
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditAccountView;
