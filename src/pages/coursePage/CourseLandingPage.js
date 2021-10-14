import React, { useState, useContext } from "react";
import "../../assets/css/Curriculum.css";
import { Link } from "react-router-dom";
import { CourseContext } from "../../context/courseContext";
import { Form, Container } from "react-bootstrap";

function CourseLandingPage({ stack, setStack, data }) {
  const { courseDetails, setCourseDetailsHandler } = useContext(CourseContext);

  const [courseFormData, setCourseFormData] = useState({
    title: data.title,
    category: data.category,
    tagline: "",
    description: "",
    level: "",
    language: "",
    image: null,
  });
  const initialkeyPoints = "";
  const [keyPoints, setKeyPoints] = useState([initialkeyPoints]);

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
    const courseDetails = { ...courseFormData };
    const category = courseFormData.category;
    let cat = [];
    cat.push(category);
    courseDetails["category"] = cat;
    courseDetails["keyPoints"] = keyPoints;
    setCourseDetailsHandler(courseDetails);
    setStack((e) => e + 1);
  };

  return (
    <div className="curriculum-area mt-2 p-5">
      <div className="curriculum">
        <div className="c-area radios">
          <div className="radio-input">
            <Link to={"#"}>
              <input
                checked
                type="radio"
                value="CourseLandingPage"
                name="course"
              />
            </Link>
            <label>Course Landing Page</label>
          </div>
          <div className="radio-input">
            <Link to={"#"}>
              <input type="radio" value="Pricing" name="course" />
            </Link>
            <label>Pricing</label>
          </div>
          <div className="radio-input">
            <Link to={"#"}>
              <input type="radio" value="Curriculam" name="course" />
            </Link>
            <label>Curriculam</label>
          </div>
        </div>

        <div className="c-area box-area">
          <h3>Course Landing Page</h3>
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
                  />
                  {idx != 0 && (
                    <button
                      className="p-2"
                      style={{ marginLeft: "10px" }}
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
                className="p-2"
                style={{ margin: "10px", width: "100px" }}
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
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLandingPage;
