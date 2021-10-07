import React, { useState } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";
import style from "../../assets/css/UploadContentModal.module.css";
import { useHttpClient } from "../../customHook/http-hook";
import { toast } from "react-toastify";

const TopicContentModal = (props) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [files, setFiles] = useState([]);

  const courseTopicSubmitHandler = () => {
    setTimeout(() => {
      const formData = new FormData();
      formData.append("courseId", props.courseId);
      formData.append("topicId", props.topicId);
      for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < files[i].length; j++) {
          formData.append("videoFile", files[i][j]);
        }
      }
      sendRequest(
        process.env.REACT_APP_API_URL + "/admin/course/updateTopicContent/",
        "POST",
        formData
      )
        .then((res) => {
          if (res.status === 201) {
            setFiles([]);
            props.onHide();
            toast.success("Topic Uploaded", { position: "top-right" });
            props.topicupdatehandler(res.topics);
          }
        })
        .catch((err) => {
          setFiles([]);
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
          UPLOAD CONTENT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label style={{ color: "black", fontSize: "1.3rem" }}>
            Upload Lectures
          </Form.Label>
          <Form.Control
            type="file"
            size="lg"
            onChange={(e) => setFiles((prev) => [...prev, e.target.files])}
            style={{ backgroundColor: "white" }}
            multiple
            accept=".mp4, .mkv"
          />
        </Form.Group>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label style={{ color: "black", fontSize: "1.3rem" }}>
            Upload PDFs
          </Form.Label>
          <Form.Control
            type="file"
            size="lg"
            onChange={(e) => setFiles((prev) => [...prev, e.target.files])}
            style={{ backgroundColor: "white" }}
            multiple
            accept=".pdf"
          />
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

export default TopicContentModal;
