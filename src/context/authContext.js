import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  adminDetails: {},
  adminId: null,
  login: () => {},
  logout: () => {},
});
