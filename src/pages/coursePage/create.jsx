import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Buttons } from "./styled";
import "../../assets/css/courseTestPreview.css";
import { FaFileAlt, FaFolderOpen } from "react-icons/fa";
import CourseLandingPage from "./CourseLandingPage";
import Curriculam from "./Curriculam";
import Pricing from "./Pricing";
const CourseTestPreview = () => {
  const [stack, setStack] = useState(1);
  const [courseForm, setCourseForm] = useState({});
  const formHandler = (e) => {
    const { name, value } = e.target;
    const prevData = { ...courseForm };
    prevData[name] = value;
    setCourseForm(prevData);
  };

  return (
    <>
      {stack < 4 && (
        <div className="main-container">
          {stack === 1 && (
            <Row>
              <Col>
                <Container className="card m-3" onClick={() => setStack(2)}>
                  <FaFolderOpen
                    className="icons mb-3"
                    style={{ color: "black !important" }}
                  />
                  <h3 className="text">Courses</h3>
                </Container>
              </Col>
              <Col>
                <Container className="card m-3">
                  <FaFileAlt className="icons mb-3" color="#000" />
                  <h3 className="text">Tests</h3>
                </Container>
              </Col>
            </Row>
          )}
          {stack === 2 && (
            <div className="container text-center text-dark col-12 col-lg-6">
              <h4 className=" font-weight-bold mb-5">Course Title</h4>
              <Form.Group className="" controlId="formBasicC">
                <input
                  type="text"
                  className="text-box "
                  placeholder="Enter course title"
                  name="title"
                  onChange={(e) => formHandler(e)}
                />
              </Form.Group>
              <Buttons
                className="mx-5 mt-5 px-5"
                onClick={() => setStack((e) => e - 1)}
              >
                Back
              </Buttons>
              <Buttons
                className="mx-5 px-5"
                fill="true"
                onClick={() => setStack((e) => e + 1)}
              >
                Continue
              </Buttons>
            </div>
          )}
          {stack === 3 && (
            <div className="container text-center text-dark col-12 col-lg-6">
              <h4 className=" font-weight-bold mb-5">Category</h4>
              <Form.Group className="" controlId="formBasicC">
                <select
                  className="form-select py-3 border-dark"
                  placeholder="Enter course title"
                  name="category"
                  onChange={(e) => formHandler(e)}
                >
                  <option>Open this select Category</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Designing">Designing</option>
                </select>
              </Form.Group>
              <Buttons
                className="mx-5 mt-5 px-5"
                onClick={() => setStack((e) => e - 1)}
              >
                Back
              </Buttons>
              <Buttons
                className="mx-5 px-5"
                fill="true"
                onClick={() => setStack((e) => e + 1)}
              >
                Continue
              </Buttons>
            </div>
          )}
        </div>
      )}
      {stack === 4 && (
        <CourseLandingPage
          stack={stack}
          setStack={setStack}
          data={courseForm}
        />
      )}
      {stack === 5 && <Pricing stack={stack} setStack={setStack} />}
      {stack === 6 && <Curriculam />}
    </>
  );
};
export default CourseTestPreview;
