import "../../assets/css/mycourse.css";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import style from "../../../assets/css/home.module.css";
import { FaRupeeSign } from "react-icons/fa";

const MyCourse = () => {
  const { myCourses } = useContext(AuthContext);
  console.log(myCourses);

  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };
  return (
    <>
      <div class="container sub-nav col-12 col-lg-9">
        <div class="row">
          <div class="col-10">
            <div class="row">
              <div class="col-12 col-lg-4 mt-2">
                <form class="form-inline">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <span class="fa fa-search"></span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-4 col-lg-2 mt-2">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Subject
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      UI/UX Designer
                    </a>
                    <a class="dropdown-item" href="#">
                      Development
                    </a>
                    <a class="dropdown-item" href="#">
                      Data Science
                    </a>
                    <a class="dropdown-item" href="#">
                      Business
                    </a>
                    <a class="dropdown-item" href="#">
                      Financial
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4 col-lg-2 mt-2">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Level
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Introductory
                    </a>
                    <a class="dropdown-item" href="#">
                      Intermediate
                    </a>
                    <a class="dropdown-item" href="#">
                      Advanced
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-3 col-lg-2 mt-2">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Avilability
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Availavle Now
                    </a>
                    <a class="dropdown-item" href="#">
                      Upcoming
                    </a>
                    <a class="dropdown-item" href="#">
                      Advanced
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-2 mb-4 course-list col-lg-9 col-12 ">
        <div class="row">
          {myCourses &&
            myCourses.map &&
            myCourses.map((course, index) => (
              <a
                href={"/coursePlayer/" + course._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="col-md-6 col-lg-4 mt-5 courseCard"
                  key={course._id}
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
                              </span>
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
                            index % 2 == 1 ? "card-btn-red" : "card-btn-blue"
                          } `}
                        >
                          View Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyCourse;
