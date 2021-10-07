import React, { useState, useContext, useEffect } from "react";
import "../../assets/css/Curriculum.css";
import { CourseContext } from "../../context/courseContext";
import { BsPlayFill } from "react-icons/bs";
import { AiFillFileText, AiFillFilePdf } from "react-icons/ai";
import { useParams } from "react-router";
import style from "../../assets/css/courseTopic.module.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import TopicNameModal from "./TopicNameModal";
import TopicContentModal from "./TopicContentModal";
import NewTopicModal from "./NewTopicModal";
import { useHttpClient } from "../../customHook/http-hook";
import { toast } from "react-toastify";

const CourseTopic = () => {
  const { allCourses } = useContext(CourseContext);
  const { sendRequest, isLoading } = useHttpClient();

  const [topicId, setTopicId] = useState(null);
  const { courseId } = useParams();
  const [courseTopics, setCourseTopics] = useState([]);

  const [showUploadModal, setUploadModal] = useState(false);
  const modalOpenHandler = () => setUploadModal(true);

  const [showTopicNameModal, setTopicNameModal] = useState(false);
  const topicNameModalHandler = (id) => {
    setTopicId(id);
    setTopicNameModal(true);
  };

  const [showTopicContentModal, setTopicContentModal] = useState(false);
  const topicContentModalHandler = (id) => {
    setTopicContentModal(true);
    setTopicId(id);
  };

  useEffect(() => {
    const reqCourse = allCourses.find(
      (courseData) => courseData._id === courseId
    );
    if (reqCourse) {
      setCourseTopics(reqCourse.courseTopic);
    }
  }, [allCourses]);

  const deleteTopicHandler = (topicId) => {
    setTimeout(() => {
      const query = courseId + "=" + topicId;
      sendRequest(
        process.env.REACT_APP_API_URL + "/admin/course/deleteTopic/" + query
      )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.message);
            setCourseTopics(res.topics);
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  const topicContentDeleteHandler = (query) => {
    setTimeout(() => {
      const data = courseId + "=" + query;
      sendRequest(
        process.env.REACT_APP_API_URL +
          "/admin/course/deleteTopicContent/" +
          data
      )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.message);
            setCourseTopics(res.topics);
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  const topicUpdateHandler = (data) => setCourseTopics(data);

  return (
    <>
      <TopicContentModal
        show={showTopicContentModal}
        onHide={() => {
          setTopicContentModal(false);
          setTopicId(null);
        }}
        courseId={courseId}
        topicId={topicId}
        topicupdatehandler={(data) => topicUpdateHandler(data)}
      />
      <TopicNameModal
        show={showTopicNameModal}
        onHide={() => {
          setTopicNameModal(false);
          setTopicId(null);
        }}
        courseId={courseId}
        topicId={topicId}
        topicupdatehandler={(data) => topicUpdateHandler(data)}
      />
      <NewTopicModal
        show={showUploadModal}
        onHide={() => setUploadModal(false)}
        courseId={courseId}
        topicupdatehandler={(data) => topicUpdateHandler(data)}
      />
      <div className="curriculum-area">
        <div className="curriculum">
          <div className={style.boxArea}>
            <h3>Course Topic Update</h3>
            <div className="c-area-inside">
              {courseTopics &&
                courseTopics.map((topic, idx) => {
                  return (
                    <>
                      <div className={style.sections} key={idx}>
                        <div className="introduction">
                          <div className={style.topicHeadingContainer}>
                            <div className={style.topicIndex}>
                              Topic {idx + 1}
                            </div>
                            <button
                              className={style.deleteTopicBtn}
                              onClick={() => deleteTopicHandler(topic._id)}
                            >
                              Delete Topic
                            </button>
                          </div>
                          <div className="curriculam-lectures">
                            <AiFillFileText
                              style={{
                                fontSize: "1.5rem",
                                color: "#7e64d3",
                              }}
                            />
                            <div className="topic-name-heading">
                              {topic.topicname}
                            </div>
                          </div>
                          {topic.videoUrl.length != 0 && (
                            <div className="content-type-heading">
                              Video Contents
                            </div>
                          )}
                          <div className="course-contents">
                            {topic.videoUrl.map((video, index) => {
                              return (
                                <div className={style.contentContainer}>
                                  <a
                                    href={video}
                                    className={style.courseContentContainer}
                                    key={index}
                                    target="_blank"
                                  >
                                    <div className={style.courseContent}>
                                      <BsPlayFill
                                        style={{
                                          fontSize: "1rem",
                                        }}
                                      />
                                      <div className={style.courseContentTitle}>
                                        Video Content {index + 1}
                                      </div>
                                    </div>
                                  </a>
                                  <RiDeleteBin2Fill
                                    className={style.deleteContentIcon}
                                    onClick={() => {
                                      const query =
                                        topic._id + "=" + index + "=" + "video";
                                      topicContentDeleteHandler(query);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          {topic.pdfUrl.length != 0 && (
                            <div className="content-type-heading">
                              Pdf Contents
                            </div>
                          )}
                          <div className="course-contents">
                            {topic.pdfUrl.map((pdfs, id) => {
                              return (
                                <div className={style.contentContainer}>
                                  <a
                                    href={pdfs}
                                    className={style.courseContentContainer}
                                    target="_blank"
                                    key={id}
                                  >
                                    <div
                                      className={style.courseContent}
                                      style={{ color: "maroon" }}
                                    >
                                      <AiFillFilePdf
                                        style={{
                                          fontSize: "1rem",
                                        }}
                                      />
                                      <div className={style.courseContentTitle}>
                                        Pdf Content {id + 1}
                                      </div>
                                    </div>
                                  </a>
                                  <RiDeleteBin2Fill
                                    className={style.deleteContentIcon}
                                    onClick={() => {
                                      const query =
                                        topic._id + "=" + id + "=" + "pdf";
                                      topicContentDeleteHandler(query);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <button
                            className="curriculum-buttons"
                            onClick={() => topicNameModalHandler(topic._id)}
                          >
                            Change Topic Name
                          </button>
                          <button
                            className="curriculum-buttons"
                            onClick={() => topicContentModalHandler(topic._id)}
                          >
                            <i
                              class="fas fa-plus"
                              style={{ color: "black", marginRight: "15px" }}
                            ></i>
                            Upload Content
                          </button>
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
};

export default CourseTopic;
