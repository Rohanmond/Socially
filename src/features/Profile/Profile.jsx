import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Nav } from '../../components';
import { useOutsideClickHandler } from '../../custom-hooks';
import { getUserByHandler } from '../../Services/userServices';
import { ToastHandler, ToastType } from '../../utils/toastUtils';
import {
  logoutHandler,
  userUpdateHandler,
} from '../Authentication/authenticationSlice';
import PostFeedCard from '../PostFeedPage/components/PostFeedCard/PostFeedCard';
import { getAllPosts } from '../PostFeedPage/PostsSlice';
import { followUser, unFollowUser } from '../PostFeedPage/UserSlice';
import { ProfileModal } from './components/ProfileModal/ProfileModal';

export const Profile = () => {
  const dispatch = useDispatch();
  const { userHandler } = useParams();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user: authUser } = useSelector((store) => store.authentication);
  const { allPosts, isLoading } = useSelector((store) => store.posts);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCurrUser, setIsCurrUser] = useState(false);
  const [subNav, setSubNav] = useState('posts');
  const [openFollowModal, setOpenFollowModal] = useState([]);
  const openFollowRef = useRef();
  const { resetMenu } = useOutsideClickHandler(openFollowRef);
  const { token } = useSelector((store) => store.authentication);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (resetMenu) {
      setOpenFollowModal([]);
    }
  }, [resetMenu]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getUserByHandler(userHandler);
        setUser(response.data.user);
        setIsCurrUser(authUser._id === response.data.user._id);
      } catch (err) {
        ToastHandler(ToastType.Error, err.response.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [userHandler]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(id);
  }, [subNav]);

  return (
    <>
      {showProfileModal ? (
        <ProfileModal setShowProfileModal={setShowProfileModal} />
      ) : null}
      {loading || isLoading ? (
        <div className='fixed z-50 top-0  left-0 w-full h-full flex justify-center items-center'>
          <img
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1651565040/auth-loader_atroq7.gif'
            alt='loader'
          />
        </div>
      ) : null}
      {openFollowModal.length > 0 ? (
        <div className='h-screen w-screen fixed flex justify-center items-center z-50 bg-background-dim'>
          <div
            ref={openFollowRef}
            className='flex flex-col gap-4 p-6 h-3/5 z-50 dark:bg-dark-secondary-background overflow-y-scroll rounded-xl  sm:w-9/12  w-1/3 bg-background'
          >
            {openFollowModal.map((el) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/profile/${el.userHandler}`);
                    setOpenFollowModal([]);
                  }}
                  className='cursor-pointer  flex justify-between items-center'
                >
                  <img
                    className='w-20 sm:w-16 sm:h-16 h-20 object-cover rounded-full'
                    src={el.pic}
                    alt='user pic'
                  />
                  <p className='font-medium dark:text-dark-txt-secondary-color text-lg text-txt-secondary-color'>
                    {el.firstName} {el.lastName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <Nav />
      <main className='p-2 mt-4'>
        {/*divider */}
        <div className='flex justify-center'>
          {/* profile container */}
          <div className='flex flex-col w-2/5  xl:3/5 lg:w-4/5 md:4/5 sm:w-full  gap-4 '>
            {/* profile */}
            <div className='flex justify-around items-center  bg-nav-background dark:bg-dark-secondary-background dark:text-dark-txt-color gap-10 sm:gap-6 rounded-lg drop-shadow-2xl  p-5'>
              <img
                className='h-40 object-cover w-40 sm:h-24 sm:w-24 rounded-full'
                src={isCurrUser ? authUser?.pic : user?.pic}
                alt='profile'
              />

              <div className=' flex flex-col justify-center  gap-4 sm:gap-2'>
                <div className='flex  items-center justify-between gap-2'>
                  <p className='text-3xl  sm:text-base text-center'>
                    {user?.firstName} {user?.lastName}
                  </p>
                  {isCurrUser ? (
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className='py-1 px-2 ring-1 rounded-md hover:bg-secondary-background dark:hover:bg-dark-nav-background text-sm sm:text-xs'
                    >
                      Edit profile
                    </button>
                  ) : authUser.following.some((us) => us._id === user?._id) ? (
                    <button
                      onClick={() =>
                        dispatch(
                          unFollowUser({
                            followUserId: user._id,
                            token,
                            dispatch,
                            userUpdateHandler,
                          })
                        )
                      }
                      className='py-1 px-2 ring-1 rounded-md hover:bg-secondary-background dark:hover:bg-dark-nav-background  text-sm sm:text-xs'
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch(
                          followUser({
                            followUserId: user._id,
                            token,
                            dispatch,
                            userUpdateHandler,
                          })
                        )
                      }
                      className='py-1 px-2 ring-1 rounded-md hover:bg-secondary-background dark:hover:bg-dark-nav-background text-sm sm:text-xs'
                    >
                      Follow
                    </button>
                  )}
                </div>
                <div className='flex gap-1 text-sm sm:text-xs'>
                  <p>@{user?.userHandler}</p>
                </div>
                {user?.bio ? (
                  <div className='flex gap-2 text-sm sm:text-xs'>
                    <p>
                      <span>{isCurrUser ? authUser?.bio : user?.bio}</span>
                    </p>
                  </div>
                ) : null}
                {user?.link ? (
                  <div className='flex gap-2 text-sm sm:text-xs'>
                    <a
                      className='text-blue-500'
                      href={user?.link}
                      rel='noreferrer'
                      target={'_blank'}
                    >
                      {isCurrUser ? authUser?.link : user?.link}
                    </a>
                  </div>
                ) : null}
                <div className='flex gap-2   justify-between text-base sm:text-sm'>
                  <p
                    onClick={() => setSubNav('posts')}
                    className='cursor-pointer'
                  >
                    {allPosts.filter((el) => el.userId === user?._id).length}{' '}
                    posts
                  </p>
                  <p
                    onClick={() => setOpenFollowModal(user?.followers)}
                    className='cursor-pointer'
                  >
                    {user?.followers?.length} followers
                  </p>
                  <p
                    onClick={() => setOpenFollowModal(user?.following)}
                    className='cursor-pointer'
                  >
                    {user?.following?.length} following
                  </p>
                </div>
                {isCurrUser || user === null ? (
                  <button
                    onClick={() => dispatch(logoutHandler())}
                    className='text-white text-base  sm:text-xs bg-red-500 py-1 px-3 rounded-md active:bg-red-600'
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            </div>

            <div className='flex justify-evenly items-center sm:text-xs  bg-nav-background dark:bg-dark-secondary-background dark:text-dark-txt-color gap-10 rounded-lg drop-shadow-2xl  p-4 sm:p-3 '>
              <div
                onClick={() => setSubNav('posts')}
                className={`cursor-pointer flex gap-1  ${
                  subNav === 'posts' ? 'text-primary' : ''
                }`}
              >
                <i className='ri-home-heart-line'></i>
                <p>POSTS</p>
              </div>
              {isCurrUser ? (
                <div
                  onClick={() => setSubNav('bookmarked')}
                  className={`cursor-pointer flex gap-1  ${
                    subNav === 'bookmarked' ? 'text-primary' : ''
                  }`}
                >
                  <i className='ri-bookmark-3-line'></i>
                  <p>BOOKMARKED</p>
                </div>
              ) : null}

              <div
                onClick={() => setSubNav('activities')}
                className={`cursor-pointer flex gap-1  ${
                  subNav === 'activities' ? 'text-primary' : ''
                }`}
              >
                <i className='ri-heart-2-line'></i>
                <p>ACTIVITIES</p>
              </div>
            </div>
            {/**Post-feed */}
            {subNav === 'posts' ? (
              <div className='flex flex-col gap-4'>
                {[...allPosts.filter((el) => el.userId === user?._id)]
                  .length === 0 ? (
                  <div className='bg-nav-background dark:bg-dark-secondary-background dark:text-dark-txt-color p-3 rounded-lg drop-shadow-2xl'>
                    <p className='text-center text-xl'>
                      {isCurrUser
                        ? "You haven't post anything yet"
                        : `${user?.firstName} haven't post anything yet`}
                    </p>
                  </div>
                ) : null}
                {[...allPosts.filter((el) => el.userId === user?._id)]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((el) => {
                    return <PostFeedCard key={el._id} postData={el} />;
                  })}
              </div>
            ) : subNav === 'bookmarked' ? (
              <div className='flex flex-col gap-4'>
                {[
                  ...allPosts.filter((el) =>
                    authUser.bookmarks.some((bookmark) => bookmark === el._id)
                  ),
                ].length === 0 ? (
                  <div className='bg-nav-background dark:bg-dark-secondary-background dark:text-dark-txt-color p-3 rounded-lg drop-shadow-2xl'>
                    <p className='text-center text-xl'>
                      You haven't bookmarked anything yet
                    </p>
                  </div>
                ) : null}
                {[
                  ...allPosts.filter((el) =>
                    authUser.bookmarks.some((bookmark) => bookmark === el._id)
                  ),
                ]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((el) => {
                    return <PostFeedCard key={el._id} postData={el} />;
                  })}
              </div>
            ) : (
              [
                ...allPosts.filter((post) => {
                  return (
                    post.userId === user._id ||
                    post.likes.likedBy.some((us) => us._id === user._id) ||
                    post.likes.dislikedBy.some((us) => us._id === user._id) ||
                    post.comments.some(
                      (comment) =>
                        comment.user._id === user._id ||
                        post.comments.some((comment) =>
                          comment.replies.some(
                            (reply) => reply.user._id === user._id
                          )
                        )
                    )
                  );
                }),
              ]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((el) => {
                  return <PostFeedCard key={el._id} postData={el} />;
                })
            )}
          </div>
        </div>
      </main>
    </>
  );
};
