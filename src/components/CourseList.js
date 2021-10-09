import React, { useEffect, useState } from "react";
import style from "../assets/css/CourseList.module.css";
import { useHttpClient } from "../customHook/http-hook";

const CourseList = () => {
  const { sendRequest } = useHttpClient();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    sendRequest(process.env.REACT_APP_API_URL + "/analytics/topCourses")
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.topCourses);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.heading}>Courses</div>
      <div className={style.header}>
        <div className={style.col1}>Courses</div>
        <div className={style.col2}>Enrolled Student</div>
        <div className={style.col3}>Revenue Generated</div>
      </div>
      {courses.map((course, idx) => {
        return (
          <div className={style.row} key={idx}>
            <div className={style.col1}>{course.title}</div>
            <div className={style.col2}>{course.purchased}</div>
            <div className={style.col3}>{course.price * course.purchased}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
