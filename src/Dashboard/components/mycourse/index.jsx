import "../../assets/css/mycourse.css";
import { AuthContext } from "../../../context/authContext";
import { useContext, useState } from "react";
import style from "../../../assets/css/home.module.css";
import NavHeader from "../../utils/Header/index";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

const AllCourses = () => {
  const auth = useContext(AuthContext);
  const allCourses = auth.myCourses;

  const [courses, setCourses] = useState([]);
  const [level, setLevel] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCourses(allCourses);
    const set = new Set();
    allCourses.forEach((course) => {
      course?.category?.map((cat) => {
        set.add(cat);
      });
    });
    setAllCategory([...set]);
  }, [allCourses]);

  useEffect(() => {
    // setLevel("");
    if (category === "") return setCourses(allCourses);
    const courseFilter = allCourses?.filter(
      (course) => !!course.category && course.category[0] === category
    );
    setCourses(courseFilter);
  }, [category]);

  useEffect(() => {
    // setCategory("");
    if (level === "") return setCourses(allCourses);
    const courseFilter = allCourses?.filter((course) => course.level === level);
    setCourses(courseFilter);
  }, [level]);

  const history = useHistory();
  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    console.log(searchValue);
    if (searchValue === "") return setCourses(allCourses);
    const courseFilter = allCourses?.filter((course) =>
      course.title?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCourses(courseFilter);
  }, [searchValue]);

  return (
    <>
      <NavHeader />
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
                      onChange={(e) => setSearchValue(e.target.value)}
                      onClick={() => {
                        setLevel("");
                        setCategory("");
                      }}
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
                <Form.Select
                  style={{ border: "none" }}
                  onChange={(e) => setCategory(e.target.value)}
                  onClick={() => setLevel("")}
                  value={category}
                >
                  <option value="">Category</option>
                  {allCategory?.map((cat) => {
                    return <option value={cat}>{cat}</option>;
                  })}
                </Form.Select>
              </div>
              <div class="col-4 col-lg-2 mt-2">
                <Form.Select
                  style={{ border: "none" }}
                  onChange={(e) => setLevel(e.target.value)}
                  onClick={() => setCategory("")}
                  value={level}
                >
                  <option value="">Level</option>
                  <option value="Multi Level">Multi Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container course-list">
        <div className={style.courseContainer}>
          {courses?.map((course, index) => (
            <div
              className={style.courseCard}
              key={course._id}
              onClick={() => history.push("/previewCourse/" + course._id)}
            >
              <div className="courseCard" key={course._id}>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCourses;
