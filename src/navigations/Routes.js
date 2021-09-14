import React, { useContext } from "react";
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

function Routes() {
  const { isLoggedIn, verification } = useContext(AuthContext);
  console.log(verification);

  if (isLoggedIn && !verification.mobile) {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/onboarding" component={OnBoarding} />
          <Redirect to="/onboarding" />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blog/:blogId" component={Blog} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/onboarding" component={OnBoarding} />
        <Route path="/auth/confirm/:id" component={ConfirmEmail} />
        <Route path="/auth/reset/:resetToken" component={ResetPassword} />
        <Route path="/contact" component={Contact} />
        <Route path="/dash" component={Dashboard} />
        <Route path="/aboutCourses" component={AboutCourse} />
        <Route path="/previewCourse/:courseId" component={PreviewCourse} />
        <Route path="/cart" component={Cart} />
        <Route path="/payment/response" component={PaymentSuccess} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
