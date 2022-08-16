import React from "react";
// import { Post } from "../models/PostModel";
import axios from "axios";
import DefaultIcon from "../assets/user-icon.svg";

class ForumView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      user: {},
    };
  }

  componentDidMount() {
    axios.get("/forum").then((res) => {
      this.setState({
        posts: res.data,
        user: this.props.user,
      });
    });
  }

  render() {
    let data = this.state.posts;
    return (
      <div className="row">
        <div className="col"></div>
        <div className="col-8 m-3">
          {data.length > 0 ? (
            data.map((d) => {
              return (
                <div className="card m-2" key={d.id}>
                  <div
                    className="card-header d-flex flex-row btn"
                    onClick={() => this.props.QVisitWorkerAccount(d.creator_id)}
                  >
                    <img
                      src={DefaultIcon}
                      height={40}
                      width={40}
                      alt="..."
                      className="img-fluid img-thumbnail"
                    />
                    <h5 className="card-title m-2">{d.creator_name}</h5>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{d.title.toUpperCase()}</h4>
                    <div className="d-flex flex-row">
                      <div className="" style={{ height: 300, width: 300 }}>
                        <img
                          src={d.photo_url}
                          alt=""
                          className="card-img-left rounded"
                          style={{
                            resizeMode: "contain",
                            height: 300,
                            width: 300,
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <div className="m-2 overflow-hidden">
                          {d.description}
                        </div>
                        <a
                          href={d.article_url}
                          className="link-primary m-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {d.article_url}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                //   </div>
                // </div>
              );
            })
          ) : (
            <div className="col text-center m-5">
              <div className="spinner-border" role="status">
                {/* <span class="sr-only">Loading...</span> */}
              </div>
            </div>
          )}
        </div>
        <div className="col">
          {this.state.user.type === "worker" ? (
            <button
              className="btn btn-primary m-4 p-2 position-fixed"
              onClick={() => {
                this.props.QCreatePost("create_post");
              }}
            >
              Create a new post
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default ForumView;
