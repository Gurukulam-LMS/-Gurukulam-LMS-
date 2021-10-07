import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/httpHook";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

//Callback --login with google
const OAuth = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      sendRequest(process.env.REACT_APP_BASE_URL + "/auth/getUser/" + userId)
        .then((res) => {
          if (res.ok) {
            toast.success("Logged In");
            console.log(res);
            auth.login(
              res.userId,
              res.personalInfo,
              res.educationalInfo,
              res.verification,
              res.token
            );
            history.push("/");
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <Spinner animation="border" />}
      <h2>{!userId && "Token Expired"}</h2>
    </div>
  );
};

export default OAuth;
