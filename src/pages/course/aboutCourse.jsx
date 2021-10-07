import React, { useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import {
  FaFacebookF,
  FaLinkedin,
  FaPaperclip,
  FaTwitter,
} from "react-icons/fa";
const AboutCourse = () => {
  return (
    <>
      <Container className="" style={{ marginTop: "5em" }}>
        <Row className="mt-5">
          <Col lg={9}>
            <ReactPlayer url="https://youtu.be/I2wURDqiXdM" className="my-4" />
            <div
              style={{ borderBottom: "2px black solid" }}
              className="my-4 p-4"
            >
              <h2>About the course</h2>
              <p className="mt-4 p-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <span className="">
              <FaFacebookF className="mt-3 mx-2" size={21} color="blue" />
              <FaTwitter className="mt-3 mx-2" size={21} color="aqua" />
              <FaLinkedin className="mt-3 mx-2" size={21} color="blue" />
              <FaPaperclip className="mt-3 mx-2" size={21} />
            </span>
          </Col>
          <Col lg={3} className="p-3">
            <Container className="border-secondary border p-4">
              <h2 className="mb-5">Course Content</h2>
              <ul style={{ listStyle: "square" }}>
                <li className="">
                  <h4>
                    Introduction
                    <RiArrowUpSLine className="ml-5" />
                  </h4>
                  <ul
                    className="my-2"
                    style={{ color: "blue", listStyleType: ">" }}
                  >
                    <li className="my-2">Lecture 1</li>
                    <li className="my-2">Lecture 2</li>
                    <li className="my-2">Lecture 3</li>
                  </ul>
                </li>
                <li className="my-2">
                  <h4 className="py-2">
                    Chapter 1<RiArrowDownSLine className="ml-5" />
                  </h4>
                </li>
                <li className="my-2">
                  <h4 className="py-2">
                    Chapter 2<RiArrowDownSLine className="ml-5" />
                  </h4>
                </li>
                <li className="my-2">
                  <h4 className="py-2">
                    Chapter 3<RiArrowDownSLine className="ml-5" />
                  </h4>
                </li>
              </ul>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutCourse;
