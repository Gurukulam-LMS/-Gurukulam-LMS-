import { useState, useContext, useRef } from "react";
import style from "../../assets/css/onboarding.module.css";
import { useHttpClient } from "../../customHooks/httpHook";
import { Container, Image, Row, Form, Spinner } from "react-bootstrap";
import styled, { css } from "styled-components";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import NavHeader from "../../utils/Header";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from "react";

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
  const currEduInfo = auth.educationalInfo || [];
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();
  let initial = { collage: "", degree: "", startYear: null, endYear: null };
  const [educationalInfo, setEducationalInfo] = useState([initial]);

  useEffect(() => {
    const prevData = [...educationalInfo];
    currEduInfo.forEach((info) => {
      const reqInfo = { ...info };
      delete reqInfo["_id"];
      prevData.unshift(reqInfo);
    });
    if (prevData.length != 0) {
      prevData.pop();
    }
    setEducationalInfo(prevData);
  }, []);

  const reRef = useRef();

  const onboardingFormSubmit = async () => {
    const formData = new FormData();
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    formData.append("token", token);
    formData.append("educationalInfo", JSON.stringify(educationalInfo));
    formData.append("userId", auth.userId);
    sendRequest(
      `${process.env.REACT_APP_BASE_URL}/auth/profile`,
      "POST",
      formData
    )
      .then((res) => {
        if (res.ok) {
          auth.educationalInfoHandler(res.educationalInfo);
          toast.success("Onboarding Done");
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
              value={educationalInfo[idx].collage}
            />
            <select
              name="degree"
              onChange={(e) => educationalInfoHandler(e, idx)}
              className={style.input}
              value={educationalInfo[idx].degree}
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
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={reRef}
      />
    </>
  );
};

export default OnBoarding2;
