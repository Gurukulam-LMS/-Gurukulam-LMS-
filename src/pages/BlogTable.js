import React, { useState, useEffect } from "react";
import { Useritems } from "../components/Tableitems";

const BlogTable = () => {
  const [blogs, setAllBlogs] = useState([]);
  useEffect(async () => {
    const api_url = `${process.env.REACT_APP_API_URL}/blog/allBlogs`;
    try {
      const data = await fetch(api_url);
      if (data.status === 200) {
        const res = await data.json();
        setAllBlogs(res.allBlogs);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  console.log(blogs);
  return (
    <>
      <div className="container">
        <div className="headline" style={{ marginTop: "40px" }}>
          <h2>Blogs</h2>
        </div>

        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-2">Blog Title</div>
            <div className="col col-5">Date Created</div>
            <div className="col col-6">Category</div>
            <div className="col col-7">Delete</div>
          </li>
          {blogs.map((blog, idx) => {
            return (
              <Useritems
                key={idx}
                c2="col-2"
                c5="col-5"
                c6="col-6"
                c7="col-7"
                Uname={blog.title?.substring(0, 50) + "...."}
                date={dateHandler(blog.createdAt)}
                course={blog.tags[0]}
                id={blog._id}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default BlogTable;
