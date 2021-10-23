import style from "../../../assets/css/PurchaseHistory.module.css";
import { Accordion } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { CourseContext } from "../../../context/courseContext";

const PurchaseHistory = () => {
  const { userId, myCourses } = useContext(AuthContext);
  const { allCourses } = useContext(CourseContext);

  const [payment, setPayment] = useState([]);

  const getCourseName = (id) => {
    // console.log(id);
    const getCourse = allCourses?.find((course) => course._id == id.id);
    console.log(getCourse);
    return getCourse;
  };

  const dateHandler = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(async () => {
    const api_url = `${process.env.REACT_APP_ADMIN_URL}/payment/paymentHistory/${userId}`;
    try {
      const data = await fetch(api_url);
      const res = await data.json();
      if (data.status === 200) setPayment(res.payments);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>Purchase History</div>

        <Accordion>
          {payment?.map((pay, idx) => {
            return (
              <Accordion.Item eventKey={idx}>
                <Accordion.Header>
                  <div className={style.courseName}>
                    Payment Date: {dateHandler(pay.createdAt)}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className={style.row}>
                    <div className={style.label}>Courses Purshased</div>
                    {pay.courseId?.map((id, idx) => (
                      <div className={style.value} key={idx}>
                        {getCourseName(id)?.title},{" "}
                      </div>
                    ))}
                  </div>
                  <div className={style.row}>
                    <div className={style.label}>Coupon Used : </div>
                    <div className={style.value}>{pay.couponId || "No"}</div>
                  </div>

                  <div className={style.row}>
                    <div className={style.label}>Total Paid : </div>
                    <div className={style.value}>{pay.amount}</div>
                  </div>
                  <div className={style.row}>
                    <div className={style.label}>OrderId : </div>
                    <div className={style.value}>{pay.razorpayOrderId}</div>
                  </div>
                  <div className={style.row}>
                    <div className={style.label}>PaymentId : </div>
                    <div className={style.value}>{pay.razorpayPaymentId}</div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default PurchaseHistory;
