import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import style from "../../../assets/css/Profile.module.css";
import PersonIcon from "../../../assets/Images/Person-icon.png";

const Profile = () => {
  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const { personalInfo, educationalInfo } = useContext(AuthContext);

  return (
    <div className={style.container}>
      <div className={style.profilePicContainer}>
        <img
          src={
            !!personalInfo.profileImage
              ? process.env.REACT_APP_API_URL + "/" + personalInfo.profileImage
              : PersonIcon
          }
          alt="PersonIcon"
        />
        <div className={style.profileName}>
          {personalInfo.firstName + " " + (personalInfo.lastName || "")}
        </div>
      </div>
      <div className={style.profileDetailsContainer}>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Email Address</div>
            <div className={style.val}>{personalInfo.email}</div>
          </div>
          <div className={style.details}>
            <div className={style.label}>Mobile number</div>
            <div className={style.val}>
              {!!personalInfo.mobileNumber
                ? "********" + personalInfo.mobileNumber.slice(-2)
                : "Add mobile number"}
            </div>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Gender</div>
            <div className={style.val}>
              {personalInfo.gender || "Add gender"}
            </div>
          </div>
          <div className={style.details} style={{ textAlign: "left" }}>
            <div className={style.label}>Date of Birth</div>
            <div className={style.val}>{dateHandler(personalInfo.dob)}</div>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Country</div>
            <div className={style.val}>
              {personalInfo.country || "Add your country"}
            </div>
          </div>
          <div className={style.details}>
            {/* <div className={style.label}>Email Address</div> */}
            {/* <div className={style.val}>alimodassir@gmail.com</div> */}
          </div>
        </div>

        {educationalInfo.length > 0 && (
          <div className={style.educationalInfo}>EDUCATIONAL INFO</div>
        )}

        {educationalInfo.map((info, idx) => {
          return (
            <div className={style.row} key={idx}>
              <div className={style.details}>
                <div className={style.label}>Education</div>
                <div className={style.val}>{info.degree}</div>
              </div>
              <div className={style.details}>
                <div className={style.label}>Name of college/school</div>
                <div className={style.val}>{info.collage}</div>
              </div>
            </div>
          );
        })}
        <a href="/onboarding">
          <button className={style.btn}>UPDATE</button>
        </a>
      </div>
    </div>
  );
};

export default Profile;
