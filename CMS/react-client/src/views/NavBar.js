import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentView: "forum",
      search_data: "",
    };
  }

  QChangeView = (view) => {
    this.setState({
      currentView: view,
    });
    this.props.QView(view);
  };

  QIsActive = (is) => {
    return is == this.state.currentView ? "active" : "";
  };

  QGetSearchInput = (e) => {
    this.setState({
      search_data: e.target.value,
    });
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="navbar-brand m-2">BetterTomorrow</div>
        <ul className="navbar-nav mr-avto">
          <li className="nav-item">
            <a
              href="#"
              onClick={() => this.QChangeView("forum")}
              className={`nav-link ${
                this.state.currentView === "forum" ? "active" : ""
              }`}
            >
              Forum
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              onClick={() => this.QChangeView("therapy")}
              className={`nav-link ${
                this.state.currentView === "therapy" ? "active" : ""
              }`}
            >
              Terapije
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              onClick={() => this.QChangeView("account")}
              className={`nav-link ${
                this.state.currentView === "account" ? "active" : ""
              }`}
            >
              Profil
            </a>
          </li>
          {/* <li className="nav-item">
            <a
              href="#"
              onClick={() => this.QChangeView("chat")}
              className={`nav-link ${
                this.state.currentView === "chat" ? "active" : ""
              }`}
            >
              Pogovori
            </a>
          </li> */}
        </ul>
        <div className="nav-item ms-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              name="search"
              onChange={async (e) => {
                await this.QGetSearchInput(e);
                // console.log(e.target.value);
                console.log(this.state.search_data);
              }}
            />
            <div className="input-group-btn">
              <button
                className="btn btn-outline-primary m-3 my-sm-0"
                // type="submit"
                onClick={() =>
                  this.props.QSetSearchData(this.state.search_data)
                }
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
