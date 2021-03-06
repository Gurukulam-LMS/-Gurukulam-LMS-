import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { CourseContext } from "../../../context/courseContext";

const Section3 = () => {
  const { userId } = useContext(AuthContext);
  const { allCourses } = useContext(CourseContext);
  const [lastWatchedId, setLastWatchedId] = useState("");

  useEffect(async () => {
    const res = await fetch(
      process.env.REACT_APP_BASE_URL + "/auth/getLastWatch/" + userId
    );
    if (res.status === 200) {
      const data = await res.json();
      setLastWatchedId(data.lastWatched.courseId);
    }
  }, []);

  const [lastCourse, setLastCourse] = useState({});
  useEffect(() => {
    const getReqCourse = allCourses?.find(
      (course) => course._id === lastWatchedId
    );
    if (!!getReqCourse) setLastCourse(getReqCourse);
  }, [allCourses, lastWatchedId]);

  return (
    <div className="container col-lg-9 col-12 section-3 mt-5">
      <div className="row">
        <div
          className="col-lg-3 col-12 mt-4"
          style={{ width: window.innerWidth > 500 ? "29%" : "100%" }}
        >
          <div>
            <div>
              <div className="d-flex mt-2">
                <h5 className="">Last Watched</h5>
              </div>
              <div className="media m1 border mt-3 ">
                <img
                  className="mr-3 img img-fluid"
                  src={lastCourse.thumbnail}
                  alt="Generic placeholder image"
                  style={{ height: "110px" }}
                />
                <div className="media-body">
                  <p>{lastCourse.title}</p>
                  <p className="rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-lg-3 col-12 mt-4"
          style={{ width: window.innerWidth > 500 ? "29%" : "100%" }}
        >
          <div>
            <div>
              <div className="d-flex mt-2">
                <h5 className="">Upcoming Course</h5>
              </div>
              <div className="media m1 border mt-3">
                <img
                  className="mr-3 img img-fluid"
                  src="dashboard/Mask Group 41.png"
                  alt="Generic placeholder image"
                />
                <div className="media-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint doloribus
                  </p>
                  <span>Lorem ipsum dolor</span>
                  <p className="rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-12 mt-4 time-process">
          <div className="card text-center">
            <div className="card-body pb-5 mt-4">
              <h4 className="mb-4">Time Spent On Learning</h4>
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <div className="row">
                <div className="time mt-4 col-12 text-center d-flex justify-content-center">
                  <div className="progress progress-bar-vertical first ">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "30%" }}
                    ></div>
                  </div>
                  <div className="progress progress-bar-vertical">
                    <div
                      className="progress-bar progress-bar-danger "
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "60%" }}
                    ></div>
                  </div>
                  <div className="progress progress-bar-vertical">
                    <div
                      className="progress-bar progress-bar-success "
                      role="progressbar"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "100%" }}
                    ></div>
                  </div>
                  <div className="progress progress-bar-vertical ">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "30%" }}
                    ></div>
                  </div>
                  <div className="progress progress-bar-vertical">
                    <div
                      className="progress-bar progress-bar-danger "
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "60%" }}
                    ></div>
                  </div>
                  <div className="progress progress-bar-vertical">
                    <div
                      className="progress-bar progress-bar-success "
                      role="progressbar"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "100%" }}
                    ></div>
                  </div>
                  <div className="progress progress-bar-vertical last ">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ height: "30%" }}
                    ></div>
                  </div>
                </div>
                <div className="col-12">
                  <input
                    type="button"
                    className="btn-pink btn btn-sm mt-4"
                    value="Weekly"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section3;
