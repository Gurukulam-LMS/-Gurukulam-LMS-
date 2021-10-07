import { Col, Row, Container, Image, Accordion } from "react-bootstrap";
import { useContext } from "react";

import { FaStar, FaFirefoxBrowser, FaRupeeSign } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { AiFillFilePdf, AiOutlineDoubleRight } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { useParams } from "react-router";
import { CourseContext } from "../../context/courseContext";
import style from "../../assets/css/previewCourse.module.css";
import { useHistory } from "react-router";

const PreviewCourse = () => {
  const { courseId } = useParams();
  const { allCourses } = useContext(CourseContext);
  const course = allCourses.find((course) => course._id === courseId);
  const history = useHistory();
  return (
    <>
      <header className="header">
        <div
          className="head pt-sm-5 "
          style={{
            backgroundImage: `url("/Images/3.png")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="container-fluid pb-5">
            <div className="container">
              <div className="row ">
                <div className="col-lg-6 col-sm-8 col-11 head-1 mt-lg-5 mt-4 text-left">
                  <h1 className="pt-sm-4 pl-lg-2 pl-sm-1 ">
                    {course && course.title}
                  </h1>
                  <p className="pl-lg-2 pl-sm-1">{course && course.tagline}</p>
                  <FaStar color="gold" size={22} />
                  <FaStar color="gold" size={22} />
                  <FaStar color="gold" size={22} />
                  <FaStar color="gold" size={22} />
                  <FaStar color="white" size={22} /> (1235 Rating)
                  <br />
                  <div
                    className="mt-3"
                    style={{ fontSize: "large", color: "#96d6fc" }}
                  >
                    <span className="mx-2">
                      <BsFillBarChartFill className="mx-2" />
                      {course && course.level} Level
                    </span>

                    <span className="mx-2">
                      <FaFirefoxBrowser className="mx-2" />
                      {course && course.language}
                    </span>
                    <br />
                    <br />
                    <div
                      className={style.updateBtn}
                      onClick={() =>
                        history.push("/update/courseDetails/" + courseId)
                      }
                    >
                      UPDATE COURSE DETAILS
                    </div>
                    <div
                      className={style.updateBtn}
                      onClick={() =>
                        history.push("/update/courseTopics/" + courseId)
                      }
                    >
                      UPDATE COURSE TOPIC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Container className="" style={{ marginTop: "5em" }}>
        <Row className="mt-5">
          <Col lg={8} className="mb-4">
            <div className={style.whatLearn}>
              <h3 className="mt-2">What You'll learn</h3>
              <ul className="mt-3 p-5 py-3">
                {course &&
                  course.keyPoints.map((point, idx) => {
                    return (
                      <li className={style.keyPoint} key={idx}>
                        <div className={style.iconContainer}>
                          <AiOutlineDoubleRight className={style.tickIcon} />
                        </div>
                        <div className={style.keyPointText}>{point}</div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={style.courseTopicContainer}>
              <div className={style.contentHeading}>Course Content</div>
              <div className={style.accorditonContainer}>
                <Accordion flush>
                  {course &&
                    course.courseTopic.map((topic, index) => {
                      return (
                        <Accordion.Item eventKey={index} key={index}>
                          <Accordion.Header>{topic.topicname}</Accordion.Header>
                          <Accordion.Body>
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
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                </Accordion>
              </div>
            </div>
            <div
              style={{ borderBottom: "2px black solid" }}
              className="my-4 p-4"
            >
              <h2>About the course</h2>
              <p className="mt-4 p-2">{course && course.description}</p>
            </div>
          </Col>
          <Col lg={4} className="px-3">
            <div className="border border-secondary courseDetailsContainerBox">
              <Image
                src={course && course.thumbnail}
                fluid
                style={{ width: "100%" }}
              />
              <div className={style.coursePriceContainer}>
                <FaRupeeSign style={{ fontSize: "28px" }} />
                <span className={style.coursePrice}>
                  {course && course.price}
                </span>
              </div>
              <div className={style.courseDetails}>
                <h5>Course include :</h5>
                <p className={style.courseDetailslist}>
                  {course && course.courseTopic.length} lectures
                </p>
                <p className={style.courseDetailslist}>12 Assignment</p>
                <p className={style.courseDetailslist}>6 Articles</p>
                <p className={style.courseDetailslist}>
                  Certificate of completion
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PreviewCourse;
