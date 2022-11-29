import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('access_token'));

  const signin = (token) => {
    setUserToken(token);
    localStorage.setItem('access_token', token);
  };

  const signout = () => {
    setUserToken(null);
    localStorage.removeItem('access_token');
  };

  const value = useMemo(() => ({ userToken, signin, signout }), [userToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
