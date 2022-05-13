import axios from 'axios';

const getAllUsers = async () => axios.get('/api/users');

const getUserById = async (userId) => axios.get(`/api/users/id/${userId}`);

const getUserByHandler = async (userHandler) =>
  axios.get(`/api/users/handler/${userHandler}`);

const getAllBookmarkService = async (authorization) =>
  axios.get('/api/users/bookmark', { headers: { authorization } });

const postBookmarkService = async (postId, authorization) =>
  axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    { headers: { authorization } }
  );

const removeBookmarkService = async (postId, authorization) =>
  axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    { headers: { authorization } }
  );

export {
  getAllUsers,
  getUserById,
  getUserByHandler,
  getAllBookmarkService,
  postBookmarkService,
  removeBookmarkService,
};
