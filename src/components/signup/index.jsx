import React, { useRef } from "react";
import Header from "./header";
import "../../assets/css/signup.css";
import { useHttpClient } from "../../customHooks/httpHook";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { FaGooglePlay } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import NavHeader from "../../utils/Header/index";

const Signup = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const reRef = useRef();

  const registerFormSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const token = await reRef.current.executeAsync();
      reRef.current.reset();
      formData.append("token", token);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      sendRequest(
        `${process.env.REACT_APP_BASE_URL}/auth/signup`,
        "POST",
        JSON.stringify(Object.fromEntries(formData)),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success(res.message, {
              position: "top-right",
            });
          } else {
            toast.warn(res.message, {
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Registration Failed", {
            position: "top-right",
            hideProgressBar: true,
            transition: "zoom",
          });
        });
    }, 1000);
  };

  return (
    <>
      <NavHeader />
      <Header />
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={reRef}
      />
      <div className="container  login">
        <div className="row cards border p-3 p-lg-0">
          <div className="col-lg-6 d-none d-lg-block bg-login text-center">
            <h1>WELCOME TO GURUKULAM</h1>
          </div>
          <div className="col-12 col-lg-6 p-1 p-lg-5 login-form ">
            <h3>
              Register <span>Now</span>
            </h3>
            <div className="row">
              <form onSubmit={registerFormSubmitHandler}>
                <div className="col-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                  />
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                  />
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="Email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                </div>
                <div className="form-group col-12 text-center mt-4">
                  {isLoading ? (
                    <Spinner animation="border" />
                  ) : (
                    <button type="submit" className="btn col-9 bg-btn-1">
                      Signup
                    </button>
                  )}
                </div>
                <div className="form-group col-12 text-center">
                  <button
                    type="submit"
                    className="btn col-9 bg-btn-2 text-success"
                  >
                    <FaGooglePlay className="m-2" />
                    Continue With Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
