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
              <Link to="/users">Users</Link>
            </li>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  fontWeight: "400",
                  color: "black",
                  fontSize: "18px",
                  boxShadow: "none",
                  margin: "0.5px",
                  padding: "0",
                  marginTop: "0",
                  textTransform: "none",
                  fontFamily: "Roboto",
                }}
              >
                <span>Create</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/create">Course</Dropdown.Item>
                <Dropdown.Item href="/blog">Blog</Dropdown.Item>
                <Dropdown.Item href="/coupon">Coupan</Dropdown.Item>
                {/* <Dropdown.Item href="/" onClick={() => logout()}>
                  Logout
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>

            <li>
              <Link
                to="/"
                onClick={() => logout()}
                style={{
                  background: "#0043ff",
                  padding: "8px",
                  marginLeft: "25px",
                  borderRadius: "5px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontFamily: "Ubuntu",
                  }}
                >
                  Logout
                </span>
              </Link>
            </li>

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
