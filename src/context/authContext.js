import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  educationalInfo: [],
  personalInfo: {},
  verification: {},
  token: null,
  cart: [],
  lastPaymentInfo: {},
  myCourses: [],
  setLastPaymentInfoHandler: () => {},
  setCartHandler: () => [],
  setVerificationStatus: () => {},
  login: () => {},
  logout: () => {},
  googleLogin: () => {},
});
