import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "../../assets/css/header.css";

const NavHeader = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const logoutHandler = () => {
    logout();
  };
  return (
    <nav className="nav navbar  navbar-expand-lg fixed-top navbar-light bg-nav">
      <div className="container col-lg-10 col-11">
        <a className="navbar-brand mr-auto brandLogo" href="/">
          Gurukulam
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"></div>
        <div
          className="collapse navbar-collapse justify-content-end bg-nav2"
          id="nav-menu"
        >
          <ul className="navbar-nav headerNavItem">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="/dash">
                  Dashboard
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/blogs">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Cart
                </a>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item" onClick={logoutHandler}>
                <a className="nav-link " href="/signin">
                  <button type="button" className="nav-btn headerbtn">
                    Sign out
                  </button>
                </a>
              </li>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/signin">
                    Sign In
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/signup">
                    <button type="button" className="nav-btn headerbtn">
                      Sign up
                    </button>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavHeader;
