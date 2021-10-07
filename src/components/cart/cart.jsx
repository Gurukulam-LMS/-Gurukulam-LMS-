import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/cart.css";
import { CourseContext } from "../../context/courseContext";
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/httpHook";
import logo from "../../assets/Images/brand/brand-01.png";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import NavHeader from "../../utils/Header/index";

const Cart = () => {
  const { allCourses } = useContext(CourseContext);

  const history = useHistory();

  const {
    cart,
    userId,
    setCartHandler,
    personalInfo,
    setLastPaymentInfoHandler,
  } = useContext(AuthContext);

  const [couponError, setCouponErr] = useState(null);
  const [couponSuccess, setCouponSuccess] = useState(null);
  const cartDetails = [];
  var totalPrice = 0;

  cart.forEach((courseId) => {
    let courseDetails = allCourses.find((course) => course._id === courseId);
    totalPrice += Number((courseDetails && courseDetails.price) || 0);
    cartDetails.push(courseDetails);
  });

  const [couponDetails, setCouponDetails] = useState([]);
  const [selectedCoupan, setSelectedCoupan] = useState("");
  const [couponId, setCoupanId] = useState(null);

  const { sendRequest } = useHttpClient();
  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_ADMIN_URL}/coupon/getCoupon?id=${userId}`
    )
      .then((res) => {
        setCouponDetails(res.coupon);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromCarHandler = (courseId) => {
    const query = userId + "=" + courseId;
    setTimeout(() => {
      sendRequest(`${process.env.REACT_APP_BASE_URL}/cart/modifyCart/${query}`)
        .then((res) => {
          if (res.ok) {
            setCartHandler(res.cart);
            toast.success(res.message, { position: "top-right" });
          } else {
            toast.warning(res.message, { position: "top-right" });
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  const [finalAmt, setfinalAmt] = useState(totalPrice);

  const submitCoupon = () => {
    const body = {
      couponCode: selectedCoupan,
      cartAmount: totalPrice,
      userId: userId,
    };
    sendRequest(
      `${process.env.REACT_APP_ADMIN_URL}/coupon/verifyCoupon`,
      "POST",
      JSON.stringify(body),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        setCouponSuccess("Successfully Applied Coupon");
        setfinalAmt(res.finalAmount);
      })
      .catch((err) => {
        console.log(err);
        setCouponErr(err.message);
      });
  };

  //Payment
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = {};
    //...fill your object like this for example
    data["amount"] = parseInt(finalAmt);

    // axios.post("profile/student", profile).then((res) => {
    //   return res;
    // });

    const result = await axios.post(
      process.env.REACT_APP_ADMIN_URL + "/payment/orders",
      data
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_9ttGdk529gKAry", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: personalInfo.firstName,
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          userId: userId,
          courseId: cart,
          amount: finalAmt,
          couponId: couponId,
          name: personalInfo.firstName,
        };

        const result = await axios.post(
          process.env.REACT_APP_ADMIN_URL + "/payment/success",
          data
        );

        //checkout coupon api

        setLastPaymentInfoHandler({ ...result.data, amount: finalAmt });
        history.push("/payment/response");
      },
      prefill: {
        name: personalInfo.firstName,
        email: personalInfo.email,
        contact: "9999999999",
      },
      notes: {
        address:
          personalInfo.firstName +
          ", " +
          personalInfo.state +
          ", " +
          personalInfo.country,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <NavHeader />
      <div className="cart">
        <h2>Cart</h2>
      </div>
      <div className="course-card">
        <div className="allcourse-card">
          {cartDetails.map((course, index) => {
            if (!course) return;
            return (
              <div className="courses" key={index}>
                <img src={course.thumbnail} alt="logo" />
                <div className="card-content">
                  <h4>{course.title}</h4>
                  <div class="stars">
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <button
                    className="removeFromCartBtn"
                    onClick={() => removeFromCarHandler(course._id)}
                  >
                    Remove From Cart
                  </button>
                </div>
                <div className="price">
                  <FaRupeeSign style={{ fontSize: "19px" }} />
                  <span className="price-amount">{course.price}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="summary">
          <h2>Summary</h2>
          <div className="total">
            <h6>Subtotal</h6>
            <p className="amount">
              <FaRupeeSign style={{ fontSize: "18px" }} />
              {totalPrice}
            </p>
          </div>
          <div className="applyCouponLabel"> Apply Coupon</div>
          <div className="inputBtnContainer">
            <input
              type="text"
              placeholder="Enter Coupon"
              value={selectedCoupan}
              className="applyCoupanInput"
            />
            <button className="applyBtn" onClick={submitCoupon}>
              Apply
            </button>
          </div>
          {!!couponSuccess && (
            <Alert
              variant="success"
              style={{ margin: "10px 10px 10px 0", width: "75%" }}
            >
              {couponSuccess}
              <br />
              You have availed discount of Rs.{totalPrice - finalAmt}
            </Alert>
          )}
          {!!couponError && (
            <Alert
              variant="danger"
              style={{ margin: "10px 10px 10px 0", width: "75%" }}
            >
              {couponError}
            </Alert>
          )}
          <br />
          {couponDetails.map((coupon, idx) => {
            return (
              <div className="cart-coupans">
                <div className="cart-coupans-labelContainer">
                  <input
                    type="radio"
                    id={idx}
                    name="couponcode"
                    value={coupon.couponcode}
                    className="radioInput"
                    onChange={(e) => {
                      setCouponSuccess(null);
                      setCouponErr(null);
                      setSelectedCoupan(e.target.value);
                      setCoupanId(coupon._id);
                    }}
                  />
                  <label htmlFor={idx} className="radioLabel">
                    {coupon.couponcode}
                  </label>
                </div>
                <p className="cart-coupon-text">
                  Use this coupon and avail {coupon.discountpercentage}%
                  discount
                </p>
              </div>
            );
          })}
          <br />
          <br />
          <div className="total">
            <h6>Total</h6>
            <p className="amount">
              <FaRupeeSign style={{ fontSize: "18px" }} />
              {finalAmt === 0 ? totalPrice : finalAmt}
            </p>
          </div>
          <div className="make-payment">
            <button onClick={displayRazorpay} className="makePaymentBtn">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
