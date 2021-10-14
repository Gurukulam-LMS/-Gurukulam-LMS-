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
            <a className="logo" href="#"></a>
            <h5 className="mt-2">Gurukulam</h5>
            <span>Hyderabad,India</span>
            <ul className="list-unstyled mt-2">
              <li>
                <a href="#">
                  <BiEnvelope className="mr-2" />
                  address@gmail.com
                </a>
              </li>
              <li>
                <a href="#">
                  <FaPhoneVolume /> (970) 262-1412
                </a>
              </li>
              <li className="mt-2 list-social">
                <a href="https://www.facebook.com">
                  <FaFacebookF className="m-1" />
                </a>
                <a href="https://www.instagram.com">
                  <FaInstagram className="m-1" />
                </a>
                <a href="https://www.twitter.com">
                  <FaTwitter className="m-1" />
                </a>
                <a href="https://www.linkedin.com">
                  <FaLinkedin className="m-1" />
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="col-sm-4 col-6 col-lg-3"></div> */}
          <div className="col-sm-4 col-6 col-lg-3">
            <h5 className="mt-2">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/allCourses">Courses</a>
              </li>
              <li>
                <a href="/blogs">Blog</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-6 col-lg-3"></div>
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
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
