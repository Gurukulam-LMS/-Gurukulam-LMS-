import { useContext, useState } from "react";
import { Col, Container, Image, Row, Form, Spinner } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import Avatar from "../../assets/Images/Person-icon.png";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/httpHook";
import { useHistory } from "react-router-dom";
import NavHeader from "../../utils/Header/index";
import style from "../../assets/css/onboarding.module.css";

const FormLabel = styled(Form.Label)`
  font-size: 1.15rem;
  font-weight: bold;
  font-family: "Ubuntu";
  color: #484444;
`;

const FormGroup = styled(Form.Group)`
  margin: 15px;
`;

const FormControl = styled(Form.Control)`
  border-radius: 0;
  width: 330px;
  padding: 0.7em 1em;
  :focus {
    outline: none;
    box-shadow: none;
  }
`;
const Button = styled.button`
  background: blue;
  color: white;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-family: "Ubuntu";
  letter-spacing: 0.07rem;
  padding: 10px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.color === "blue" &&
    css`
      background: #7d6fff;
      color: #fff;
    `};
`;
const OnBoarding = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const history = useHistory();

  //File Preview
  const fileChangeHandler = (e) => setFile(e.target.files[0]);
  const [previewSrc, setPreviewSrc] = useState("");
  const [file, setFile] = useState(null);
  const fileReader = new FileReader();
  fileReader.onload = () => setPreviewSrc(fileReader.result);
  if (file) fileReader.readAsDataURL(file);

  const [otp, setOtp] = useState(null);
  const [otpResponseId, setOtpResponseId] = useState(null);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState(null);

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

  const onboardingFormSubmit = () => {
    const formData = new FormData();
    formData.append("personalInfo", JSON.stringify(personalInfo));
    formData.append("userId", auth.userId);
    formData.append("profileImage", file);
    sendRequest(
      `${process.env.REACT_APP_BASE_URL}/auth/profile`,
      "POST",
      formData
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Onboarding Done", { position: "top-right" });
          auth.setVerificationStatus("mobile");
          history.push("/onboarding2");
        } else {
          toast.warning(res.message, { position: "top-right" });
        }
      })
      .catch((err) => console.log(err));
  };

  const mobileNumberVerify = () => {
    const mobileNumber = personalInfo.mobileNumber;
    setTimeout(() => {
      sendRequest(
        process.env.REACT_APP_BASE_URL + "/auth/mobileNumberVerify",
        "POST",
        JSON.stringify({ mobileNumber }),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          if (res.ok) {
            setOtpResponseId(res.id);
            toast.success(res.message, { position: "top-right" });
          } else {
            toast.error(res.message, { position: "top-right" });
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  const verifyOtp = () => {
    setTimeout(() => {
      sendRequest(
        process.env.REACT_APP_BASE_URL + "/auth/verifyOTP",
        "POST",
        JSON.stringify({ id: otpResponseId, token: otp, userId: auth.userId }),
        {
          "Content-Type": "application/json",
        }
      )
        .then((res) => {
          console.log(res);
          if (res.ok) {
            toast.success(res.message, { position: "top-right" });
            setOtpSuccessMessage(res.message);
          } else {
            toast.warning(res.message, { position: "top-right" });
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  return (
    <>
      <NavHeader />

      <h3 className={style.onBoardingHeader}>Onboarding</h3>

      <br />
      <div className={style.wrapper}>
        <div className={style.wrapperContainer}>
          <div style={{ position: "relative" }}>
            <input
              type="file"
              name="profilePic"
              accept=".png,.jpeg,.jpg"
              id="profilePicBtn"
              style={{ display: "none" }}
              onChange={fileChangeHandler}
            />
            <Image
              fluid
              src={previewSrc || Avatar}
              alt="..."
              style={{
                borderRadius: "50%",
                height: "170px",
                width: "170px",
                margin: "10px",
              }}
            />
            <label htmlFor="profilePicBtn">
              <AiFillPlusCircle
                color="#507193"
                size="45"
                style={{
                  position: "absolute",
                  top: 130,
                  left: 110,
                }}
              />
            </label>
          </div>

          <h4
            className="p-3"
            style={{ fontFamily: "Ubuntu", fontWeight: "bold" }}
          >
            Personal Information
          </h4>

          <div className={style.row}>
            <FormGroup className="mb-3" controlId="formBasicFirst Name">
              <FormLabel>First Name *</FormLabel>
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
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicLast Name">
              <FormLabel>Last Name *</FormLabel>
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
            </FormGroup>
          </div>
          <div className={style.row}>
            <FormGroup
              className="mb-3"
              controlId="formBasicGender Name"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <FormLabel>Gender *</FormLabel>
              <FormControl
                as="select"
                placeholder="Gender"
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    gender: e.target.value,
                  })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </FormControl>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicFirst Name">
              <FormLabel>Date of Birth *</FormLabel>
              <FormControl
                type="date"
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, dob: e.target.value })
                }
              />
            </FormGroup>
          </div>
          <div className={style.row}>
            <FormGroup className="mb-3" controlId="formBasicCIty">
              <FormLabel>Country *</FormLabel>
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
            </FormGroup>
          </div>
          <div className={style.numContainer}>
            <Form.Group controlId="formBasicMobile">
              <FormLabel>Mobile Number *</FormLabel>
              <FormControl
                type="text"
                placeholder="Mobile Number"
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    mobileNumber: e.target.value,
                  })
                }
              />
            </Form.Group>
            <button className={style.otpBtn} onClick={mobileNumberVerify}>
              Get OTP
            </button>
          </div>
          {!!otpResponseId && (
            <div className={style.numContainer}>
              <Form.Group controlId="formBasicOtp">
                <FormControl
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>

              <button className={style.otpBtn} onClick={verifyOtp}>
                Verify
              </button>
            </div>
          )}

          {isLoading ? (
            <Spinner animation="border" variant="primary" className="mt-5" />
          ) : (
            <Button
              color="blue"
              onClick={onboardingFormSubmit}
              className="ml-3 mt-4"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default OnBoarding;
