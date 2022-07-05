import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  isAdmin:false,
  userId:'',
  login: (token,isAdmin,userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialAdmin = localStorage.getItem('isAdmin');
  const initialUserId = localStorage.getItem('userId');
  const [token, setToken] = useState(initialToken);
  const [isAdmin, setIsAdmin] = useState(initialAdmin);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token;

  const loginHandler = (token,isAdmin,userId) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setUserId(userId);
    localStorage.setItem('token',token);
    localStorage.setItem('isAdmin',isAdmin);
    localStorage.setItem('userId', userId);
  };

  const logoutHandler = () => {
    setToken(null);
    setIsAdmin(false);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isAdmin: isAdmin,
    userId:userId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;