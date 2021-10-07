import React, { useState } from "react";
import "../assets/css/blog.css";
import { Form, Spinner } from "react-bootstrap";
import { useHttpClient } from "../customHook/http-hook";
import { toast } from "react-toastify";

function BlogLandingPage() {
  const { sendRequest, isLoading } = useHttpClient();

  const [inputText, setInputText] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const prevInfo = { ...inputText };
    prevInfo[name] = value;
    setInputText(prevInfo);
  };

  const [file, setFile] = useState(null);

  const initial = { topicName: "", topicBody: "" };
  const [topics, setTopics] = useState([initial]);

  const topicChangeHandler = (e, idx) => {
    const { name, value } = e.target;
    const prevTopics = [...topics];
    prevTopics[idx][name] = value;
    setTopics(prevTopics);
  };

  const blogSubmitHandler = () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("topics", JSON.stringify(topics));
    Object.keys(inputText).map((key) => {
      formData.append(key, inputText[key]);
    });

    sendRequest(
      process.env.REACT_APP_API_URL + "/blog/createBlog",
      "POST",
      formData
    )
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.message, { position: "top-right" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="blog">
        <div className="blog-content">
          <h2>Blog Landing Page</h2>
        </div>
        <div className="form-1">
          <div className="form-input">
            <label for="" style={{ marginTop: "20px" }}>
              Blog Title<span className="require">*</span>
            </label>
            <input type="text" onChange={(e) => handleChange(e)} name="title" />
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <div className="form-input">
            <label for="">
              Blog Body<span className="require">*</span>
            </label>
            <textarea onChange={(e) => handleChange(e)} rows="3" name="body" />
          </div>
          {topics.map((topic, idx) => {
            return (
              <>
                <div className="form-input">
                  <label for="" style={{ marginTop: "20px" }}>
                    Topic Name {idx + 1}
                    <span className="require">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => topicChangeHandler(e, idx)}
                    name="topicName"
                  />
                </div>
                <div className="form-input">
                  <label for="" style={{ marginTop: "20px" }}>
                    Topic Body {idx + 1}
                    <span className="require">*</span>
                  </label>
                  <textarea
                    onChange={(e) => handleChange(e)}
                    onChange={(e) => topicChangeHandler(e, idx)}
                    name="topicBody"
                  />
                </div>

                {idx != 0 && (
                  <button
                    className="add addBtnBlog"
                    onClick={() => {
                      const prevTopics = [...topics];
                      prevTopics.splice(idx, 1);
                      setTopics(prevTopics);
                    }}
                  >
                    Remove Topic
                  </button>
                )}
              </>
            );
          })}
          <button
            className="add addBtnBlog"
            onClick={() => {
              const prevTopics = [...topics];
              prevTopics.push(initial);
              setTopics(prevTopics);
            }}
          >
            Add More Topic
          </button>
          <div className="form-input">
            <label for="">
              Tag<span className="require">*</span>
            </label>
            <select
              style={{ height: "2em", width: "200px" }}
              onChange={(e) => handleChange(e)}
              name="tags"
            >
              <option>Choose Tag</option>
              <option value="Accounting">Accounting</option>
              <option value="Engineering">Engineering</option>
              <option value="Designing">Designing</option>
            </select>
          </div>
          <br />
          <br />
          <br />
          <p className="full-width">
            <button className="back">Cancel</button>
            {isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <button className="continue1" onClick={blogSubmitHandler}>
                Create Blog
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default BlogLandingPage;
