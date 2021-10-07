import React, { useEffect, useState, useContext } from "react";
import "../assets/css/Dashboard.css";
import { AllCourseCards, DashCards, Pie } from "../components/DashCards";
import Image1 from "../assets/Images/Mask Group 42.png";
import Image2 from "../assets/Images/Mask Group 41.png";
import { useHttpClient } from "../customHook/http-hook";
import CourseList from "../components/CourseList";
import Graph from "../components/Graph";
import { CourseContext } from "../context/courseContext";
function Dashboard() {
  const { allCourses } = useContext(CourseContext);
  const { sendRequest } = useHttpClient();
  const [revenue, setRevenue] = useState(0);
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
    <>
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
          <div className="card2 c8">
            <h2>All Courses</h2>
            <div className="main__cards2">
              <AllCourseCards img={Image2} />
              <AllCourseCards img={Image1} />
              <AllCourseCards img={Image2} />
              <AllCourseCards img={Image1} />
            </div>
            <button className="btn"> See All</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
