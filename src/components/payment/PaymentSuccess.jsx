import React, { useContext } from "react";
import style from "../../assets/css/paymentSuccess.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiErrorCircle, BiRupee } from "react-icons/bi";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/authContext";
import NavHeader from "../../utils/Header/index";

const PaymentSuccess = () => {
  const history = useHistory();
  const {
    personalInfo,
    lastPaymentInfo,
    setCartHandler,
    setLastPaymentInfoHandler,
  } = useContext(AuthContext);
  console.log(lastPaymentInfo);
  return (
    <>
      <NavHeader />
      <div className={style.payment}>
        <div className={style.container}>
          <div className={style.header}>
            <AiFillCheckCircle className={style.icon} />
            <div className={style.message}>Payment Successful</div>
          </div>
          <div className={style.paymentDetails}>
            <div className={style.row}>
              <div className={style.key}>Email</div>
              <div className={style.value}>{personalInfo.email}</div>
            </div>
            <div className={style.row}>
              <div className={style.key}>Order Id</div>
              <div className={style.value}>{lastPaymentInfo.orderId}</div>
            </div>
            <div className={style.row}>
              <div className={style.key}>Payment Id</div>
              <div className={style.value}>{lastPaymentInfo.paymentId}</div>
            </div>
          </div>
          <div className={style.amountContainer}>
            <div className={style.amountKey}>Amount Paid</div>
            <div className={style.amountValue}>
              <BiRupee className={style.ruppeeIcon} />
              <div className={style.digits}>{lastPaymentInfo.amount}</div>
            </div>
          </div>
          <div className={style.footer}>
            <button
              className={style.btns}
              onClick={() => {
                setCartHandler([]);
                setLastPaymentInfoHandler({});
                history.push("/");
              }}
            >
              Close
            </button>
            <button className={style.btns}>Print</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
