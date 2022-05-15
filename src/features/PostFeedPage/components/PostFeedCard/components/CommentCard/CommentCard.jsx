import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { useOutsideClickHandler } from '../../../../../../custom-hooks';
import { ToastHandler, ToastType } from '../../../../../../utils/toastUtils';
import {
  deleteComment,
  editComment,
  likeComment,
} from '../../../../PostsSlice';

export const CommentCard = ({ comment }) => {
  const navigate = useNavigate();
  const commentMenuRef = useRef();
  const dispatch = useDispatch();
  const { token, user: authUser } = useSelector(
    (store) => store.authentication
  );
  const { allPosts } = useSelector((store) => store.posts);
  const { resetMenu } = useOutsideClickHandler(commentMenuRef);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const { _id, content, user, postId, votes, replies } = comment;
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState(content);
  const [replyInput, setReplyInput] = useState('');
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (resetMenu) {
      setOpenMenuModal(false);
    }
  }, [resetMenu]);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='flex w-full items-center gap-3'>
          <img
            onClick={() => navigate(`/profile/${user.userHandler}`)}
            className='cursor-pointer rounded-full object-cover w-10 h-10 mt-1'
            src={user.pic}
            alt='comment-profile-pic'
          />
          <p
            onClick={() => navigate(`/profile/${user.userHandler}`)}
            className='cursor-pointer font-normal'
          >{`${user.firstName} ${user.lastName}`}</p>
          <div className='ml-auto relative'>
            {authUser._id === user._id ||
            allPosts.find((el) => el._id === postId).userId === authUser._id ? (
              <i
                onClick={() => setOpenMenuModal((open) => !open)}
                className='cursor-pointer text-sm text-txt-secondary-color font-bold fas fa-ellipsis-v'
              ></i>
            ) : null}
            {openMenuModal ? (
              <div ref={commentMenuRef} className='absolute right-0'>
                <div className='w-24  text-txt-secondary-color dark:text-dark-txt-secondary-color bg-secondary-background dark:bg-dark-nav-background rounded-lg'>
                  {authUser._id === user._id ? (
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setOpenMenuModal(false);
                      }}
                      className='flex gap-1 items-center w-full px-2.5 py-1.5 text-sm font-medium  rounded-lg hover:text-blue-700 focus:z-10   focus:text-blue-700'
                    >
                      <i className='far fa-edit'></i>
                      Edit
                    </button>
                  ) : null}
                  <button
                    onClick={() => {
                      dispatch(
                        deleteComment({ postId, commentId: _id, token })
                      );
                      setOpenMenuModal(false);
                    }}
                    className='flex gap-1 items-center w-full px-2.5 py-1.5 text-sm font-medium  rounded-lg text-red-500 hover:text-red-500 focus:z-10   focus:text-red-600'
                  >
                    <i className='far fa-trash-alt'></i>
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex flex-col gap-1 px-3'>
          {!isEdit ? (
            <p className='font-light text-lg text-txt-secondary-color'>
              {content}
            </p>
          ) : (
            <div className='w-full flex flex-col gap-2 '>
              <input
                className='w-full bg-background dark:bg-dark-background dark:text-dark-txt-secondary-color mt-1  border border-txt-hover-color  active:outline-none focus:outline-none rounded-md py-0.5 px-3'
                value={editInput}
                type='text'
                onChange={(e) => setEditInput(e.target.value)}
              />
              <div className='flex gap-1 ml-auto'>
                <button
                  onClick={() => setIsEdit(false)}
                  className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:outline-none   rounded-md text-sm px-4 py-1 text-center'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editInput === '') {
                      ToastHandler(
                        ToastType.Info,
                        'Pls Write something in edit comment box'
                      );
                      return;
                    }
                    dispatch(
                      editComment({
                        postId,
                        commentId: _id,
                        commentData: { ...comment, content: editInput },
                        token,
                      })
                    );
                    setIsEdit(false);
                  }}
                  className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600  hover:bg-gradient-to-br focus:outline-none   font-medium rounded-md text-sm px-4 py-1 text-center'
                >
                  Post
                </button>
              </div>
            </div>
          )}
          <div className='flex gap-3'>
            <div className='flex gap-1 items-center'>
              {votes.upvotedBy.some((us) => us._id === authUser._id) ? (
                <i
                  onClick={() =>
                    dispatch(likeComment({ postId, commentId: _id, token }))
                  }
                  className='text-primary fas fa-thumbs-up'
                ></i>
              ) : (
                <i
                  onClick={() =>
                    dispatch(likeComment({ postId, commentId: _id, token }))
                  }
                  className='text-primary far fa-thumbs-up'
                ></i>
              )}
              {votes.upvotedBy.length > 0 ? (
                <span className='text-primary'>{votes.upvotedBy.length}</span>
              ) : null}
            </div>
            <p
              onClick={() => setShowReply(true)}
              className='font-light text-primary cursor-pointer'
            >
              Reply
            </p>
          </div>
          {showReply ? (
            <div className='w-full flex flex-col gap-2 '>
              <input
                value={replyInput}
                placeholder='Enter your Reply'
                className='w-full bg-background dark:text-dark-txt-secondary-color dark:bg-dark-background mt-1  border border-txt-hover-color  active:outline-none focus:outline-none rounded-md py-0.5 px-3'
                type='text'
                onChange={(e) => setReplyInput(e.target.value)}
              />
              <div className='flex gap-1 ml-auto'>
                <button
                  onClick={() => {
                    setShowReply(false);
                    setReplyInput('');
                  }}
                  className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:outline-none   rounded-md text-sm px-4 py-1 text-center'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (replyInput === '') {
                      ToastHandler(
                        ToastType.Info,
                        'Pls Write something in reply comment box'
                      );
                      return;
                    }
                    dispatch(
                      editComment({
                        postId,
                        commentId: _id,
                        commentData: {
                          ...comment,
                          replies: comment.replies.concat({
                            _id: v4(),
                            user: authUser,
                            content: replyInput,
                          }),
                        },
                        token,
                      })
                    );
                    setReplyInput('');
                    setShowReply(false);
                  }}
                  className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600  hover:bg-gradient-to-br focus:outline-none   font-medium rounded-md text-sm px-4 py-1 text-center'
                >
                  Post
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {replies.map((el) => {
        return (
          <div key={el._id} className='flex gap-4 flex-grow pl-12'>
            <img
              className='rounded-full object-cover w-9 h-9 mt-1'
              src={el.user.pic}
              alt='comment-profile-pic'
            />
            <div>
              <p className='font-normal'>{`${el.user.firstName} ${el.user.lastName}`}</p>
              <p className='font-light text-txt-secondary-color'>
                {el.content}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
