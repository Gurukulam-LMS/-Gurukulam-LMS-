import { BiEnvelope } from "react-icons/bi";
import {
  FaPhoneVolume,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "../../assets/css/footer.css";
const Footer = () => {
  const history = useHistory();
  return (
    <footer className="bg-footer w-100 footer">
      <div className="container gap  col-11 col-lg-9">
        <div className="row ">
          <div className="col-sm-4 col-12 col-lg-3">
            <a className="logo" href="#">
              <img
                src="Images/Group 199.png"
                className="img img-fluid"
                alt=""
              />
            </a>
            <h5>
              Caribbean Ct <br /> Haymarker,virginia(VA)
            </h5>
            <ul className="list-unstyled mt-2">
              <li>
                <a href="#">
                  <BiEnvelope className="mr-2" />
                  Address@gmail.com
                </a>
              </li>
              <li>
                <a href="#">
                  <FaPhoneVolume /> (970) 262-1412
                </a>
              </li>
              <li className="mt-2 list-social">
                <FaFacebookF className="m-1" />
                <FaInstagram className="m-1" />
                <FaTwitter className="m-1" />
                <FaLinkedin className="m-1" />
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-6 col-lg-3">
            <h5>Category</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Fil and Video</a>
              </li>
              <li>
                <a href="#">Graphic Design</a>
              </li>
              <li>
                <a href="#">UI/UX Design</a>
              </li>
              <li>
                <a href="#">Business Analytics</a>
              </li>
              <li>
                <a href="#">Marketing</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-6 col-lg-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Privacy Plicy</a>
              </li>
              <li>
                <a href="#">Discussion</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Custumer Support</a>
              </li>
              <li>
                <a href="#">Course FAQ's</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-3 footer-btn">
            <h5>Subscribe</h5>
            <ul className="list-unstyled">
              <li className="pb-4">
                <a href="#">
                  Lorem Ipsum Has Been Them An Idustrial Printer Took A GAlley
                  Make Book
                </a>
              </li>
              <li className=" pb-3">
                <button
                  className="btn btn-mail col-8"
                  onClick={() => history.push("/contact")}
                >
                  Email Here
                </button>
              </li>
              <li>
                <button
                  className="btn btn-sub col-10"
                  style={{ backgroundColor: "blue", borderColor: "blue" }}
                >
                  Subscribe
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
