import React, { useState, useContext, useRef } from "react";
import Header from "./header";
import "../../assets/css/signin.css";
import ForgotPasswordModal from "./forgotPassword";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/httpHook";
import { FaGooglePlay } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import NavHeader from "../../utils/Header/index";

const Signin = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const reRef = useRef();

  const loginFormSubmit = async () => {
    try {
      const token = await reRef.current.executeAsync();
      reRef.current.reset();
      const res = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        "POST",
        JSON.stringify({ ...loginData, token }),
        {
          "Content-Type": "application/json",
        }
      );
      if (res.ok) {
        toast.success(res.message, { position: "top-right" });
        login(
          res.userId,
          res.personalInfo,
          res.educationalInfo,
          res.verification,
          res.token
        );
        history.push("/");
      } else {
        toast.warning(res.message, { position: "top-right" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { position: "top-right" });
    }
  };

  return (
    <>
      <NavHeader />
      <Header />
      <div className="container  login ">
        <div className="row cards border justify-content-center p-3 p-lg-0">
          <div className="col-lg-6 d-none d-lg-block bg-login text-center">
            <h1>WELCOME TO GURUKULAM</h1>
          </div>
          <div className="col-12 col-lg-6 p-2 p-lg-5 login-form">
            <h3>
              Login <span>Now</span>
            </h3>

            <div className="row">
              <div className="col-12 mt-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Username or Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="col-12 mt-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder=" Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              <div className="col-12 mt-2 justify-content-end d-flex">
                <button
                  className="bg-white border-0 text-primary"
                  onClick={() => setShowForgotPassword(true)}
                >
                  forgot password?
                </button>
              </div>
              <div className="form-group col-12 text-center mt-4">
                {isLoading ? (
                  <Spinner animation="border" />
                ) : (
                  <button
                    onClick={loginFormSubmit}
                    className="btn col-9 bg-btn-1"
                  >
                    Login
                  </button>
                )}
              </div>
              <div className="form-group col-12 text-center">
                <button className="btn col-9 bg-btn-2 text-success">
                  <FaGooglePlay className="m-2" /> Login With Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={reRef}
      />

      <ForgotPasswordModal
        show={showForgotPassword}
        setShow={setShowForgotPassword}
      />
    </>
  );
};
export default Signin;
