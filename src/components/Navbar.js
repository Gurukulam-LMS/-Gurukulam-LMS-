import React, { useContext } from "react";
import "../assets/css/Navbar.css";
import Image1 from "../assets/Images/Icon 1.png";
import Image2 from "../assets/Images/Icon.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
              <Link to={"/coupon"}>Create Coupon</Link>
            </li>
            <li>
              <Link to="/blog">Create Blog</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <a href="/" onClick={() => logout()}>
                Logout
              </a>
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
