import { useState, useEffect } from "react";

export const useCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [blogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/courses/getAllCourses`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.ok) setAllCourses(res.allCourses);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/blog/getAllBlogs`)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setAllBlogs(res.allBlogs);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return { allCourses, blogs };
};
