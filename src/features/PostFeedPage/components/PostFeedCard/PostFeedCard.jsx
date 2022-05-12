import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClickHandler } from '../../../../custom-hooks';
import { getUserById } from '../../../../Services/userServices';
import { deletePost, dislikePost, likePost } from '../../PostsSlice';
import { openEditPostHandler } from '../../toggleEditPostModalSlice';
import { EditPostModal } from '../EditPostModal';

const PostFeedCard = ({ postData }) => {
  const { _id, content, createdAt, likes, pic, userId } = postData;
  const { user: authUser, token } = useSelector(
    (store) => store.authentication
  );

  const [user, setUser] = useState(null);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const { resetMenu } = useOutsideClickHandler(menuRef);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (resetMenu) {
      setOpenMenu(false);
    }
  }, [resetMenu]);

  useEffect(() => {
    (async () => {
      const res = await getUserById(userId);
      setUser(res.data.user);
    })();
  }, [userId]);

  return (
    <>
      {user ? (
        <div className='flex flex-col gap-4 bg-nav-background rounded-lg drop-shadow-2xl p-5'>
          {/** post header */}
          <div className='flex gap-4  flex-grow'>
            <img
              className='rounded-full h-12 w-12 object-cover'
              src={user.pic}
              alt='post-hero'
            />
            <div className='flex justify-between flex-grow'>
              <div className='flex flex-col'>
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
                      <button
                        type='button'
                        className='relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border rounded-lg hover:text-blue-700 focus:z-10   focus:text-blue-700'
                      >
                        <i className='far fa-bookmark'></i>
                        Save post
                      </button>
                      {user._id === authUser._id && (
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
                      {user._id === authUser._id && (
                        <button
                          onClick={() => {
                            dispatch(
                              deletePost({ postId: _id, authToken: token })
                            );
                          }}
                          type='button'
                          className='relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border rounded-lg hover:text-blue-700 focus:z-10   focus:text-blue-700'
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
          <div className='flex flex-col gap-6 flex-grow'>
            <p className='px-4'>{content}</p>
            {pic ? (
              <img className='rounded-lg' src={pic} alt='post-details' />
            ) : null}
          </div>
          {/**Post footer */}
          <div className='flex  gap-4 sm:gap-2 flex-grow py-1  items-center justify-evenly font-normal text-txt-secondary-color'>
            <div className='flex items-center gap-1 cursor-pointer'>
              {!likes.likedBy.some((el) => el._id === authUser._id) ? (
                <i
                  onClick={() =>
                    dispatch(likePost({ postId: _id, authToken: token }))
                  }
                  className='far fa-thumbs-up'
                ></i>
              ) : (
                <i className='fas fa-thumbs-up'></i>
              )}
              {likes.likeCount > 0 ? <span>{likes.likeCount}</span> : null}
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
            <div className='flex items-center gap-1 cursor-pointer'>
              <i className='far fa-comment'></i>
              <span>10</span>
            </div>
            <div className='flex items-center cursor-pointer gap-1'>
              <i className='ri-share-line'></i>
              <span>Share</span>
            </div>
          </div>
          {/**Post comment section */}
          <div className='flex gap-3 flex-col border-t-2  pt-6'>
            {/**Comment different person */}
            <div className='flex gap-4'>
              <img
                className='rounded-full w-9 h-9 mt-1'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650205531/02_zqttxd.jpg'
                alt='comment-profile-pic'
              />
              <div>
                <p className='font-normal'>Monty Carlo</p>
                <p className='font-light text-txt-secondary-color'>
                  Lorem ipsum dolor sit amet
                </p>
                <div className='flex gap-3'>
                  <p className='font-light text-primary cursor-pointer'>Like</p>
                  <p className='font-light text-primary cursor-pointer'>
                    Reply
                  </p>
                </div>
              </div>
            </div>

            <div className='flex gap-4'>
              <img
                className='rounded-full w-9 h-9 mt-1'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650096757/1_vztwsr.jpg'
                alt='comment-profile-pic'
              />
              <div>
                <p className='font-normal'>Monty Carlo</p>
                <p className='font-light text-txt-secondary-color'>
                  Lorem ipsum dolor sit amet
                </p>
                <div className='flex gap-3'>
                  <p className='font-light text-primary cursor-pointer'>Like</p>
                  <p className='font-light text-primary cursor-pointer'>
                    Reply
                  </p>
                </div>
              </div>
            </div>

            <div className='flex gap-4 flex-grow pl-12'>
              <img
                className='rounded-full w-9 h-9 mt-1'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650191393/01_jxbjlo.jpg'
                alt='comment-profile-pic'
              />
              <div>
                <p className='font-normal'>Monty Carlo</p>
                <p className='font-light text-txt-secondary-color'>
                  Thank you for your reply!
                </p>
                <p className='font-light text-primary cursor-pointer'>Like</p>
              </div>
            </div>

            <div>
              <input
                placeholder='Enter your comment'
                className='mt-3
        block
        w-full
        rounded-sm
        border-txt-hover-color
        p-2 px-3
        border
        shadow-sm
        focus:border-primary'
                type='text'
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostFeedCard;
