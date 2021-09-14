import React, { useState } from "react";
import Header from "../../utils/Header/index";
import "../../assets/css/signin.css";
import { useHttpClient } from "../../customHooks/httpHook";
import NavHeader from "../../utils/Header/index";

const Contact = () => {
  const { sendRequest, isLoading } = useHttpClient();

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
            <h3>Contact</h3>
            <div className="row">
              <div className="col-12 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="col-12 mt-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="col-12 mt-4">
                <textarea
                  className="form-control"
                  placeholder="Feedback"
                  rows="3"
                />
              </div>

              <div className="form-group col-12 text-center mt-4">
                <button className="btn col-9 bg-btn-1">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
