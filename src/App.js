import React, { useState } from "react";
import Routes from "./navigations/Routes";

//Toast Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//contexts
import { AuthContext } from "./context/authContext";
import { CourseContext } from "./context/courseContext";

//hooks
import { useAuth } from "./customHooks/authHook";
import { useCourse } from "./customHooks/courseHook";

const App = () => {
  //Auth-Context (user data)
  const auth = useAuth();

  //grabbing payment Info
  const [lastPaymentInfo, setLastPaymentInfo] = useState({});
  const setLastPaymentInfoHandler = (data) => setLastPaymentInfo(data);

  const authContextValue = {
    isLoggedIn: !!auth.token,
    token: auth.token,
    userId: auth.userId,
    personalInfo: auth.personalInfo,
    educationalInfo: auth.educationalInfo,
    verification: auth.verification,
    cart: auth.cart,
    setCartHandler: auth.setCartHandler,
    login: auth.login,
    logout: auth.logout,
    googleLogin: auth.googleLogin,
    setVerificationStatus: auth.setVerificationStatus,
    lastPaymentInfo,
    setLastPaymentInfoHandler,
  };

  //Course-Context
  const { allCourses, blogs } = useCourse();
  const courseContextValue = { allCourses, blogs };

  return (
    <>
      <ToastContainer />
      <AuthContext.Provider value={authContextValue}>
        <CourseContext.Provider value={courseContextValue}>
          <Routes />
        </CourseContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
