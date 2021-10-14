import "../../assets/css/nav.css";
import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../../../context/authContext";
import { useHistory } from "react-router-dom";
const Header = ({ active }) => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();
  return (
    <nav className="nav navbar  navbar-expand-lg fixed-top navbar-dark bg-nav customNav">
      <div className="container col-lg-9" style={{ width: "100%" }}>
        <a className="dashboardLogo mr-auto" href="/dash">
          Dashboard
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-menu"
          style={{ backgroundColor: "black" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ backgroundColor: "black" }}
          ></span>
        </button>
        <div
          className="collapse navbar-collapse"
          style={{ color: "black" }}
        ></div>
        <div
          className="collapse navbar-collapse justify-content-end bg-nav2"
          id="nav-menu"
        >
          <ul className="navbar-nav text-left">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/allCourses">
                Courses
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${active === "course" && "active"}`}
                href="/dash/mycourse"
              >
                My Courses
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${active === "profile" && "active"}`}
                href="/dash/profile"
              >
                Profile
              </a>
            </li>

            <li className="nav-item d-none d-lg-block">
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "grey",
                    fontSize: "1.3rem",
                    marginTop: "1px",
                  }}
                >
                  <span className="fa fa-cog"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="/"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
