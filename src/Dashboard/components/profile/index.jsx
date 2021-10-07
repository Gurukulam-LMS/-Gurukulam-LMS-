import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import style from "../../../assets/css/Profile.module.css";
import PersonIcon from "../../../assets/Images/Person-icon.png";
import { useHistory } from "react-router";

const Profile = () => {
  const { personalInfo, educationalInfo } = useContext(AuthContext);
  console.log(personalInfo);
  return (
    <div className={style.container}>
      <div className={style.profilePicContainer}>
        <img src={PersonIcon} alt="PersonIcon" />
        <div className={style.profileName}>{personalInfo.name}</div>
      </div>
      <div className={style.profileDetailsContainer}>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Email Address</div>
            <div className={style.val}>{personalInfo.email}</div>
          </div>
          <div className={style.details}>
            <div className={style.label}>Mobile Number</div>
            <div className={style.val}>9931614519</div>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Gender</div>
            <div className={style.val}>Male</div>
          </div>
          <div className={style.details}>
            {/* <div className={style.label}>DOB</div> */}
            {/* <div className={style.val}>Sept 5 2021</div> */}
          </div>
        </div>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Country</div>
            <div className={style.val}>India</div>
          </div>
          <div className={style.details}>
            {/* <div className={style.label}>Email Address</div> */}
            {/* <div className={style.val}>alimodassir@gmail.com</div> */}
          </div>
        </div>
        <a href="/onboarding">
          <button className={style.btn}>UPDATE</button>
        </a>
        <div className={style.educationalInfo}>EDUCATIONAL INFO</div>
        <div className={style.row}>
          <div className={style.details}>
            <div className={style.label}>Education</div>
            <div className={style.val}>Secondary/High School</div>
          </div>
          <div className={style.details}>
            <div className={style.label}>Name of college/school</div>
            <div className={style.val}>Oxford</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
