import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../utils/Header";
import Home from "../components/home";
import Blog from "../components/blog";
import Signin from "../components/signin";
import Signup from "../components/signup";
import Footer from "../utils/Footer";
import OnBoarding from "../components/onboarding";
import ConfirmEmail from "../components/signup/confirmEmail";
import ResetPassword from "../components/signin/resetPassword";
import { AuthContext } from "../context/authContext";
import Contact from "../components/contact/contact";
import Dashboard from "../Dashboard/Dashboard";
import Blogs from "../components/blog/blog";
import PreviewCourse from "../components/course/previewCourse";
import AboutCourse from "../components/course/aboutCourse";
import Cart from "../components/cart/cart";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import OAuth from "../components/oAuth/oAuth";
import Onboarding2 from "../components/onboarding/index2";
import CoursePlayer from "../components/course/coursePlayer";
import AllCourses from "../components/course/allCourses";
import EducatorContact from "../components/contact/educatorContact";
import ScrollToTop from "../utils/comps/ScrollToTop";

function Routes() {
  const { isLoggedIn, verification } = useContext(AuthContext);

  const groutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/blog/:blogId" component={Blog} />
      <Route exact path="/blogs" component={Blogs} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/auth/:userId" component={OAuth} />
      <Route exact path="/auth/confirm/:id" component={ConfirmEmail} />
      <Route exact path="/auth/reset/:resetToken" component={ResetPassword} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/aboutCourses" component={AboutCourse} />
      <Route exact path="/previewCourse/:courseId" component={PreviewCourse} />
      <Route exact path="/educatorContact" component={EducatorContact} />
      <Route exact path="/allCourses" component={AllCourses} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  const aftAuthroutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dash" component={Dashboard} />
      <Route exact path="/blog/:blogId" component={Blog} />
      <Route exact path="/blogs" component={Blogs} />
      <Route exact path="/auth/:userId" component={OAuth} />
      <Route exact path="/onboarding" component={OnBoarding} />
      <Route exact path="/onboarding2" component={Onboarding2} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/aboutCourses" component={AboutCourse} />
      <Route exact path="/previewCourse/:courseId" component={PreviewCourse} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/payment/response" component={PaymentSuccess} />
      <Route exact path="/coursePlayer/:courseId" component={CoursePlayer} />
      <Route exact path="/allCourses" component={AllCourses} />
      <Route exact path="/educatorContact" component={EducatorContact} />
      <Redirect to="/" />
    </Switch>
  );

  const [afterAuthRoutes, setAfterAuthRoutes] = useState();
  const [globalRoutes, setGlobalRoutes] = useState(groutes);

  useEffect(() => {
    setAfterAuthRoutes(aftAuthroutes);
    setGlobalRoutes(groutes);
  }, [isLoggedIn]);

  if (isLoggedIn && !!verification && verification.mobile === false) {
    return (
      <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route path="/onboarding" component={OnBoarding} />
          <Redirect to="/onboarding" />
        </Switch>
      </Router>
    );
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <ScrollToTop />
        {globalRoutes}
        <Footer />
      </Router>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      {afterAuthRoutes}
      <Footer />
    </Router>
  );
}

export default Routes;
