import React from "react";
import style from "../../assets/css/Authentication.module.css";
import Auth from "./Auth";

const Authentication = () => {
  return (
    <div className={style.container}>
      <div className={style.leftPane}>
        <div className={style.brandName}>GURUKULAM</div>
      </div>
      <div className={style.rightPane}>
        <Auth />
      </div>
    </div>
  );
};

export default Authentication;
