import React, { useState, useRef } from "react";
import Header from "../../utils/Header/index";
import "../../assets/css/signin.css";
import { useHttpClient } from "../../customHooks/httpHook";
import NavHeader from "../../utils/Header/index";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const EducatorContact = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const reRef = useRef();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const prevData = { ...formData };
    prevData[name] = value;
    setFormData(prevData);
  };

  const formSubmitHandler = () => {
    setTimeout(async () => {
      const token = await reRef.current.executeAsync();
      reRef.current.reset();
      sendRequest(
        process.env.REACT_APP_BASE_URL + "/contact",
        "POST",
        JSON.stringify({ ...formData, token }),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }, 1000);
  };

  return (
    <>
      <NavHeader />
      <Header />
      <div className="container  login">
        <div className="row cards border justify-content-center">
          <div className="col-lg-6 d-none d-lg-block bg-login text-center">
            <h1>WELCOME TO GURUKULAM</h1>
          </div>
          <div className="col-12 col-lg-6 p-lg-5 p-5 login-form ">
            <h3>Educator Contact</h3>
            <div className="row">
              <div className="col-12 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-12 mt-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-12 mt-4">
                <textarea
                  className="form-control"
                  placeholder="Feedback"
                  rows="3"
                  name="description"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group col-12 text-center mt-4">
                <button
                  className="btn col-9 bg-btn-1"
                  onClick={formSubmitHandler}
                >
                  Send
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
    </>
  );
};
export default EducatorContact;
