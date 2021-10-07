import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavHeader from "../../utils/Header/index";

//Context
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/httpHook";

const ConfirmEmail = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  const { id } = useParams();

  //States
  const [userId, setUserId] = useState(id);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    sendRequest(`${process.env.REACT_APP_BASE_URL}/auth/email/confirm/${id}`)
      .then((res) => {
        if (res.ok) {
          setSuccessMessage(res.message);
          toast.success(res.message, { position: "top-right" });

          auth.login(
            res.userId,
            res.personalInfo,
            res.educationalInfo,
            res.verification,
            res.token
          );

          history.push("/onboarding");
        } else {
          setErrorMessage(res.message);
          toast.warn(res.message, { position: "top-right" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Something went wrong");
        toast.error("Something went wrong", {
          position: "top-center",
        });
        setUserId(null);
      });
  }, [userId]);

  return (
    <>
      <NavHeader />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isLoading && <Spinner animation="border" variant="primary" />}
        <h3>{!!successMessage ? successMessage : errorMessage}</h3>
      </div>
    </>
  );
};

export default ConfirmEmail;
