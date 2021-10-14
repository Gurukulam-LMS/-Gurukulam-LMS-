import React, { useContext } from "react";
import "../assets/css/Navbar.css";
import Image1 from "../assets/Images/Icon 1.png";
import Image2 from "../assets/Images/Icon.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Dropdown } from "react-bootstrap";

function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <nav>
        <ul>
          <li className="logo">
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Dashboard
            </Link>
          </li>
          <li className="btn">
            <span className="fas fa-bars"></span>
          </li>
          <div className="items">
            <li>
              <Link to={"/courses"}>Courses</Link>
            </li>
            <li>
              <Link to={"/create"}>Create Course</Link>
            </li>

            <li>
              <Link to="/blog">Create Blog</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>

            <Dropdown>
              <Dropdown.Toggle
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "black",
                  fontSize: "1.3rem",
                  boxShadow: "none",
                  margin: "0",
                  padding: "0",
                  marginTop: "0",
                }}
              >
                <span className="fa fa-cog"></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/coupon">Create Coupan</Dropdown.Item>
                <Dropdown.Item href="/" onClick={() => logout()}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <li>
              <a href="#">
                <img src={Image1} alt="logo" width="15" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={Image2} alt="logo" width="15" />
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
