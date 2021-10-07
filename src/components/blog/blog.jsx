import { useContext } from "react";
import BlogHeader from "./blogHeader";
import "../../assets/css/blog.css";
import { useHistory } from "react-router-dom";
import { CourseContext } from "../../context/courseContext";
import NavHeader from "../../utils/Header/index";

const Blog = () => {
  const history = useHistory();

  const { blogs } = useContext(CourseContext);

  return (
    <>
      <NavHeader />
      <BlogHeader />
      <div className="container mt-4 mb-0 course-list col-12 col-lg-9">
        <div className="row  pt-5 pb-5 mt-5 mb-5">
          {blogs.map((blog, idx) => {
            return (
              <div className="col-12 col-lg-4 mt-5" key={idx}>
                <div className="card card-1">
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
          })}
        </div>
      </div>
    </>
  );
};
export default Blog;
