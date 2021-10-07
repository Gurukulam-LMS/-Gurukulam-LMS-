import { useState, useContext } from "react";
import style from "../../assets/css/onboarding.module.css";
import { useHttpClient } from "../../customHooks/httpHook";
import { Col, Container, Image, Row, Form, Spinner } from "react-bootstrap";
import styled, { css } from "styled-components";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import NavHeader from "../../utils/Header";

const FormControl = styled(Form.Control)`
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
  color: white;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-family: "Ubuntu";
  margin-top: 2em;
  padding: 1em;
  letter-spacing: 0.07rem;
  ${(props) =>
    props.color === "blue" &&
    css`
      background: #7d6fff;
      color: #fff;
    `}
`;

const OnBoarding2 = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  let initial = { collage: "", degree: "", startYear: null, endYear: null };
  const [educationalInfo, setEducationalInfo] = useState([initial]);

  const onboardingFormSubmit = () => {
    const formData = new FormData();
    formData.append("educationalInfo", JSON.stringify(educationalInfo));
    formData.append("userId", auth.userId);
    sendRequest(
      `${process.env.REACT_APP_BASE_URL}/auth/profile`,
      "POST",
      formData
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Onboarding Done", { position: "top-right" });
          history.push("/");
        } else {
          toast.warning(res.message, { position: "top-right" });
        }
      })
      .catch((err) => console.log(err));
  };

  const educationalInfoHandler = (e, index) => {
    const { name, value } = e.target;
    const info = [...educationalInfo];
    info[index][name] = value;
    setEducationalInfo(info);
  };

  return (
    <>
      <NavHeader />
      <Container>
        <h3 className={style.onBoardingHeader}>Onboarding</h3>
        <Container className="mt-5">
          <h3 className="p-3" style={{ fontFamily: "Ubuntu" }}>
            Educational Information
          </h3>
          {educationalInfo.map((inp, idx) => (
            <div key={idx} className={style.eduInputCont}>
              <input
                type="text"
                placeholder="Name of College/Institute"
                name="collage"
                onChange={(e) => educationalInfoHandler(e, idx)}
                className={style.input}
              />
              <select
                name="degree"
                onChange={(e) => educationalInfoHandler(e, idx)}
                className={style.input}
              >
                <option hidden value>
                  Qualification
                </option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master Degree">Master Degree</option>
                <option value="Post Doctorate">Post Doctorate</option>
              </select>

              <button
                className={style.remBtn}
                onClick={() => {
                  let info = [...educationalInfo];
                  info.splice(idx, 1);
                  setEducationalInfo(info);
                }}
              >
                Remove
              </button>
              {/* <Col lg={4} xs={4}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicName of College/Institute"
                >
                  <FormControl
                    type="text"
                    placeholder="Name of College/Institute"
                    name="collage"
                    onChange={(e) => educationalInfoHandler(e, idx)}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} xs={4}>
                <Form.Group className="mb-3 w-100" controlId="formBasicGender">
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
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master Degree">Master Degree</option>
                    <option value="Post Doctorate">Post Doctorate</option>
                  </FormControl>
                </Form.Group>
              </Col> */}
              {/* <Col lg={4} xs={6}>
                <Form.Group className="mb-3" controlId="formBasiStart Year">
                  <FormControl
                    type="text"
                    placeholder="Start Year"
                    name="startYear"
                    onChange={(e) => educationalInfoHandler(e, idx)}
                  />
                </Form.Group>
              </Col> */}
              {/* <Col lg={4} xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEnd Year">
                  <FormControl
                    type="text"
                    placeholder="End Year"
                    name="endYear"
                    onChange={(e) => educationalInfoHandler(e, idx)}
                  />
                </Form.Group>
              </Col> */}
              {/* <Col lg={4} xs={6}>
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
              </Col> */}
            </div>
          ))}
          <div className="mb-3 d-flex justify-content-center">
            <button
              className={style.remBtn}
              onClick={() => {
                setEducationalInfo([...educationalInfo, initial]);
              }}
            >
              Add More +
            </button>
          </div>
          <div className="mb-3 d-flex justify-content-center">
            {isLoading ? (
              <Spinner animation="border" variant="primary" className="mt-5" />
            ) : (
              <Button color="blue" onClick={onboardingFormSubmit}>
                Finish Onboarding
              </Button>
            )}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default OnBoarding2;
