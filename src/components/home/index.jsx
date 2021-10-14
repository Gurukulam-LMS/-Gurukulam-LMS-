import "../../assets/css/style.css";
import Courses from "./courses";
import FeedBack from "./feedback";
import LatestNews from "./latestNews";
import Supporter from "./supporter";
import { useHistory } from "react-router-dom";
import NavHeader from "../../utils/Header/index";
const Home = () => {
  const history = useHistory();
  return (
    <>
      <NavHeader />
      <header className="header ">
        <div
          className="head pt-sm-5 "
          style={{ backgroundImage: `url(/Images/Main.png)` }}
        >
          <div className="container-fluid pb-5">
            <div className="container">
              <div className="row ">
                <div className="col-lg-6 col-sm-8 col-11 head-1 mt-lg-5 mt-4 text-left">
                  <h5 className="pt-sm-4 pl-lg-2 pl-sm-1 ">
                    Start your favourite course
                  </h5>
                  <h2 className="pt-sm-4 pl-lg-2 pl-sm-1 ">
                    Now <span className="s1"> learn</span> from <br />
                    anywhere, and build <br /> your{" "}
                    <span className="s2">bright career.</span>{" "}
                  </h2>
                  <p
                    className="pl-lg-2 pl-sm-1 "
                    style={{ fontFamily: "Ubuntu", fontWeight: "Bold" }}
                  >
                    It has survived not only five centuries but also the leap
                    into electronic typesetting
                  </p>
                  <input
                    type="button"
                    className="btn blue-btn"
                    value="Start a course"
                    onClick={() => history.push("/signin")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Courses />
      <div class="container-fluid join-inst">
        <div class="container bg-blue">
          <div class="row">
            <div class="col-lg-6 col-sm-12 text-center">
              <img
                src="Images/Image 15.png"
                class="img img-fluid join-inst-img-1"
                alt=""
                width="325px"
              />
              <img
                src="Images/Image 14.png"
                class="img img-fluid join-inst-img-2"
                alt=""
                width="270px"
              />
              <img
                src="Images/Image 16.png"
                class="img img-fluid join-inst-img-3"
                alt=""
                width="340px"
              />
            </div>
            <div class="col-lg-6 col-sm-12 txts">
              <h6 class="mt-3">Become A Instructor</h6>
              <h3 class="mt-3">You can join with Edule as a instructor?</h3>
              <button
                type="button"
                class="btn col-sm-7 col-11 bg-btn mt-4"
                onClick={() => history.push("/educatorContact")}
              >
                Drop Information
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container working-flow mb-5 mt-5">
        <div class="row ml-lg-5 working-flow-row">
          <div class="col-12">
            <h2 class="text-center">
              How It <span>Work?</span>
            </h2>
          </div>
          <div class="col-lg-3 col-12 card c1 mt-4 ">
            <h5>Find Your Course</h5>
            <p>it has survived not only centurie also leap into electronic</p>
          </div>
          <div class="col-lg-1 col-12 d-none d-lg-block arrow  text-center">
            <span class="fas fa-chevron-right"></span>
          </div>

          <div class="col-lg-3 col-12 card c2 mt-4">
            <h5>Find Your Course</h5>
            <p>it has survived not only centurie also leap into electronic</p>
          </div>
          <div class="col-lg-1 col-12 d-none d-lg-block arrow text-center">
            <span class="fas fa-chevron-right"></span>
          </div>

          <div class="col-lg-3 col-12 card c3 mt-4">
            <h5>Find Your Course</h5>
            <p>it has survived not only centurie also leap into electronic</p>
          </div>
        </div>
      </div>

      <FeedBack />
      <Supporter />
      <LatestNews />
    </>
  );
};
export default Home;
