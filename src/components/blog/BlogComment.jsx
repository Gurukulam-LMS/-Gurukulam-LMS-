import React from "react";
import style from "../../assets/css/BlogComment.module.css";
import { useState, useContext, useEffect } from "react";
import { CourseContext } from "../../context/courseContext";
import { useHttpClient } from "../../customHooks/httpHook";
import { Spinner } from "react-bootstrap";

const BlogComment = ({ blogId }) => {
  const { blogs } = useContext(CourseContext);
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    const getBlog = blogs?.find((blog) => blog._id == blogId);
    if (!!getBlog) {
      setAllComments(getBlog.comments);
    }
  }, [blogs, blogId]);

  const { sendRequest, isLoading } = useHttpClient();

  const [inputText, setInputText] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const prevVal = { ...inputText };
    prevVal[name] = value;
    setInputText(prevVal);
  };

  const commentSubmitHandler = () => {
    setTimeout(() => {
      const api_url = `${process.env.REACT_APP_BASE_URL}/blog/addComment`;
      sendRequest(api_url, "POST", JSON.stringify({ ...inputText, blogId }), {
        "Content-Type": "application/json",
      })
        .then((res) => {
          if (res.status === 201) {
            setAllComments(res.comments);
          }
        })
        .catch((err) => console.log(err));
    }, 2000);
  };

  const setDisablebtn = () =>
    !inputText["userName"] || !inputText["comment"] || !inputText["userEmail"];

  return (
    <div className={style.container}>
      <div className={style.heading}>
        Comments [<span>{allComments.length || 0}</span>]
      </div>
      <div className={style.commentsContainer}>
        {allComments?.map((comment, idx) => {
          return (
            <div className={style.comment} key={idx}>
              <div className={style.commentName}>{comment.userName}</div>
              <div className={style.commentText}>{comment.comment}</div>
            </div>
          );
        })}
      </div>

      <div className={style.postComment}>
        <div className={style.postCommentHeading}>Speak Your Mind</div>
        <div className={style.commentInputContainer}>
          <textarea
            rows={4}
            className={style.textarea}
            placeholder="Write comment"
            name="comment"
            onChange={(e) => handleChange(e)}
          />
          <div className={style.row}>
            <input
              type="text"
              className={style.input}
              placeholder="Name"
              name="userName"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              className={style.input}
              placeholder="Email Address"
              name="userEmail"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className={style.btnContainer}>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <button
              className={style.postCommentBtn}
              onClick={commentSubmitHandler}
              disabled={setDisablebtn()}
            >
              Post Comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
