import { CourseContext } from "../../../context/courseContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { Bar } from "react-chartjs-2";

const Section2 = ({ watchTimePerDays }) => {
  const { userId } = useContext(AuthContext);
  const { allCourses } = useContext(CourseContext);
  const [lastWatchedId, setLastWatchedId] = useState("");
  useEffect(async () => {
    const res = await fetch(
      process.env.REACT_APP_BASE_URL + "/auth/getLastWatch/" + userId
    );
    if (res.status === 200) {
      const data = await res.json();
      setLastWatchedId(data.lastWatched.courseId);
    }
  }, []);

  const [lastCourse, setLastCourse] = useState({});
  useEffect(() => {
    const getReqCourse = allCourses?.find(
      (course) => course._id === lastWatchedId
    );
    if (!!getReqCourse) setLastCourse(getReqCourse);
  }, [allCourses, lastWatchedId]);

  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
      datasets: [
        {
          label: "Watch Time(min)",
          data: watchTimePerDays,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setGraphData(data);
  }, [watchTimePerDays]);

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  };

  return (
    <div className="container col-12 col-lg-9 section-2">
      <div className="row">
        <div className="col-lg-7 col-12 section-left  mt-5">
          <div className="d-flex ">
            <h5 className="">Top Course</h5>
            <a
              type="button"
              className="btn btn-sm ml-auto btn-pink"
              href="/allCourses"
            >
              See All
            </a>
          </div>
          <div className="row ">
            {allCourses.map((course, idx) => {
              if (idx > 1) return;
              return (
                <a
                  className="col-lg-6 col-12 mt-lg-3 mt-4"
                  key={idx}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                  href={"/previewCourse/" + course._id}
                >
                  <div className="media m1 border">
                    <img
                      className="mr-3 img img-fluid"
                      src={course.thumbnail}
                      alt="Generic placeholder image"
                      style={{ height: "110px" }}
                    />
                    <div className="media-body">
                      <p>{course.title}</p>

                      <p className="rating">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="row mt-4">
            <a
              className="col-lg-6 col-12 mt-lg-3 mt-4"
              style={{ cursor: "pointer", textDecoration: "none" }}
              href={"/previewCourse/" + lastCourse._id}
            >
              <h5 className="mt-3" style={{ color: "black" }}>
                Last Watched
              </h5>
              <div className="media m1 border">
                <img
                  className="mr-3 img img-fluid"
                  src={lastCourse.thumbnail}
                  alt="Generic placeholder image"
                  style={{ height: "110px" }}
                />
                <div className="media-body">
                  <p>{lastCourse.title}</p>

                  <p className="rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </p>
                </div>
              </div>
            </a>
            <a
              className="col-lg-6 col-12 mt-lg-3 mt-4"
              style={{ cursor: "pointer", textDecoration: "none" }}
              href="#"
            >
              <h5 className="mt-3" style={{ color: "black" }}>
                Upcoming Courses
              </h5>
              <div className="media m1 border">
                <img
                  className="mr-3 img img-fluid"
                  src="dashboard/Mask Group 41.png"
                  alt="Generic placeholder image"
                  style={{ height: "110px" }}
                />
                <div className="media-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint doloribus
                  </p>
                  <span>Lorem ipsum dolor</span>

                  <p className="rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-5 col-12 mt-5">
          <div className="card text-center">
            <div className="card-body pb-5 mt-3 pt-5">
              <h5>Time Spent On Learning</h5>
              <Bar data={graphData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section2;
