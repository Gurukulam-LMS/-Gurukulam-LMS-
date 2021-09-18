import React, { useState } from "react";
import Header from "./header";
import "../../assets/css/signin.css";
import { toast } from "react-toastify";
import { useHttpClient } from "../../customHooks/httpHook";
import { useParams, useHistory } from "react-router-dom";
import NavHeader from "../../utils/Header/index";

const ResetPassword = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  const { resetToken } = useParams();
  const [resetData, setResetData] = useState({
    password: "",
    confirmPassword: "",
  });

  const resetFormSubmit = () => {
    setTimeout(() => {
      sendRequest(
        process.env.REACT_APP_BASE_URL + "/auth/email/reset/" + resetToken,
        "POST",
        JSON.stringify(resetData),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success(res.message, { position: "top-right" });
            history.push("/signin");
          } else {
            toast.warn(res.message, { position: "top-right" });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong, Please try again", {
            position: "top-right",
          });
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
            <h3>Reset Password</h3>

            <div className="row">
              <div className="col-12 mt-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={resetData.password}
                  onChange={(e) =>
                    setResetData({ ...resetData, password: e.target.value })
                  }
                />
              </div>
              <div className="col-12 mt-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={resetData.confirmPassword}
                  onChange={(e) =>
                    setResetData({
                      ...resetData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group col-12 text-center mt-4">
                <button
                  onClick={resetFormSubmit}
                  className="btn col-9 bg-btn-1"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-mobile-app mt-5 mb-5">
        <div className="container mobile-app ">
          <div className="row">
            <div className="col-sm-12 col-lg-6 mt-3 mb-1 mt-sm-3 mb-sm-1 mt-lg-5 mb-lg-5 ">
              <h6>Ready To Start?</h6>
              <h2>
                Download our mobile App. <br /> For easy to start your course.
              </h2>
            </div>
            <div className="col-sm-12 col-lg-6 mt-2 mb-lg-5 mb-lg-5 mb-3 mt-sm-1 mb-sm-3  app text-center">
              <img
                src="Images-2/Daco_4456525.png"
                className="img img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
