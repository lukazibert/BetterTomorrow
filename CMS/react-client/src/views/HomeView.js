import React from "react";
import ForumView from "./ForumView";
import NavBar from "./NavBar";
import AccountView from "./AccountView";
import TherapyView from "./TherapyView";
import ChatLibraryView from "./ChatLibraryView";
import CreatePost from "./components/CreatePostForm";
import ChatView from "./ChatView";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: "forum",
      user: {},
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
    console.log("home user: ", this.props.user);
  }

  QSetView = (view) => {
    this.setState({
      current_page: view,
    });
  };

  QGetView = (state) => {
    let view = state.current_page;
    switch (view) {
      case "forum":
        return <ForumView QCreatePost={this.QSetView} user={this.props.user} />;
      case "account":
        return (
          <AccountView user={this.state.user} QLogOut={this.props.QLogOut} />
        );
      case "therapy":
        return <TherapyView user={this.props.user} />;
      case "chat":
        // return <ChatLibraryView />;
        return <ChatView />;
      case "create_post":
        return <CreatePost QBack={this.QSetView} user={this.props.user} />;
    }
  };

  render() {
    return (
      <div>
        <NavBar QView={this.QSetView} />
        <div className="container">{this.QGetView(this.state)}</div>
      </div>
    );
  }
}

export default HomeView;
