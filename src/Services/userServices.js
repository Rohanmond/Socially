import axios from 'axios';

const getAllUsers = async () => axios.get('/api/users');

const getUserById = async (userId) => axios.get(`/api/users/${userId}`);

export { getAllUsers, getUserById };
