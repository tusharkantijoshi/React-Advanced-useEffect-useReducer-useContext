import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //! by default setIsLoggedIn is false

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn'); //! to add the isLoggedIn key in the localStorage

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true); //! updating the state of isLoggedIn
    }
  }, []); //! [] -> array of dependencies. useEffect function will only run if any dependencies/ state changes. empty [] specify no dependencies/ state, useEffect will run once when our component starts up because thereafter the dependencies/ state never change

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn'); //! to remove the isLoggedIn key from the localStorage

    setIsLoggedIn(false); //! updating the state of isLoggedIn
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1'); //! to remove the isLoggedIn key from the localStorage

    setIsLoggedIn(true); //! updating the state of isLoggedIn
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
