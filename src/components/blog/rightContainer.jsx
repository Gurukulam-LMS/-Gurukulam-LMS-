import postsCategory from "../../api/blog_course.json";
import popularTags from "../../api/populartags.json";
import { Button, Container } from "react-bootstrap";
const RightContainer = () => {
  return (
    <>
      <h2 className="ml-1">Post Category</h2>
      <Container fluid className="p-3" style={{ background: "#E3E8FF" }}>
        {postsCategory.map((e) => (
          <Button
            key={e.id}
            variant="light"
            className="w-100 mt-3"
            style={{ letterSpacing: "1.5px" }}
          >
            <span className="float-left"> {e.course}</span>{" "}
            <span className="float-right">({e.noofpost})</span>
          </Button>
        ))}
      </Container>
      <h2 className="ml-1 mt-5">Popular Tags</h2>
      <Container fluid className="p-3 mt-4" style={{ background: "#E3E8FF" }}>
        {popularTags.map((e) => (
          <Button
            key={e.name}
            variant="light"
            className="m-2"
            style={{ letterSpacing: "2px" }}
          >
            {e.name}
          </Button>
        ))}
      </Container>
    </>
  );
};

export default RightContainer;
