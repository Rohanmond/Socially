import axios from 'axios';

const getAllUsers = async () => axios.get('/api/users');

const getUserById = async (userId) => axios.get(`/api/users/id/${userId}`);

const getUserByHandler = async (userHandler) =>
  axios.get(`/api/users/handler/${userHandler}`);

export { getAllUsers, getUserById, getUserByHandler };
