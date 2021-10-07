import { createContext } from "react";

export const CourseContext = createContext({
  courseDetails: {},
  setCourseDetailsHandler: () => {},
  lastCourseDetails: {},
  setlastCourseDetails: () => {},
  allCourses: [],
  setAllCoursesHandler: () => [],
  blogs: [],
});
