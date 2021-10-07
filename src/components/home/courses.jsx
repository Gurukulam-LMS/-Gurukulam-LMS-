import { useContext, useEffect, useState, useRef } from "react";
import { CourseContext } from "../../context/courseContext";
import { useHistory } from "react-router";
import {
  FaRupeeSign,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";
import style from "../../assets/css/home.module.css";

const Courses = () => {
  const { allCourses } = useContext(CourseContext);
  const [allCategory, setAllCategory] = useState([]);
  const [currCatIdx, setCurrentCatIdx] = useState(null);
  const [currCatCourse, setCurrCatCourse] = useState([]);

  const scrollRef = useRef(null);

  const horScroll = (val) => (scrollRef.current.scrollLeft += val);

  useEffect(() => {
    const set = new Set();
    allCourses.forEach((course) => {
      course.category &&
        course.category.map((cat) => {
          set.add(cat);
        });
    });
    setAllCategory([...set]);
  }, [allCourses]);

  useEffect(() => {
    setCurrCatCourse([]);
    allCourses.map((course) => {
      course.category &&
        course.category.map((cat) => {
          if (cat === allCategory[currCatIdx]) {
            setCurrCatCourse((prev) => [...prev, course]);
          }
        });
    });
    if (currCatCourse.length === 0) {
      setCurrCatCourse([...allCourses]);
    }
  }, [currCatIdx, allCourses]);

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

        <div class="col-12 text-center mt-5 ">
          <div className={style.horMenuWrapper}>
            <div className={style.iconCont}>
              <FaArrowCircleLeft
                className={style.arrowIcon}
                onClick={() => horScroll(-100)}
              />
            </div>

            <div className={style.carousalMenu} ref={scrollRef}>
              {allCategory.map((cat, idx) => {
                return (
                  <div
                    className={style.menu}
                    key={idx}
                    style={{
                      borderBottom: idx === currCatIdx ? "5px solid blue" : "0",
                    }}
                    onClick={() => setCurrentCatIdx(idx)}
                  >
                    {cat}
                  </div>
                );
              })}
            </div>
            <div className={style.iconCont}>
              <FaArrowCircleRight
                className={style.arrowIcon}
                onClick={() => horScroll(100)}
              />
            </div>
          </div>
        </div>
        {currCatCourse.map((course, index) => (
          <div
            className={style.courseCard}
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
