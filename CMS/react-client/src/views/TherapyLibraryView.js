import axios from "axios";
import React from "react";
import DefaultIcon from "../assets/user-icon.svg";

class TherapyLibraryView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      therapies: {},
      user: {},
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
    console.log("state: ", this.props.user.therapies);
    if (this.props.user.type === "user") {
      axios.get("/therapy/user/" + this.props.user.id).then((response) => {
        console.log(response.data);
        this.setState({
          therapies: response.data,
        });
      });
    } else {
      axios
        .post("/workers/get_acc_data", { username: this.props.user.username })
        .then((response) => {
          console.log(response);
          this.setState({
            user: response.data,
            therapies: response.data.therapies,
          });
        });
    }
  }
  render() {
    let therapies = this.state.therapies;
    // let therapies = [
    //   {
    //     title: "Title 1",
    //     description:
    //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic perspiciatis quibusdam earum ducimus accusantium vero pariatur molestias eligendi ex dolores.",
    //     user: "user 1",
    //     area: "knee pain",
    //   },
    // ];
    return (
      <div className="row">
        <div className="h1 text-center">MOJE TERAPIJE</div>
        {therapies.length > 0 ? (
          therapies.map((t) => {
            return (
              <div className="col m-3">
                <div
                  className="card"
                  id={t.id}
                  // key={t.id}
                  onClick={() => {
                    this.props.QOpenPostedTherapy(t.id);
                    console.log(t.id);
                  }}
                >
                  <div className="card-header">
                    <div className="h4">{t.title}</div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-row">
                      <div className="" style={{ height: 200, width: 200 }}>
                        <img
                          src={t.photo_url}
                          alt="..."
                          className="card-img-left"
                          style={{
                            resizeMode: "contain",
                            height: 200,
                            width: 200,
                          }}
                        />
                      </div>
                      <div className="col">
                        <div className="d-flex flex-row m-2">
                          <img
                            src={DefaultIcon}
                            alt="..."
                            className="img-thumbnail"
                            style={{ height: "40px", width: "40px" }}
                          />
                          <div className="h5 m-2">
                            {this.state.user.type === "user"
                              ? t.username.toUpperCase()
                              : this.state.user.username.toUpperCase()}
                          </div>
                        </div>
                        <div className="m-2">{t.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col text-center m-5">
            <div class="spinner-border" role="status"></div>
          </div>
        )}
        <div className="d-flex flex-row  w-100 justify-content-center">
          {this.state.user.type === "worker" ? (
            <div
              className="btn btn-primary"
              onClick={() => {
                this.props.QSetView("create_therapy");
              }}
            >
              Ustvari novo terapijo
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default TherapyLibraryView;
