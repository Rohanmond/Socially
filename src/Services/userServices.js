import axios from 'axios';

const getAllUsersService = async () => axios.get('/api/users');

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

const followUserService = async (followUserId, authorization) =>
  axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    { headers: { authorization } }
  );

const unFollowUserService = async (followUserId, authorization) =>
  axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    { headers: { authorization } }
  );

export {
  getAllUsersService,
  getUserById,
  getUserByHandler,
  getAllBookmarkService,
  postBookmarkService,
  removeBookmarkService,
  followUserService,
  unFollowUserService,
};
