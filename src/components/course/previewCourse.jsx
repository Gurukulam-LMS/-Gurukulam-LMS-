import { Col, Row, Container, Image, Accordion } from "react-bootstrap";
import { useContext } from "react";
import {
  FaStar,
  FaFirefoxBrowser,
  FaRupeeSign,
  FaAngleDoubleRight,
} from "react-icons/fa";

import SocialMediaShare from "../../utils/SocialMediaShare";
import { BsPlayFill } from "react-icons/bs";
import { AiFillFilePdf } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { useParams, useHistory } from "react-router";
import { CourseContext } from "../../context/courseContext";
import style from "../../assets/css/previewCourse.module.css";
import { useHttpClient } from "../../customHooks/httpHook";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import NavHeader from "../../utils/Header/index";

const PreviewCourse = () => {
  const { sendRequest } = useHttpClient();
  const { courseId } = useParams();
  const { allCourses } = useContext(CourseContext);
  const course = allCourses.find((course) => course._id === courseId);

  const { isLoggedIn, userId, cart, setCartHandler } = useContext(AuthContext);
  const isPresentInCart = cart.indexOf(courseId) !== -1;

  const history = useHistory();

  const addToCartHandler = () => {
    if (!isLoggedIn) return history.push("/signin");
    const query = userId + "=" + courseId;
    setTimeout(() => {
      sendRequest(`${process.env.REACT_APP_BASE_URL}/cart/modifyCart/${query}`)
        .then((res) => {
          if (res.ok) {
            setCartHandler(res.cart);
            toast.success(res.message, { position: "top-right" });
          } else {
            toast.warning(res.message, { position: "top-right" });
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  console.log(window.location);

  return (
    <>
      <NavHeader />
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
                  <div className={style.courseTitleHeading}>
                    {course && course.title}
                  </div>
                  <div className={style.courseTagline}>
                    {course && course.tagline}
                  </div>
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
                    <span className="mx-2" style={{ color: "#2f1a8eed" }}>
                      <BsFillBarChartFill
                        style={{ color: "#2f1a8eed", marginRight: "10px" }}
                      />
                      {course && course.level} Level
                    </span>
                    <span className="mx-2" style={{ color: "#2f1a8eed" }}>
                      <FaFirefoxBrowser
                        style={{ color: "#2f1a8eed", marginRight: "10px" }}
                      />
                      {course && course.language}
                    </span>
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
                          <FaAngleDoubleRight className={style.tickIcon} />
                        </div>
                        <div className={style.pointText}>{point}</div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={style.courseTopicContainer}>
              <div className={style.contentHeading}>Course Content</div>
              <div className={style.accorditonContainer}>
                <Accordion flush style={{ border: "none" }}>
                  {!!course &&
                    course.courseTopic.map((topic, index) => {
                      return (
                        <Accordion.Item eventKey={index} key={index}>
                          <Accordion.Header>{topic.topicname}</Accordion.Header>
                          <Accordion.Body style={{ padding: "0 1rem" }}>
                            {topic.videoUrl.map((video, idx) => {
                              return (
                                <a
                                  href={video}
                                  className={style.courseContentContainer}
                                  key={idx}
                                  target="_blank"
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
                                </a>
                              );
                            })}
                            {topic.pdfUrl.map((pdfs, id) => {
                              return (
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
            <SocialMediaShare content={course && course.title} />
          </Col>
          <Col lg={4} className="px-3">
            <div className={style.courseDetailsContainerBox}>
              <Image
                src={course && course.thumbnail}
                fluid
                style={{ width: "100%" }}
              />
              <div className={style.addCartBtnContainer}>
                <button className={style.addCartBtn} onClick={addToCartHandler}>
                  {isPresentInCart ? "REMOVE FROM CART" : "ADD TO CART"}
                </button>
              </div>
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
