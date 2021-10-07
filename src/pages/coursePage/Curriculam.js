import React, { useState, useContext } from "react";
import "../../assets/css/Curriculum.css";
import { Link } from "react-router-dom";
import UploadContentModal from "./UploadContentModal";
import { CourseContext } from "../../context/courseContext";
import { BsPlayFill } from "react-icons/bs";
import { AiFillFileText, AiFillFilePdf } from "react-icons/ai";

function Curriculam() {
  const [showUploadModal, setUploadModal] = useState(false);
  const modalOpenHandler = () => setUploadModal(true);
  const { lastCourseDetails } = useContext(CourseContext);

  return (
    <>
      <UploadContentModal
        show={showUploadModal}
        onHide={() => setUploadModal(false)}
      />
      <div className="curriculum-area">
        <div className="curriculum">
          <div className="c-area radios">
            <div className="radio-input">
              <Link to={"#"}>
                <input type="radio" value="CourseLandingPage" name="course" />
              </Link>
              <label>Course Landing Page</label>
            </div>
            <div className="radio-input">
              <Link to={"#"}>
                <input type="radio" value="Pricing" name="course" />
              </Link>
              <label>Pricing</label>
            </div>
            <div className="radio-input">
              <Link to={"#"}>
                <input checked type="radio" value="Curriculam" name="course" />
              </Link>
              <label>Curriculam</label>
            </div>
          </div>

          <div className="c-area box-area">
            <h3>Curriculam</h3>
            <div className="c-area-inside">
              {!!lastCourseDetails.courseTopic &&
                lastCourseDetails.courseTopic.map &&
                lastCourseDetails.courseTopic.map((topic, idx) => {
                  return (
                    <>
                      <div className="sections" key={idx}>
                        <div className="introduction">
                          <div className="content-topics-heading">
                            Topic {idx + 1}
                          </div>
                          <div className="curriculam-lectures">
                            <AiFillFileText
                              style={{
                                fontSize: "1.5rem",
                                transform: "rotate(360deg)",
                                color: "#7e64d3",
                              }}
                            />
                            <div className="topic-name-heading">
                              {topic.topicname}
                            </div>
                          </div>
                          <div className="content-type-heading">
                            Video Contents
                          </div>
                          <div className="course-contents">
                            {topic.videoUrl.map((video, index) => {
                              return (
                                <a
                                  href={video}
                                  className="course-content-container"
                                  key={index}
                                  target="_blank"
                                >
                                  <div className="course-content">
                                    <BsPlayFill
                                      style={{
                                        fontSize: "1rem",
                                        transform: "rotate(360deg)",
                                      }}
                                    />
                                    <div className="course-content-title">
                                      Video Content {index + 1}
                                    </div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                          <div className="content-type-heading">
                            Pdf Contents
                          </div>
                          <div className="course-contents">
                            {topic.pdfUrl.map((pdfs, id) => {
                              return (
                                <a
                                  href={pdfs}
                                  className="course-content-container"
                                  target="_blank"
                                  key={id}
                                >
                                  <div
                                    className="course-content"
                                    style={{ color: "maroon" }}
                                  >
                                    <AiFillFilePdf
                                      style={{
                                        fontSize: "1rem",
                                        transform: "rotate(360deg)",
                                      }}
                                    />
                                    <div className="course-content-title">
                                      Pdf Content {id + 1}
                                    </div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          {/* <button className="curriculum-buttons">
                            Upload Content
                          </button>
                          <button className="curriculum-buttons">
                            <i
                              class="fas fa-plus"
                              style={{ color: "black", marginRight: "15px" }}
                            ></i>
                            Add Description
                          </button> */}
                        </div>
                      </div>
                      <br />
                    </>
                  );
                })}
              <button className="add-section" onClick={modalOpenHandler}>
                <i
                  class="fas fa-plus"
                  style={{ color: "white", marginRight: "15px" }}
                ></i>
                Add Section
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Curriculam;
