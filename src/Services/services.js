import axios from 'axios';

export const loginService = async ({ email, password }) => {
  return axios.post('/api/auth/login', {
    email,
    password,
  });
};

export const signUpService = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  return axios.post('/api/auth/signup', {
    email,
    password,
    firstName,
    lastName,
  });
};
