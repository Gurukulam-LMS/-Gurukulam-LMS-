import React, { useState, useContext, useEffect } from "react";
import style from "../../assets/css/coursePlayer.module.css";
import { CourseContext } from "../../context/courseContext";
import { Accordion } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import { AiFillFilePdf } from "react-icons/ai";
import NavHeader from "../../utils/Header/index";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
// import { useHistory } from "react-router-dom";
import TimeMe from "timeme.js";
import { useHttpClient } from "../../customHooks/httpHook";
import { AuthContext } from "../../context/authContext";
import { useBeforeunload } from "react-beforeunload";
// import { useHistory } from "react-router-dom";

const CoursePlayer = () => {
  const { sendRequest } = useHttpClient();
  const { userId } = useContext(AuthContext);
  const { courseId } = useParams();
  const { allCourses } = useContext(CourseContext);
  const [course, setCourse] = useState({});
  const [currVideo, setCurrVideo] = useState(null);
  const [firstVideo, setFirstVideo] = useState(null);
  const [currIdx, setCurrIdx] = useState(0 + " " + 0);

  //sending userWatchtime for analytics
  TimeMe.initialize({
    currentPage: window.location.pathname,
    idleTimeoutInSeconds: 300,
  });
  useBeforeunload((e) => {
    const data = {
      userId: userId,
      courseId: courseId,
      timeSpent: TimeMe.getTimeOnCurrentPageInSeconds() / 60.0,
    };
    sendRequest(
      process.env.REACT_APP_ADMIN_URL + "/analytics/studentWatchTime",
      "POST",
      JSON.stringify(data),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    const getCourse = allCourses.find((course) => course._id === courseId);
    if (!!getCourse) {
      setCourse(getCourse);
      setFirstVideo(getCourse.courseTopic[0].videoUrl[0]);
    }
  }, [allCourses]);

  const [playing, setPlaying] = React.useState(false);

  return (
    <>
      <NavHeader />
      <div className={style.container}>
        <div className={style.leftContainer}>
          <div className={style.videoContainer}>
            <ReactPlayer
              url={currVideo || firstVideo}
              controls
              playing={playing}
              width="100%"
              height="100%"
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          {/* <div className={style.courseAbout}>
            <div className={style.heading}>About the course</div>
            <div className={style.courseDesp}>{course.description}</div>
          </div> */}
        </div>
        <div className={style.rightContainer}>
          <div className={style.heading}>Course Content</div>
          <Accordion
            defaultActiveKey="0"
            style={{ border: "none", margin: "10px" }}
          >
            {!!course.courseTopic &&
              course.courseTopic.map((topic, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{topic.topicname}</Accordion.Header>
                    <Accordion.Body style={{ padding: "0 1rem" }}>
                      {topic.videoUrl.map((video, idx) => {
                        return (
                          <div
                            className={style.courseContentContainer}
                            key={idx}
                            onClick={() => {
                              setCurrVideo(video);
                              setCurrIdx(index + " " + idx);
                            }}
                            style={{
                              backgroundColor:
                                currIdx === index + " " + idx
                                  ? "wheat"
                                  : "white",
                            }}
                          >
                            <div className={style.courseContent}>
                              <BsPlayFill
                                style={{
                                  fontSize: "1rem",
                                }}
                              />
                              <div className={style.courseContentTitle}>
                                Video Content {idx + 1}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {topic.pdfUrl.map((pdfs, id) => {
                        return (
                          <a
                            href={pdfs}
                            target="_blank"
                            key={id}
                            style={{ textDecoration: "none" }}
                          >
                            <div className={style.courseContentContainer}>
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
                            </div>
                          </a>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
          {/* <div className={style.courseAboutSec}>
            <div className={style.heading}>About the course</div>
            <div className={style.courseDesp}>{course.description}</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CoursePlayer;
