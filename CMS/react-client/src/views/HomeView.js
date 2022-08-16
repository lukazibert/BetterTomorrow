import React from "react";
import ForumView from "./ForumView";
import NavBar from "./NavBar";
import AccountView from "./AccountView";
import TherapyLibraryView from "./TherapyLibraryView";
import ChatLibraryView from "./ChatLibraryView";
import CreatePost from "./components/CreatePostForm";
import ChatView from "./ChatView";
import WorkerAccountView from "./WorkerAccountView";
import SearchView from "./SearchView";
import CreateTherapyView from "./CreateTherapyView";
import TherapyView from "./TherapyView";
import VisitAccountView from "./VisitAccountView";
import EditTherapyView from "./EditTherapyView";
import VisitWorkerAccountView from "./VisitWorkerAccountView";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: "forum",
      user: {},
      search_data: "",
      therapy_id: "",
      visit_user: "",
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
  QSetSearchData = async (data) => {
    await this.setState({
      search_data: data,
    });
    console.log("home: ", this.state.search_data);
    this.QSetView("search");
  };

  QVisitWorkerAccount = (id) => {
    this.setState({
      visit_user: id,
    });
    this.QSetView("visit_worker");
  };

  QOpenPostedTherapy = (id) => {
    this.setState({
      therapy_id: id,
    });
    this.QSetView("therapy_id");
  };
  QVisitUserAccount = (id) => {
    this.setState({
      visit_user: id,
    });
    this.QSetView("visit_user");
  };
  QEditTherapy = (id) => {
    this.setState({
      therapy_id: id,
    });
    this.QSetView("edit_therapy");
  };

  QGetView = (state) => {
    let view = state.current_page;
    switch (view) {
      case "forum":
        return (
          <ForumView
            QCreatePost={this.QSetView}
            user={this.props.user}
            QVisitWorkerAccount={this.QVisitWorkerAccount}
          />
        );
      case "account":
        return this.state.user.type === "user" ? (
          <AccountView
            user={this.props.user}
            QLogOut={this.props.QLogOut}
            QUpdateUser={this.props.QUpdateUser}
          />
        ) : (
          <WorkerAccountView
            user={this.props.user}
            QLogOut={this.props.QLogOut}
            QUpdateUser={this.props.QUpdateUser}
            QSetView={this.QSetView}
            QOpenPostedTherapy={this.QOpenPostedTherapy}
            QEditTherapy={this.QEditTherapy}
          />
        );
      case "therapy":
        return (
          <TherapyLibraryView
            user={this.props.user}
            QSetView={this.QSetView}
            QOpenPostedTherapy={this.QOpenPostedTherapy}
          />
        );
      case "chat":
        // return <ChatLibraryView />;
        return <ChatView />;

      case "create_post":
        return <CreatePost QBack={this.QSetView} user={this.props.user} />;

      case "search":
        return (
          <SearchView
            username={this.state.search_data}
            QVisitWorkerAccount={this.QVisitWorkerAccount}
          />
        );

      case "create_therapy":
        return (
          <CreateTherapyView
            user_id={this.state.user.id}
            QOpenPostedTherapy={this.QOpenPostedTherapy}
          />
        );

      case "therapy_id":
        return (
          <TherapyView
            id={this.state.therapy_id}
            QVisitUserAccount={this.QVisitUserAccount}
            QEditTherapy={this.QEditTherapy}
            type={this.state.user.type}
          />
        );

      case "visit_user":
        return <VisitAccountView id={this.state.visit_user} />;

      case "visit_worker":
        return (
          <VisitWorkerAccountView
            id={this.state.visit_user}
            user={this.state.user}
            QOpenPostedTherapy={this.QOpenPostedTherapy}
          />
        );

      case "edit_therapy":
        return (
          <EditTherapyView
            id={this.state.therapy_id}
            QOpenPostedTherapy={this.QOpenPostedTherapy}
          />
        );
    }
  };

  render() {
    return (
      <div>
        <NavBar QView={this.QSetView} QSetSearchData={this.QSetSearchData} />
        <div className="container">{this.QGetView(this.state)}</div>
      </div>
    );
  }
}

export default HomeView;
