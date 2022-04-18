import { createContext, useState, useContext } from 'react';
import { loginService, signUpService } from '../Services/services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem('loginItems'));
  const [token, setToken] = useState(localStorageToken?.token);
  const [user, setUser] = useState(localStorageToken?.user);

  const loginHandler = async (email, password) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await loginService({ email, password });
      if (status === 200 || status === 201) {
        localStorage.setItem(
          'loginItems',
          JSON.stringify({ token: encodedToken, user: foundUser })
        );
        setUser(foundUser);
        setToken(encodedToken);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem('loginItems');
    setUser(null);
    setToken(null);
  };
  const signupHandler = async (email, password, firstName, lastName) => {
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await signUpService({ email, password, firstName, lastName });
      if (status === 200 || status === 201) {
        localStorage.setItem(
          'loginItems',
          JSON.stringify({ token: encodedToken, user: createdUser })
        );
        setUser(createdUser);
        setToken(encodedToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loginHandler, signupHandler, logoutHandler, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
