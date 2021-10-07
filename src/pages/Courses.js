import React, { useContext } from "react";
import "../assets/css/Courses.css";
import { Tableitems } from "../components/Tableitems";
import { Link } from "react-router-dom";
import { CourseContext } from "../context/courseContext";

function Courses() {
  const { allCourses } = useContext(CourseContext);
  return (
    <>
      <div className="container">
        <div className="headline" style={{ marginTop: "40px" }}>
          <h2>ALL COURSES</h2>
          <Link
            to={"/create"}
            style={{ background: "blue", color: "white", fontSize: "15px" }}
          >
            Create Courses
          </Link>
        </div>

        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-2">Course Name</div>
            <div className="col col-3">Category </div>
            <div className="col col-4">Price</div>
            <div className="col col-5">Total Lectures</div>
            <div className="col col-6">Level</div>
          </li>
          {allCourses.map((course, index) => {
            return (
              <a href={`/course/${course._id}`} target="_blank">
                <Tableitems
                  c2="col-2"
                  c3="col-3"
                  c4="col-4"
                  c5="col-5"
                  c6="col-6"
                  Cname={course.title}
                  category={course.category && course.category[0]}
                  price={course.price}
                  lectures={course.courseTopic.length + " lectures"}
                  seller={course.level}
                  key={index}
                />
              </a>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Courses;
