import React from 'react'
import "../../assets/css/CoursesNew.css"
import { Link } from 'react-router-dom'
import { Col, Row, Image, Button } from 'react-bootstrap';
import maskImg from '../../assets/Images/Mask Group 41.png'
import { FaStar } from 'react-icons/fa'

const data = [1, 2, 3]
function Courses() {
    return (
        <>
            <div className="container">
                <div className="headline">
                    <h2>Courses</h2>
                    <Link to={'/create'} className="top-btn">Create Courses</Link>
                </div>
            </div>
            <div className="text-dark">
                {data.map(e => (
                    <Row className="container border align-items-lg-center justify-content-center w-100 p-2 mb-4 boxes">
                        <Col lg={2} md={3} xs={3} className="p-2">
                            <Image height='80' width="120" src={maskImg} alt="..." fluid />
                        </Col>
                        <Col lg={4} md={4} xs={4}>
                            <p className="font-weight-bold my-2">Data Science and Machine Learning with Python - Hands On!</p>
                            <p>Jason Williams</p>
                            <FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" />
                        </Col>
                        <Col lg={3} md={4} xs={3} className="text-center category">
                            <p className="font-weight-bold mb-0">Science Project</p>
                            <h5>29 Lecture</h5>
                        </Col>
                        <Col lg={2} md={1} xs={1}>
                            <p className="font-weight-bold text-right">$398</p>
                        </Col>
                        <Col lg={1} md={5} xs={5} className="mr-2">
                            <Button className="mx-0 mt-2 edit-btn" variant="outline-secondary">Edit</Button>
                        </Col>
                    </Row>
                ))
                }
            </div>
        </>
    )
}

export default Courses;