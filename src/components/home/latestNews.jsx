import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CourseContext } from "../../context/courseContext";
import { Carousel } from "react-bootstrap";
const LatestNews = () => {
  const history = useHistory();
  const { blogs } = useContext(CourseContext);
  const blogCards = [];
  var tempArray = [];

  blogs.forEach((blog) => {
    tempArray.push(
      <div className="col-12 col-lg-4 mt-5" style={{ width: "360px" }}>
        <div className="card card-1" style={{ height: "420px" }}>
          <div className="card-head c2"></div>
          <div className="card-body">
            <h5 className="txt-1">
              <span className="badge badge-blue ">{blog.tags[0]}</span>
            </h5>
            <div className="pt-3 pl-2 pr-2">
              <h4 className="txt-2">{blog.title}</h4>

              <button
                type="button"
                className="btn col-12 mt-3 mb-3 card-btn-blue"
                onClick={() => history.push("/blog/" + blog._id)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  while (tempArray.length > 0) {
    const spliceValue = window.orientation > -1 ? 1 : 3;
    const temp = tempArray.splice(0, spliceValue);
    const temp1 = (
      <Carousel.Item interval={5000}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          {temp}
        </div>
      </Carousel.Item>
    );
    blogCards.push(temp1);
  }

  return (
    <div className="container last-section mt-t mb-5">
      <div className="row text-center">
        <div className="col-12">
          <h5>Latest News</h5>
        </div>
        <div className="col-12">
          <h3>
            Educational <span>Tips and Tricks</span>
          </h3>
        </div>
      </div>

      <Carousel controls={false} indicators={false}>
        {blogCards}
      </Carousel>
    </div>
  );
};
export default LatestNews;
