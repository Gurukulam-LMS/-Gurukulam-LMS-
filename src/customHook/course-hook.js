import { useState, useEffect, useCallback } from "react";
import { useHttpClient } from "./http-hook";

export const useCourseHook = (token) => {
  const { sendRequest } = useHttpClient();
  const [allCourses, setCourses] = useState([]);
  const [lastCreatedCourse, setLastCourse] = useState({});
  const [courseDetails, setCourseDetails] = useState({});
  const [blogs, setAllBlogs] = useState([]);
  //   const [token, setToken] = useState(null);

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_API_URL + "/info/courses/allcourse",
      "GET",
      null,
      {
        Authorization: "Bearer " + token,
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.course);
        }
      })
      .catch((err) => console.log(err));
  }, [token, courseDetails]);

  const setAllCourses = useCallback((course) => {
    setCourses(course);
  }, []);

  const setLastCreatedCourse = useCallback((lastCourse) => {
    setLastCourse(lastCourse);
  }, []);

  const setCourseDetailsHandler = useCallback((courseDetail) => {
    setCourseDetails(courseDetail);
  }, []);

  return {
    allCourses,
    lastCreatedCourse,
    courseDetails,
    setCourseDetailsHandler,
    setLastCreatedCourse,
    setAllCourses,
  };
};
