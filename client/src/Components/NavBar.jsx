import React, { Component } from "react";
import "../index.css";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};

  login() {
    fetch("http://localhost:5002/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ayy: "lmao"
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark navbar-expand-sm bg-dark sticky-top">
          <a className="navbar-brand" href="/">
            Homepage
          </a>
          <ul className="navbar-nav">
            <Link to="/newpost">
              <li className="nav-item active px-1">
                <p className="navbar-text">New Post</p>
              </li>
            </Link>

            <li className="nav-item px-1">
              <button
                className="btn btn-secondary login-button"
                onClick={this.login}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
