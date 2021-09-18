import React, { useContext, useState } from "react";
import "../../assets/css/profile.css";
import { AuthContext } from "../../../context/authContext";
import { Col, Container, Row, Form } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { useHttpClient } from "../../../customHooks/httpHook";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = useContext(AuthContext);

  const FormControl = styled(Form.Control)`
    border: none;
    border-bottom: 2px groove #bd97fc;
    border-radius: 0;
    margin-top: 2em;
    padding: 0.7em 1em;
    :focus {
      outline: none;
      box-shadow: none;
    }
  `;
  const Button = styled.button`
    background: #fd5a5d;
    color: #2e2e2e;
    border-radius: 10px;
    border: none;
    font-weight: 500;
    margin-top: 2em;
    padding: 0.7em 1em;
    letter-spacing: 0.07rem;
    ${(props) =>
      props.color === "blue" &&
      css`
        background: #7d6fff;
        color: #fff;
      `}
  `;

  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  let initial = { collage: null, degree: null, startYear: null, endYear: null };
  const [educationalInfo, setEducationalInfo] = useState([initial]);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: auth.personalInfo.firstName,
    lastName: auth.personalInfo.lastName,
    gender: "",
    mobileNumber: "",
    dob: "",
    country: "",
    state: "",
    city: "",
  });

  const educationalInfoHandler = (e, index) => {
    const { name, value } = e.target;
    const info = [...educationalInfo];
    info[index][name] = value;
    setEducationalInfo(info);
  };

  const onboardingFormSubmit = () => {
    const formData = new FormData();
    formData.append("personalInfo", personalInfo);
    formData.append("educationalInfo", educationalInfo);
    formData.append("userId", auth.userId);
    sendRequest(
      `${process.env.REACT_APP_BASE_URL}/auth/profile`,
      "POST",
      formData
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Onboarding Done", { position: "top-right" });
          auth.setVerificationStatus("mobile");
          history.push("/");
        } else {
          toast.warning(res.message, { position: "top-right" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container-fluid profile-head">
        <div className="container ">
          <div className="name">
            <h3>
              {auth.personalInfo.firstName + " " + auth.personalInfo.lastName}
            </h3>
            <h4>Student</h4>
          </div>
          <img
            src={auth.personalInfo.profilePic || "../dashboard/Group 256.png"}
            alt="profilePic"
            className="rounded-circle img img-fluid"
          />
        </div>
      </div>

      <div className="container account">
        <div className="row">
          <div className="col-12">
            <Container>
              <Container className="mt-5">
                <Row>
                  <Col lg={4} xs={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicFirst Name"
                    >
                      <FormControl
                        type="text"
                        placeholder="First Name"
                        value={personalInfo.firstName}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={6}>
                    <Form.Group className="mb-3" controlId="formBasicLast Name">
                      <FormControl
                        type="text"
                        placeholder="Last Name"
                        value={personalInfo.lastName}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={6}>
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formBasicGender"
                    >
                      <FormControl
                        as="select"
                        className="w-100"
                        custom
                        placeholder="Gender"
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option hidden value>
                          Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </FormControl>
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicFirst Name"
                    >
                      <FormControl
                        type="date"
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            dob: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={8} className="d-none d-lg-block"></Col>
                  <Col lg={4} xs={6}>
                    <Form.Group className="mb-3" controlId="formBasicCIty">
                      <FormControl
                        type="text"
                        placeholder="Country"
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            country: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={6}>
                    <Form.Group className="mb-3" controlId="formBasicState">
                      <FormControl
                        type="text"
                        placeholder="State"
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            state: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={6}>
                    <Form.Group className="mb-3" controlId="formBasicCountry">
                      <FormControl
                        type="text"
                        placeholder="City"
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            city: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12} className="d-flex">
                    <Form.Group
                      className="mb-3 col-8"
                      controlId="formBasicMobile"
                    >
                      <FormControl
                        type="text"
                        placeholder="Mobile Number"
                        disabled
                        value={personalInfo.mobileNumber}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <Container className="mt-5">
                <h5 className="p-3">Educational Information</h5>
                {educationalInfo.map((e, idx) => (
                  <Row key={idx}>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicName of Collage/Institude"
                      >
                        <FormControl
                          type="text"
                          placeholder="Name of Collage/Institude"
                          name="collage"
                          onChange={(e) => educationalInfoHandler(e, idx)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3 w-100"
                        controlId="formBasicGender"
                      >
                        <FormControl
                          as="select"
                          className="w-100"
                          custom
                          name="degree"
                          onChange={(e) => educationalInfoHandler(e, idx)}
                        >
                          <option hidden value>
                            Qualification
                          </option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Master Degree">Master Degree</option>
                          <option value="Post Doctorate">Post Doctorate</option>
                        </FormControl>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasiStart Year"
                      >
                        <FormControl
                          type="text"
                          placeholder="Start Year"
                          name="startYear"
                          onChange={(e) => educationalInfoHandler(e, idx)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicEnd Year"
                      >
                        <FormControl
                          type="text"
                          placeholder="End Year"
                          name="endYear"
                          onChange={(e) => educationalInfoHandler(e, idx)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <Button
                          onClick={() => {
                            let info = [...educationalInfo];
                            info.splice(idx, 1);
                            setEducationalInfo(info);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ))}
                <div className="mb-3 d-flex justify-content-center">
                  <Button
                    onClick={() => {
                      setEducationalInfo([...educationalInfo, initial]);
                    }}
                  >
                    Add More +
                  </Button>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                  <Button color="blue" onClick={onboardingFormSubmit}>
                    Finish Onboarding
                  </Button>
                </div>
              </Container>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
