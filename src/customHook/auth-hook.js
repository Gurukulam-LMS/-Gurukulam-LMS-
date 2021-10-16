import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [adminId, setAdminId] = useState(null);
  const [adminDetails, setAdminDetails] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  //Local-login saving-token-to-localStorage
  const login = useCallback(
    (accesstoken, admindetails, adminid, expirationDate) => {
      setToken(accesstoken);
      setAdminId(adminid);
      setAdminDetails(admindetails);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "adminDetails",
        JSON.stringify({
          adminId: adminid,
          adminDetails: admindetails,
          token: accesstoken,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  //logout
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setAdminId(null);
    setAdminDetails({});
    localStorage.removeItem("adminDetails");
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
    if (!!localStorage.getItem("adminDetails")) {
      storedData = JSON.parse(localStorage.getItem("adminDetails"));
    }
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.adminDetails,
        storedData.adminId,
        new Date(storedData.expiration)
      );
    }
  }, [login, token]);

  useEffect(async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/auth/getAllUsers`
    );
    const res = await data.json();
    if (data.status === 200) {
      setAllUsers(res.allUsers);
    }
  }, []);

  return {
    adminId,
    adminDetails,
    token,
    login,
    logout,
    allUsers,
  };
};
