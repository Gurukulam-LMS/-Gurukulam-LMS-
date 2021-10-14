import React, { useState, useContext, useEffect } from "react";
import "../../assets/css/Curriculum.css";
import { CourseContext } from "../../context/courseContext";
import { Form } from "react-bootstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useHttpClient } from "../../customHook/http-hook";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { allCourses } = useContext(CourseContext);

  const { sendRequest, isLoading } = useHttpClient();

  const [keyPoints, setKeyPoints] = useState([]);
  const [courseFormData, setCourseFormData] = useState({});

  useEffect(() => {
    const reqCourse = allCourses.find(
      (courseData) => courseData._id === courseId
    );
    if (reqCourse) {
      setKeyPoints([...reqCourse.keyPoints]);
      setCourseFormData({
        title: reqCourse.title,
        category: reqCourse.category && reqCourse.category[0],
        tagline: reqCourse.tagline,
        description: reqCourse.description,
        level: reqCourse.level,
        language: reqCourse.language,
        image: reqCourse.thumbnail,
        price: reqCourse.price,
      });
    }
  }, [allCourses]);

  const initialkeyPoints = "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    const prevVal = { ...courseFormData };
    prevVal[name] = value;
    setCourseFormData(prevVal);
  };

  const keyPointsHandler = (e, idx) => {
    const { value } = e.target;
    const prevVal = [...keyPoints];
    prevVal[idx] = value;
    setKeyPoints(prevVal);
  };

  const courseSubmitHandler = () => {
    const formData = new FormData();
    Object.keys(courseFormData).map((key) => {
      if (key === "category") {
        let arr = [courseFormData[key]];
        formData.append(key, arr);
      } else {
        formData.append(key, courseFormData[key]);
      }
    });
    formData.append("keyPoints", JSON.stringify(keyPoints));
    formData.append("courseId", courseId);

    setTimeout(() => {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/admin/course/updateCourseDetails`,
        "POST",
        formData
      )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            toast.success("New Course Created", { position: "top-right" });
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  return (
    <>
      <div className="curriculum-area mt-2 p-5">
        <div className="curriculum">
          <div></div>
          <div className="c-area box-area">
            <h3>Course Update Page</h3>
            <div className="form-1">
              <div className="form-input">
                <label for="" style={{ marginTop: "20px" }}>
                  Title
                </label>
                <input
                  style={{ height: "2em" }}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={courseFormData.title}
                  name="title"
                />
              </div>
              <div className="form-input">
                <label for="">Categroy</label>
                <input
                  style={{ height: "2em" }}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={courseFormData.category}
                  name="category"
                />
              </div>
              <div className="form-input">
                <label for="">Price</label>
                <input
                  style={{ height: "2em" }}
                  type="number"
                  onChange={(e) => handleChange(e)}
                  value={courseFormData.price}
                  name="price"
                />
              </div>
              <div className="form-input">
                <label for="">Tagline</label>
                <input
                  style={{ height: "2em" }}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="tagline"
                  value={courseFormData.tagline}
                />
              </div>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setCourseFormData({
                      ...courseFormData,
                      image: e.target.files[0],
                    })
                  }
                  style={{ color: "black", backgroundColor: "white" }}
                />
              </Form.Group>
              <div className="form-input">
                <label for="">Description</label>
                <textarea
                  className="inp3"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="description"
                  value={courseFormData.description}
                  rows="3"
                />
              </div>
              <br />
              <label for="">What you will learn</label>
              {keyPoints.map((e, idx) => (
                <div className="form-input">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <input
                      style={{ height: "2em" }}
                      type="text"
                      onChange={(e) => keyPointsHandler(e, idx)}
                      value={keyPoints[idx]}
                    />
                    {idx != 0 && (
                      <button
                        className="keypointsBtn"
                        onClick={() => {
                          let info = [...keyPoints];
                          info.splice(idx, 1);
                          setKeyPoints(info);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div>
                <button
                  className="keypointsBtn"
                  style={{ margin: "10px" }}
                  onClick={() => setKeyPoints([...keyPoints, initialkeyPoints])}
                >
                  Add +
                </button>
              </div>
              <div className="row">
                <div className="form-input col">
                  <label for="">Level</label>
                  <select
                    style={{ height: "2em", width: "200px" }}
                    onChange={(e) => handleChange(e)}
                    name="level"
                    value={courseFormData.level}
                  >
                    <option>Select Level</option>
                    <option value="Multi Level">Multi Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="form-input col">
                  <label for="">Language</label>
                  <select
                    style={{ height: "2em", width: "200px" }}
                    onChange={(e) => handleChange(e)}
                    name="language"
                    value={courseFormData.language}
                  >
                    <option>Select Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>
              <br />
              <button className="save" onClick={courseSubmitHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
