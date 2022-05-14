import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './PostFeedCard.css';
import { useOutsideClickHandler } from '../../../../custom-hooks';
import { getUserById } from '../../../../Services/userServices';
import {
  postBookmark,
  removeBookmark,
} from '../../../Authentication/authenticationSlice';
import {
  addComment,
  deletePost,
  dislikePost,
  likePost,
} from '../../PostsSlice';
import { openEditPostHandler } from '../../toggleEditPostModalSlice';
import { ToastHandler, ToastType } from '../../../../utils/toastUtils';
import { CommentCard } from './components/CommentCard/CommentCard';

const PostFeedCard = ({ postData, individualPage }) => {
  const { _id, content, createdAt, likes, pic, userId, comments } = postData;
  const { user: authUser, token } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const { resetMenu } = useOutsideClickHandler(menuRef);
  const [openMenu, setOpenMenu] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    if (resetMenu) {
      setOpenMenu(false);
    }
  }, [resetMenu]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserById(userId);
        setUser(res.data.user);
      } catch (err) {
        ToastHandler(ToastType.Error, err.response.data);
      }
    })();
  }, [userId]);

  return (
    <>
      {user ? (
        <div className='flex flex-col gap-4 bg-nav-background rounded-lg drop-shadow-2xl p-5'>
          {/** post header */}
          <div className='flex gap-4  flex-grow'>
            <img
              onClick={() => navigate(`/profile/${user?.userHandler}`)}
              className='cursor-pointer rounded-full w-14 h-14 object-cover'
              src={user.pic}
              alt='post-hero'
            />
            <div className='flex justify-between flex-grow'>
              <div
                onClick={() => navigate(`/profile/${user?.userHandler}`)}
                className='flex flex-col cursor-pointer'
              >
                <p className='text-xl'>{`${user.firstName} ${user.lastName}`}</p>
                <p className='text-xs text-txt-secondary-color'>
                  {new Date(createdAt).toDateString()}{' '}
                  {new Date(createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className='relative'>
                <i
                  onClick={() => setOpenMenu(!openMenu)}
                  className='ri-more-fill text-xl cursor-pointer'
                ></i>
                {openMenu ? (
                  <div ref={menuRef} className='absolute right-0'>
                    <div className='w-40 text-txt-secondary-color bg-secondary-background border border-gray-200 rounded-lg'>
                      {authUser.bookmarks.some((el) => el === _id) ? (
                        <button
                          type='button'
                          onClick={() => {
                            dispatch(removeBookmark({ postId: _id, token }));
                            setOpenMenu(false);
                          }}
                          className='relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border rounded-lg text-red-500 hover:text-red-500 focus:z-10   focus:text-red-600'
                        >
                          <i className='far fa-trash-alt'></i>
                          Remove safe
                        </button>
                      ) : (
                        <button
                          type='button'
                          onClick={() => {
                            dispatch(
                              postBookmark({ postId: _id, token: token })
                            );
                            setOpenMenu(false);
                          }}
                          className='relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border rounded-lg hover:text-blue-700 focus:z-10   focus:text-blue-700'
                        >
                          <i className='far fa-bookmark'></i>
                          Save post
                        </button>
                      )}
                      {user._id === authUser._id && !individualPage && (
                        <button
                          type='button'
                          onClick={() =>
                            dispatch(openEditPostHandler({ postData }))
                          }
                          className='relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border rounded-lg hover:text-blue-700 focus:z-10   focus:text-blue-700'
                        >
                          <i className='far fa-edit'></i>
                          Edit post
                        </button>
                      )}
                      {user._id === authUser._id && !individualPage && (
                        <button
                          onClick={() => {
                            dispatch(
                              deletePost({ postId: _id, authToken: token })
                            );
                          }}
                          type='button'
                          className='relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border rounded-lg hover:text-red-500 focus:z-10   focus:text-red-700'
                        >
                          <i className='far fa-trash-alt'></i>
                          Delete post
                        </button>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/**Post details */}
          <div
            onClick={() => navigate(`/post/${_id}`)}
            className='flex flex-col gap-6 flex-grow'
          >
            <p className='px-4'>{content}</p>
            {pic ? (
              <img
                className='rounded-lg max-h-96 w-full object-contain'
                src={pic}
                alt='post-details'
              />
            ) : null}
          </div>
          {/**Post footer */}
          <div className='flex  gap-4 sm:gap-2 flex-grow py-1  items-center justify-evenly font-normal text-txt-secondary-color'>
            <div className='flex items-center gap-1 cursor-pointer'>
              {!likes.likedBy.some((el) => el._id === authUser._id) ? (
                <i
                  onClick={() => {
                    dispatch(likePost({ postId: _id, authToken: token }));
                  }}
                  className='far fa-thumbs-up'
                ></i>
              ) : (
                <i className='fas fa-thumbs-up'></i>
              )}
              {likes.likedBy.length > 0 ? (
                <span>{likes.likedBy.length}</span>
              ) : null}
            </div>
            <div className='flex items-center cursor-pointer gap-1'>
              {!likes.dislikedBy.some((el) => el._id === authUser._id) ? (
                <i
                  onClick={() =>
                    dispatch(dislikePost({ postId: _id, authToken: token }))
                  }
                  className='far fa-thumbs-down'
                ></i>
              ) : (
                <i className='fas fa-thumbs-down'></i>
              )}
            </div>
            <div
              onClick={() => {
                if (!individualPage) navigate(`/post/${_id}`);
              }}
              className='flex items-center gap-1 cursor-pointer'
            >
              <i className='far fa-comment'></i>
              <span>10</span>
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/post/${_id}`
                );
                ToastHandler(ToastType.Success, 'Link Copied');
              }}
              className='flex items-center cursor-pointer gap-1'
            >
              <i className='ri-share-line'></i>
              <span>Share</span>
            </div>
          </div>
          {/**Post comment section */}
          {individualPage ? (
            <div className='flex gap-3 flex-col border-t-2  pt-6'>
              {/**Comment different person */}
              {comments.map((el) => {
                return <CommentCard key={el._id} comment={el} />;
              })}

              <div className='flex w-full  shadow-sm  rounded-md  '>
                <input
                  value={commentInput}
                  placeholder='Enter your comment'
                  className='w-full border border-txt-hover-color focus:border-primary active:border-primary active:outline-none focus:outline-none rounded-l-md p-1.5 px-3'
                  type='text'
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (commentInput === '') {
                      ToastHandler(
                        ToastType.Info,
                        'Pls Write something in comment box'
                      );
                      return;
                    }
                    dispatch(
                      addComment({
                        postId: _id,
                        commentData: { content: commentInput, postId: _id },
                        token,
                      })
                    );
                    setCommentInput('');
                  }}
                  className='text-white bg-gradient-to-r from-secondary via-blue-600 to-primary hover:bg-gradient-to-br focus:outline-none   font-medium rounded-r-md text-sm px-4 text-center'
                >
                  Post
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default PostFeedCard;
