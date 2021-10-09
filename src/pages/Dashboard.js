import React, { useEffect, useState, useContext } from "react";
import "../assets/css/Dashboard.css";
import { AllCourseCards, DashCards } from "../components/DashCards";
import { useHttpClient } from "../customHook/http-hook";
import CourseList from "../components/CourseList";
import Graph from "../components/Graph";
import { CourseContext } from "../context/courseContext";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const { allCourses } = useContext(CourseContext);
  const { sendRequest } = useHttpClient();
  const [revenue, setRevenue] = useState(0);

  const history = useHistory();

  useEffect(() => {
    sendRequest(process.env.REACT_APP_API_URL + "/analytics/totalRevenue")
      .then((res) => {
        if (res.status === 200) {
          setRevenue(res.totalRevenue[0].amount);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="admin-panel-wrapper">
      {/* header cards */}

      <div className="dashboard">
        <div className="header-container">
          <DashCards
            cn="c1"
            title="Total Revenue Generated"
            num={revenue}
            wrapperName="container"
          />
          <DashCards
            cn="c2"
            title="Total Courses"
            num={allCourses.length}
            wrapperName="container1"
          />
          <div className="category-container">
            <div className="category-heading">Top Category</div>
            <div className="category-box-container">
              <div className="category-box">UX Design</div>
              <div className="category-box">Data Science</div>
              <div className="category-box">Graphic Design</div>
              <div className="category-box">Development</div>
              <div className="leftArrow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* middle chart area */}

      <div className="body-admin-container">
        <div className="left-container-admin">
          <CourseList />
        </div>
        <div className="right-container-admin">
          <Graph />

          <div className="allCourse-admin-label">
            <h3>All Courses</h3>
            <div
              className="see-All-btn"
              onClick={() => history.push("/courses")}
            >
              See All
            </div>
          </div>
          <div className="main__cards2">
            {allCourses.map((course, idx) => {
              if (idx > 3) return;
              return (
                <AllCourseCards
                  img={course.thumbnail}
                  key={idx}
                  title={course.title}
                  id={course._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
