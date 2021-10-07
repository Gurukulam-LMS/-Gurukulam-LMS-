import React, { useState, useContext } from "react";
import "../../assets/css/Curriculum.css";
import { CourseContext } from "../../context/courseContext";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../customHook/http-hook";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function Pricing({ setStack }) {
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const { courseDetails, setCourseDetailsHandler, setlastCourseDetails } =
    useContext(CourseContext);
  const { sendRequest, isLoading } = useHttpClient();

  const formSubmitHandler = () => {
    const prevInfo = { ...courseDetails };
    prevInfo["price"] = price;
    setCourseDetailsHandler(prevInfo);
    const formData = new FormData();
    Object.keys(prevInfo).map((key) => {
      if (key === "keyPoints") return;
      formData.append(key, prevInfo[key]);
    });
    formData.append("keyPoints", JSON.stringify(prevInfo["keyPoints"]));
    formData.append("creatorId", "611793c1f0fe993a883a0b5c");
    const data = JSON.parse(formData.get("keyPoints"));
    setTimeout(() => {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/admin/creator/create-course`,
        "POST",
        formData
      )
        .then((res) => {
          if (res.status == 201) {
            toast.success("New Course Created", { position: "top-right" });
            setlastCourseDetails(res.newCourse);
            setStack((e) => e + 1);
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  return (
    <div>
      <div className="curriculum-area">
        <div className="curriculum">
          <div className="c-area radios">
            <div className="radio-input">
              <Link to={"#"}>
                <input type="radio" value="CourseLandingPage" name="course" />
              </Link>
              <label>Course Landing Page</label>
            </div>
            <div className="radio-input">
              <Link to={"#"}>
                <input checked type="radio" value="Pricing" name="course" />
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
            <h3>Pricing</h3>
            <p className="pricing-para">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software .
            </p>
            <div className="pricing-buttons">
              <select
                name="currency"
                id="currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <input
                className="amount-input"
                type="text"
                placeholder="Amount"
                onChange={(e) => setPrice(e.target.value)}
              />
              {isLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <button className="save" onClick={formSubmitHandler}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
