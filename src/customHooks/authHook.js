import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  const [educationalInfo, setEducationalInfo] = useState([]);
  const [verification, setVerification] = useState({});
  const [myCourses, setMyCourses] = useState([]);

  //Local-login saving-token-to-localStorage
  const login = useCallback(
    (uid, perInfo, eduInfo, verf, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setPersonalInfo(perInfo);
      setEducationalInfo(eduInfo);
      setVerification(verf);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          educationalInfo: eduInfo,
          personalInfo: perInfo,
          verification: verf,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const setVerificationStatus = useCallback((type) => {
    if (type === "mobile") {
      verification.mobile = true;
    } else if (type === "email") {
      verification.email = true;
    }

    const data = JSON.parse(localStorage.getItem("userData"));

    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...data,
        verification: verification,
      })
    );
  });

  //Google-login
  const googleLogin = useCallback((token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  //logout
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    let storedData = null;
    if (!!localStorage.getItem("userData")) {
      storedData = JSON.parse(localStorage.getItem("userData"));
    }
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.personalInfo,
        storedData.educationalInfo,
        storedData.verification,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login, token]);

  const [cart, setCart] = useState([]);
  const setCartHandler = useCallback((data) => {
    setCart(data);
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/cart/getCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) setCart(res.cart);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  //Mycourses  Handler
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/dash/getMyCourses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then(async (res) => {
        return [await res.json(), res.status];
      })
      .then(([res, status]) => {
        if (status === 201) {
          setMyCourses(res.myCourses);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return {
    token,
    login,
    logout,
    userId,
    personalInfo,
    educationalInfo,
    verification,
    cart,
    myCourses,
    setCartHandler,
    googleLogin,
    setVerificationStatus,
  };
};
