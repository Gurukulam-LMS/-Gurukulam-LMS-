import { Container, Image } from "react-bootstrap";
import SocialMediaShare from "../../utils/SocialMediaShare";

const LeftContainer = ({ blog }) => {
  return (
    <>
      <Container
        className="d-flex align-items-center"
        style={{ letterSpacing: 2, fontSize: "20px" }}
      >
        <span className="float-right d-flex"></span>
      </Container>

      <Container className="left-content">
        <h3 className="mt-3">{blog && blog.title}</h3>
        <br />
        <p>{blog && blog.body}</p>
        <br />
        <Image src={blog && blog.image} alt="..." fluid />
        {blog &&
          blog.topics.map((topic, idx) => {
            return (
              <div key={idx}>
                <h4 className="b mt-3">{topic.topicName}</h4>
                <br />
                <p>{topic.topicBody}</p>
                <br />
              </div>
            );
          })}
      </Container>

      <Container className="d-flex mt-2">
        <SocialMediaShare content={blog && blog.title} />
      </Container>
      <br />
    </>
  );
};
export default LeftContainer;
