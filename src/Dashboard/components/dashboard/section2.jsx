import { CourseContext } from "../../../context/courseContext";
import { useContext } from "react";
import { useHistory } from "react-router";
const Section2 = () => {
  const { allCourses } = useContext(CourseContext);
  const history = useHistory();
  return (
    <div className="container col-12 col-lg-9 section-2">
      <div className="row">
        <div className="col-lg-7 col-12 section-left  mt-5">
          <div className="d-flex ">
            <h5 className="">Top Course</h5>
            <a
              type="button"
              className="btn btn-sm ml-auto btn-pink"
              href="/allCourses"
            >
              See All
            </a>
          </div>
          <div className="row ">
            {allCourses.map((course, idx) => {
              if (idx > 1) return;
              return (
                <a
                  className="col-lg-6 col-12 mt-lg-3 mt-4"
                  key={idx}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  href={"/previewCourse/" + course._id}
                >
                  <div className="media m1 border">
                    <img
                      className="mr-3 img img-fluid"
                      src={course.thumbnail}
                      alt="Generic placeholder image"
                      style={{ height: "110px" }}
                    />
                    <div className="media-body">
                      <p>{course.title}</p>

                      <p className="rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="col-lg-5 col-12 test mt-5">
          <div className="card c2 ">
            <div className="card-body">
              <div className="d-flex ">
                <h6 className="">Test Series</h6>
                <input
                  type="button"
                  className="btn btn-sm ml-auto btn-pink"
                  value="See All"
                />
              </div>
              <div className="row mt-2">
                <div className="col-8">
                  <ul className="list-group">
                    <li>
                      <span className="far fa-file-alt mr-3"></span> Lorem ipsum
                      dolor sit
                    </li>
                    <li>
                      <span className="far fa-file-alt mr-3"></span> Lorem ipsum
                      dolor sit
                    </li>
                    <li>
                      <span className="far fa-file-alt mr-3"></span> Lorem ipsum
                      dolor sit
                    </li>
                  </ul>
                </div>
                <div className="col-4">
                  <img
                    src="dashboard/Group 253.png"
                    className="img img-fluid img-test"
                    alt=""
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
export default Section2;
