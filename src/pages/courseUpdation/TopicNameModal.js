import React, { useState } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";
import style from "../../assets/css/UploadContentModal.module.css";
import { useHttpClient } from "../../customHook/http-hook";
import { toast } from "react-toastify";

const TopicNameModal = (props) => {
  const { sendRequest, isLoading } = useHttpClient();

  const [topicName, setTopicName] = useState("");

  const courseTopicSubmitHandler = () => {
    setTimeout(() => {
      const data = {
        courseId: props.courseId,
        topicId: props.topicId,
        topicName: topicName,
      };
      sendRequest(
        process.env.REACT_APP_API_URL + "/admin/course/updateTopicName",
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.status === 201) {
            props.onHide();
            toast.success(res.message);
            props.topicupdatehandler(res.topics);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          CHANGE TOPIC NAME
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ width: "50%" }}
        >
          <Form.Label style={{ color: "black", fontSize: "1.3rem" }}>
            Topic Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Topic Name"
            style={{ padding: "10px" }}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <br />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <button
            onClick={props.onHide}
            className={style.button}
            onClick={courseTopicSubmitHandler}
          >
            Save
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TopicNameModal;
