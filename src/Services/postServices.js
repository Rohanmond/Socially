import axios from 'axios';

const getAllPostsService = () => axios.get('/api/posts');

const getAllPostsOfUserService = (username) =>
  axios.get(`/api/posts/user/${username}`);

const getPostByIdService = (postId) => axios.get(`/api/posts/${postId}`);

const getPostsByObserverService = (limit, page) =>
  axios.get(`/api/posts/${limit}/${page}`);

const addPostService = (postData, authorization) =>
  axios.post('/api/posts', { postData }, { headers: { authorization } });

const editPostService = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    { headers: { authorization } }
  );

const deletePostService = (postId, authorization) =>
  axios.delete(`/api/posts/${postId}`, { headers: { authorization } });

const likePostService = (postId, authorization) =>
  axios.post(`/api/posts/like/${postId}`, {}, { headers: { authorization } });

const dislikePostService = (postId, authorization) => {
  return axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization },
    }
  );
};

export {
  getAllPostsService,
  getAllPostsOfUserService,
  addPostService,
  editPostService,
  deletePostService,
  likePostService,
  dislikePostService,
  getPostByIdService,
  getPostsByObserverService,
};
