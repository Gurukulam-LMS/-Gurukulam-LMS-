import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CreateCourse from "./pages/CreateCourse";
import CreateTest from "./pages/CreateTest";
import Upload from "./pages/UploadContent";
import Dashboard from "./pages/Dashboard";
import Popup from "./pages/Popup";
import Curriculam from "./pages/coursePage/Curriculam";
import CourseLandingPage from "./pages/coursePage/CourseLandingPage";
import Pricing from "./pages/coursePage/Pricing";
import CourseTestPreview from "./pages/coursePage/create";
import { CourseContext } from "./context/courseContext";
import { AuthContext } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./customHook/auth-hook";
import { useCourseHook } from "./customHook/course-hook";
import PreviewCourse from "./pages/course/previewCourse";
import BlogLandingPage from "./pages/BlogLandingPage";
import Authentication from "./pages/Authentication/Authentication";
import Coupon from "./pages/coupon/coupon";
import CourseDetails from "./pages/courseUpdation/courseDetails";
import CourseTopic from "./pages/courseUpdation/courseTopic";

function App() {
  const doc_auth = useAuth();
  const doc_course = useCourseHook(doc_auth.token);

  const courseContextValue = {
    courseDetails: doc_course.courseDetails,
    lastCourseDetails: doc_course.lastCreatedCourse,
    allCourses: doc_course.allCourses,
    setCourseDetailsHandler: doc_course.setCourseDetailsHandler,
    setlastCourseDetails: doc_course.setLastCreatedCourse,
    setAllCoursesHandler: doc_course.setAllCourses,
  };

  return (
    <>
      <ToastContainer />
      <AuthContext.Provider value={doc_auth}>
        <CourseContext.Provider value={courseContextValue}>
          <BrowserRouter>
            {!!doc_auth.token ? (
              <>
                <Navbar />
                <Switch>
                  <Route
                    exact
                    path="/course/:courseId"
                    component={PreviewCourse}
                  />
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/create" component={CourseTestPreview} />
                  <Route exact path="/curriculum" component={Curriculam} />
                  <Route
                    exact
                    path="/courselandingpage"
                    component={CourseLandingPage}
                  />
                  <Route exact path="/coupon" component={Coupon} />
                  <Route exact path="/pricing" component={Pricing} />
                  <Route exact path="/popup" component={Popup} />
                  <Route exact path="/uploadcontent" component={Upload} />
                  <Route exact path="/createtests" component={CreateTest} />
                  <Route exact path="/createcourses" component={CreateCourse} />
                  <Route exact path="/courses" component={Courses} />
                  <Route exact path="/blog" component={BlogLandingPage} />
                  <Route
                    exact
                    path="/update/courseDetails/:courseId"
                    component={CourseDetails}
                  />
                  <Route
                    exact
                    path="/update/courseTopics/:courseId"
                    component={CourseTopic}
                  />
                </Switch>
              </>
            ) : (
              <Switch>
                <Route exact path="/" component={Authentication} />
                {/* <Redirect to="/login" /> */}
              </Switch>
            )}
          </BrowserRouter>
        </CourseContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
