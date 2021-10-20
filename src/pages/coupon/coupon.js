import React, { useRef } from "react";
import style from "../../assets/css/coupon.module.css";
import { useHttpClient } from "../../customHook/http-hook";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const Coupon = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const reRef = useRef();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("type", "public");
    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    formData.append("token", token);
    sendRequest(
      process.env.REACT_APP_API_URL + "/coupon/createCoupon",
      "POST",
      JSON.stringify(Object.fromEntries(formData)),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.message);
        } else {
          console.log(res);
          toast.warn(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.heading}>Coupon Generation</div>
      <form className={style.formContainer} onSubmit={formSubmitHandler}>
        <div className={style.row}>
          <div className={style.label}>Coupon Code</div>
          <input type="text" className={style.inputText} name="couponcode" />
        </div>
        <div className={style.row}>
          <div className={style.label}>Discount Percentage</div>
          <input
            type="number"
            className={style.inputText}
            name="discountpercentage"
          />
        </div>
        <div className={style.row}>
          <div className={style.label}>Max Students</div>
          <input type="number" className={style.inputText} name="maxstudents" />
        </div>
        <div className={style.row}>
          <div className={style.label}>Start Date</div>
          <input type="date" className={style.inputText} name="starttime" />
        </div>
        <div className={style.row}>
          <div className={style.label}>Expiry Date</div>
          <input type="date" className={style.inputText} name="expirytime" />
        </div>

        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <button type="submit" className={style.btn}>
            SAVE COUPON
          </button>
        )}
      </form>

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={reRef}
      />
    </div>
  );
};

export default Coupon;
