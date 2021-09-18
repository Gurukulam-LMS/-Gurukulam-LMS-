import { useContext } from "react";
import Header from "./header";
import "../../assets/css/blog.css";
import { Card, Col, Container, Form, Row, Image } from "react-bootstrap";
import RightContainer from "./rightContainer";
import LeftContainer from "./leftContainer";
import { CourseContext } from "../../context/courseContext";
import { useParams } from "react-router";
import NavHeader from "../../utils/Header/index";
const Blog = () => {
  const { blogId } = useParams();
  const { blogs } = useContext(CourseContext);
  const blog = blogs.find((blog) => blog._id == blogId);

  return (
    <>
      <Container className="mt-5 p-2">
        <NavHeader />
        <Row>
          <Col lg={8} sm={7} md={8}>
            <LeftContainer blog={blog} />
          </Col>
          <Col lg={4} sm={5} md={4} style={{ fontFamily: "sans-serif" }}>
            <RightContainer />
          </Col>
        </Row>
      </Container>
      <Container>
        {/* <Card>
          <Card.Header className="d-flex ">
            <p className="mt-2" style={{ fontSize: "22px" }}>
              Comments
            </p>
          </Card.Header>
          <Card.Body className="d-flex align-items-center">
            <Form.Control
              className="border-0 mt-3"
              as="textarea"
              placeholder="write a comment"
              style={{ width: "100%" }}
            />
            <Form.Control
              className="border-0 mt-3"
              as="textarea"
              placeholder="write a comment"
              style={{ width: "100%" }}
            />
            <Form.Control
              className="border-0 mt-3"
              as="textarea"
              placeholder="write a comment"
              style={{ width: "100%" }}
            />
          </Card.Body>
        </Card> */}
      </Container>
      <Container>
        <h4 className="m-3">Recent Post</h4>
        <div className="blog-card-container">
          {blogs.map((e, idx) => (
            <div className="blog-card-footer">
              <div key={idx} className="blog-wrapper-container">
                <Image fluid src={e.image} alt="..." />
                <b className="blog-footer-heading">{e.title}</b>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};
export default Blog;
