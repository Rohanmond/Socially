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
    username: `${lastName.toLowerCase()}${firstName.toLowerCase()}`,
    bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    pic: 'https://res.cloudinary.com/donqbxlnc/image/upload/v1651664931/avatar-1577909_960_720_cl1ooh.png',
  });
};
