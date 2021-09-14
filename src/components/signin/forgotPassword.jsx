import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHttpClient } from "../../customHooks/httpHook";

const ForgotPasswordModal = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const { sendRequest, isLoading } = useHttpClient();
  const forgotFormSubmit = () => {
    setTimeout(() => {
      sendRequest(
        process.env.REACT_APP_BASE_URL + "/auth/email/forgot",
        "POST",
        JSON.stringify({ email }),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success(res.message, { position: "top-right" });
            setShow(false);
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
    }, 500);
  };
  return (
    <>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={() => setShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-3" controlId="">
            <Form.Label>Enter your email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <Button className="form-control" onClick={forgotFormSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ForgotPasswordModal;
