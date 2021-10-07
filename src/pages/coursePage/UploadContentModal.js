import React, { useContext, useState } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";
import style from "../../assets/css/UploadContentModal.module.css";
import { useHttpClient } from "../../customHook/http-hook";
import { CourseContext } from "../../context/courseContext";
import { toast } from "react-toastify";

const UploadContentModal = (props) => {
  const { lastCourseDetails, setlastCourseDetails } = useContext(CourseContext);
  const { sendRequest, isLoading } = useHttpClient();

  const [files, setFiles] = useState([]);
  const [topicName, setTopicName] = useState("");

  const courseTopicSubmitHandler = () => {
    setTimeout(() => {
      const formData = new FormData();
      formData.append("topicname", topicName);

      for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < files[i].length; j++) {
          formData.append("videoFile", files[i][j]);
        }
      }
      sendRequest(
        process.env.REACT_APP_API_URL +
          "/admin/creator/videoUpload/" +
          lastCourseDetails._id,
        "POST",
        formData
      )
        .then((res) => {
          if (res.status === 200) {
            setFiles([]);
            setlastCourseDetails(res);
            props.onHide();
            toast.success("Topic Uploaded", { position: "top-right" });
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

export default UploadContentModal;
