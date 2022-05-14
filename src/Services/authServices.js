import axios from 'axios';

export const loginService = async ({ username, password }) => {
  return axios.post('/api/auth/login', {
    username,
    password,
  });
};

export const signUpService = async ({
  username,
  password,
  firstName,
  lastName,
}) => {
  return axios.post('/api/auth/signup', {
    username,
    password,
    firstName,
    lastName,
  });
};

export const userUpdateService = async ({ userData, encodedToken }) => {
  return axios.post(
    '/api/users/edit',
    {
      userData,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
};
