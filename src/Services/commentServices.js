import axios from 'axios';

export const getCommentsByPostIdService = (postId) =>
  axios.get(`/api/comments/${postId}`);

export const addCommentByPostIdService = (postId, commentData, authorization) =>
  axios.post(
    `/api/comments/add/${postId}`,
    { commentData },
    { headers: { authorization } }
  );

export const editCommentService = (
  postId,
  commentId,
  commentData,
  authorization
) =>
  axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
    { commentData },
    { headers: { authorization } }
  );

export const deleteCommentService = (postId, commentId, authorization) =>
  axios.post(
    `/api/comments/delete/${postId}/${commentId}`,
    {},
    { headers: { authorization } }
  );

export const upVoteCommentService = (postId, commentId, authorization) =>
  axios.post(
    `/api/comments/upvote/${postId}/${commentId}`,
    {},
    { headers: { authorization } }
  );
