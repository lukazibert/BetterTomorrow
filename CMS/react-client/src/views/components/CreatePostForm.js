import React from "react";
import axios from "axios";
import DefaultIcon from "../../assets/user-icon.svg";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      post: {},
    };
  }

  // componentDidMount = () => {
  //   this.setState({
  //     user: this.props.user,
  //   });
  // };
  QUploadPost = () => {
    axios
      .post(
        "/forum/upload_post",
        {
          creator_id: this.state.user.id,
          title: this.state.post.title,
          description: this.state.post.description,
          article_url: this.state.post.article_url,
          photo_url: this.state.post.photo_url,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Sent to server...");
        console.log("responce:", response);
        this.props.QBack("forum");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      post: { ...prevState.post, [e.target.name]: e.target.value },
    }));
  };

  render() {
    return (
      <div className="row">
        <div className="col text-center">
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              this.props.QBack("forum");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="col-8 m-3">
          <div className="card">
            <div className="card-header d-flex flex-row">
              <img
                src={DefaultIcon}
                height={40}
                width={40}
                alt="..."
                className="img-thumbnail"
              />
              <h5 className="card-title m-2">{this.state.user.username}</h5>
            </div>
            <div className="card-body text-center">
              <form style={{ margin: "20px" }}>
                <div className="mb-3">
                  <h2>Create a new post</h2>
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    onChange={(e) => this.QGetTextFromField(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    type="text"
                    className="form-control"
                    // id="exampleInputPassword1"
                    onChange={(e) => this.QGetTextFromField(e)}
                    rows="5"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Url link to the article</label>
                  <input
                    name="article_url"
                    type="text"
                    className="form-control"
                    onChange={(e) => this.QGetTextFromField(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Url of the photo</label>
                  <input
                    name="photo_url"
                    type="text"
                    className="form-control"
                    onChange={(e) => this.QGetTextFromField(e)}
                  />
                </div>
              </form>
              <button
                style={{ margin: "10px" }}
                className="btn btn-primary bt"
                onClick={() => this.QUploadPost()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    );
  }
}

export default CreatePost;
