import axios from "axios";
import React from "react";

class TherapyView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      therapies: {},
      user: {},
    };
  }

  componentDidMount() {
    // this.setState({
    //   user: this.props.user,
    // });
    console.log("state: ", this.props.user.therapies);
    if (this.props.user.type === "user") {
      axios
        .get("/therapy/user/" + this.props.user.therapies)
        .then((response) => {
          this.setState({
            therapies: response.data,
          });
        });
    } else {
      axios.get("/therapy/worker/" + this.props.user.id).then((response) => {
        this.setState({
          therapies: response.data,
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
                <div className="card">
                  <div className="card-header">
                    <div className="h4">{t.title}</div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-row">
                      <div className="" style={{ height: 200, width: 200 }}>
                        <img
                          src="..."
                          alt="..."
                          className="card-img-left rounded placeholder"
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
                            src="..."
                            alt="..."
                            className="img-thumbnail placeholder"
                          />
                          <div className="h5 m-2">{t.user}</div>
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
      </div>
    );
  }
}

export default TherapyView;
