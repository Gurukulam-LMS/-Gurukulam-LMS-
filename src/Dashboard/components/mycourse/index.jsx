import "../../assets/css/mycourse.css";
import data from "../../api/courses.json";
const MyCourse = () => {
  return (
    <>
      <div class="container sub-nav col-12 col-lg-9">
        <div class="row">
          <div class="col-10">
            <div class="row">
              <div class="col-12 col-lg-4 mt-2">
                <form class="form-inline">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon1"
                    />
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <span class="fa fa-search"></span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-4 col-lg-2 mt-2">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Subject
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      UI/UX Designer
                    </a>
                    <a class="dropdown-item" href="#">
                      Development
                    </a>
                    <a class="dropdown-item" href="#">
                      Data Science
                    </a>
                    <a class="dropdown-item" href="#">
                      Business
                    </a>
                    <a class="dropdown-item" href="#">
                      Financial
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-4 col-lg-2 mt-2">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Level
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Introductory
                    </a>
                    <a class="dropdown-item" href="#">
                      Intermediate
                    </a>
                    <a class="dropdown-item" href="#">
                      Advanced
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-3 col-lg-2 mt-2">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Avilability
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      Availavle Now
                    </a>
                    <a class="dropdown-item" href="#">
                      Upcoming
                    </a>
                    <a class="dropdown-item" href="#">
                      Advanced
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-2 mb-4 course-list col-lg-9 col-12 ">
        <div class="row  ">
          {data.map((course, index) => (
            <div className="col-12 col-lg-4 mt-5" key={course.id}>
              <div className=""></div>
              <div className="card card-1">
                <div
                  className="card-head"
                  style={{
                    backgroundImage: `url("${course.bgimg}")`,
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="txt-1">
                    {course.staff}
                    <span
                      className={`badge ${
                        index % 2 == 0 ? "badge-red" : "badge-blue"
                      }`}
                    >
                      {course.subject}
                    </span>{" "}
                    :
                  </h5>
                  <img
                    src={course.profilePic}
                    className="mt-2 rounded-circle img-1"
                    width="65px"
                    height="65px"
                  />
                  <div className="pt-3 pl-2 pr-2">
                    <h4 className="txt-2">{course.detail}</h4>
                    <p>
                      <span className="time">
                        <i className="far fa-clock"></i> {course.time}
                      </span>{" "}
                      <span className="lectures">
                        <i className="fas fa-book-open"></i> {course.lectures}{" "}
                        lectures
                      </span>
                    </p>
                    <button
                      type="button"
                      className={`btn col-12 mt-3 mb-3 card-btn-red ${
                        index % 2 == 0 ? "card-btn-red" : "card-btn-blue"
                      } `}
                    >
                      <span className="rate pl-3">${course.price}</span>{" "}
                      <span className="star pr-3">
                        {course.star}{" "}
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyCourse;
