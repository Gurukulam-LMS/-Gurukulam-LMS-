import { useContext } from "react";
import { CourseContext } from "../../context/courseContext";
import { useHistory } from "react-router";
import { FaRupeeSign } from "react-icons/fa";
import style from "../../assets/css/home.module.css";

const Courses = () => {
  const { allCourses } = useContext(CourseContext);
  console.log(allCourses);
  const history = useHistory();

  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mt-4 mb-4 course-list col-lg-9 col-12">
      <div class="row  pt-5 pb-5 mt-5 mb-5">
        <div class="col-12 text-center">
          <h1>
            All Couses Of <span class="s3"> Gurukulam</span>
          </h1>
        </div>
        <div class="col-12 text-center mt-5 navigationContainer">
          <nav aria-label="Page navigation example">
            <ul class="pagination ">
              <li class="page-item disabled ml-auto arrow-next">
                <a class="page-link" href="#" tabindex="-1">
                  <span class="fas fa-chevron-left"></span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link active" href="#">
                  UI/UX Designer
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Development
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Data Science
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Business
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Finance
                </a>
              </li>
              <li class="page-item mr-auto arrow-pre">
                <a class="page-link" href="#">
                  <span class="fas fa-chevron-right"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {allCourses.map((course, index) => (
          <div
            className="col-md-6 col-lg-4 mt-5 courseCard"
            key={course._id}
            onClick={() => history.push("/previewCourse/" + course._id)}
          >
            <div className=""></div>
            <div className="card card-1">
              <div
                className="card-head"
                style={{ backgroundImage: `url("${course.thumbnail}")` }}
              ></div>
              <div className="card-body">
                <h5 className={style.courseHeader}>
                  <span
                    className={`badge badge-red ${
                      index % 2 == 0 ? "badge-red" : "badge-blue"
                    }`}
                  >
                    {course.category[0]}
                  </span>
                  <span
                    className={`badge badge-red ${
                      index % 2 == 1 ? "badge-red" : "badge-blue"
                    }`}
                  >
                    {course.tag || "Best Seller"}
                  </span>
                </h5>

                <div className="pt-3 pl-2 pr-2">
                  <h4 className="txt-2">{course.title}</h4>
                  <p>
                    <span className="time">
                      <i className="far fa-clock"></i>{" "}
                      <span className={style.courseUpdatedCont}>
                        Updated
                        <span className={style.courseDate}>
                          {dateHandler(course.updatedAt)}
                        </span>{" "}
                      </span>
                    </span>
                    <span className="lectures">
                      <i className="fas fa-book-open"></i>
                      <span className={style.topicLength}>
                        {course.courseTopic && course.courseTopic.length}{" "}
                        lectures
                      </span>
                    </span>
                  </p>
                  <button
                    type="button"
                    className={`btn col-12 mt-3 mb-3 card-btn-red ${
                      index % 2 == 0 ? "card-btn-red" : "card-btn-blue"
                    } `}
                  >
                    <span className="rate pl-3 coursePrice">
                      <FaRupeeSign style={{ fontSize: "0.8rem" }} />
                      <span>{course.price}</span>
                    </span>
                    <span className="star pr-3">
                      <span className={style.rating}>4.8</span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                    </span>
                  </button>
                  {/* <button
                    type="button"
                    className={`btn col-12 mt-3 mb-3 card-btn-red ${
                      index % 2 == 1 ? "card-btn-red" : "card-btn-blue"
                    } `}
                    onClick={() => history.push("/previewCourse/" + course._id)}
                  >
                    View Course
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-12 text-center">
          <button type="button" className="btn col-lg-3 col-9 btn-view-more">
            View More Courses
          </button>
        </div>
      </div>
    </div>
  );
};
export default Courses;
