import React, { useState, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useHttpClient } from "../../customHook/http-hook";
import { AuthContext } from "../../context/authContext";
import style from "../../assets/css/Auth.module.css";
import { BsShieldLockFill } from "react-icons/bs";

const Auth = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { login } = useContext(AuthContext);

  const loginFormContainer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setTimeout(() => {
      sendRequest(
        process.env.REACT_APP_API_URL + "/admin/auth/login",
        "POST",
        JSON.stringify(Object.fromEntries(formData)),
        {
          "Content-Type": "application/json",
        }
      )
        .then((data) => {
          if (data.ok) {
            toast.success("Logged In!!", { position: "top-right" });
            login(data.access_token, data.Admin, data.adminId);
          } else {
            toast.error(data.message, { position: "top-right" });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Logging In failed", { position: "top-right" });
        });
    }, 1000);
  };

  return (
    <>
      <Form onSubmit={loginFormContainer} className={style.formContainer}>
        <BsShieldLockFill className={style.lockIcon} />
        <div className={style.heading}>LOGIN</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Button
            variant="primary"
            type="submit"
            style={{ margin: "auto auto" }}
          >
            Submit
          </Button>
        )}
      </Form>
    </>
  );
};

export default Auth;
