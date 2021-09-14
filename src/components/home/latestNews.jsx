import React from "react";
import { useHistory } from "react-router-dom";

const LatestNews = (params) => {
  const history = useHistory();
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
      <div className="row">
        <div className="col-12 col-lg-4 mt-5">
          <div className="card card-1">
            <div className="card-head c1"></div>
            <div className="card-body">
              <h5 className="txt-1">
                Jason Williams <span className="badge badge-red ">Science</span>
              </h5>
              <img
                src="Images/Group 210.png"
                className=" mt-2 rounded-circle img-1"
                width="65px"
                height="65px"
              />
              <div className="pt-3 pl-2 pr-2">
                <h4 className="txt-2">
                  Data Science and Machine Learning with Python - Hands On!
                </h4>
                <p>
                  <span className="time">
                    <i className="far fa-clock"></i> 08hr 15 min
                  </span>{" "}
                  <span className="lectures">
                    <i className="fas fa-book-open"></i> 29 levctures
                  </span>
                </p>
                <button
                  type="button"
                  className="btn col-12 mt-3 mb-3 card-btn-red"
                  onClick={() => history.push("/blog")}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 mt-5">
          <div className="card card-1">
            <div className="card-head c2"></div>
            <div className="card-body">
              <h5 className="txt-1">
                Pamela Foster{" "}
                <span className="badge badge-blue ">UX Design</span>
              </h5>
              <img
                src="Images/Group 211.png"
                className=" mt-2 rounded-circle img-1"
                width="65px"
                height="65px"
              />
              <div className="pt-3 pl-2 pr-2">
                <h4 className="txt-2">
                  Creat Amazing Color Schemes for Your UX Design Projects
                </h4>
                <p>
                  <span className="time">
                    <i className="far fa-clock"></i> 08hr 15 min
                  </span>{" "}
                  <span className="lectures">
                    <i className="fas fa-book-open"></i> 29 levctures
                  </span>
                </p>
                <button
                  type="button"
                  className="btn col-12 mt-3 mb-3 card-btn-blue"
                  onClick={() => history.push("/blog")}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4 mt-5">
          <div class="card card-1">
            <div class="card-head c3"></div>
            <div class="card-body">
              <h5 class="txt-1">
                Rose Simmons <span class="badge badge-red ">Business</span>
              </h5>
              <img
                src="Images/Group 212.png"
                class=" mt-2 rounded-circle img-1"
                width="65px"
                height="65px"
              />
              <div class="pt-3 pl-2 pr-2">
                <h4 class="txt-2">
                  Culture & Leadership: startergies for a Successful Business
                </h4>
                <p>
                  <span class="time">
                    <i class="far fa-clock"></i> 08hr 15 min
                  </span>{" "}
                  <span class="lectures">
                    <i class="fas fa-book-open"></i> 29 levctures
                  </span>
                </p>
                <button
                  type="button"
                  class="btn col-12 mt-3 mb-3 card-btn-red"
                  onClick={() => history.push("/blog")}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LatestNews;
