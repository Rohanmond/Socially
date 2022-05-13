import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nav } from '../../components';
import { getUserByHandler } from '../../Services/userServices';
import { ToastHandler, ToastType } from '../../utils/toastUtils';
import { logoutHandler } from '../Authentication/authenticationSlice';
import PostFeedCard from '../PostFeedPage/components/PostFeedCard/PostFeedCard';
import { getAllPosts } from '../PostFeedPage/PostsSlice';
import { ProfileModal } from './components/ProfileModal/ProfileModal';

export const Profile = () => {
  const dispatch = useDispatch();
  const { userHandler } = useParams();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user: authUser } = useSelector((store) => store.authentication);
  const { allPosts, isLoading } = useSelector((store) => store.posts);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCurrUser, setIsCurrUser] = useState(false);
  const [subNav, setSubNav] = useState('posts');

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

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

  console.log(user);
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
      <Nav />
      <main className='p-4'>
        {/*divider */}
        <div className='flex justify-center'>
          {/* profile container */}
          <div className='flex flex-col w-2/5 md:w-4/5 sm:w-full  gap-4 '>
            {/* profile */}
            <div className='flex justify-evenly items-center  bg-nav-background gap-10 sm:gap-6 rounded-lg drop-shadow-2xl  p-5'>
              <img
                className='h-40 object-cover w-40 sm:h-24 sm:w-24 rounded-full'
                src={user?.pic}
                alt='profile'
              />

              <div className=' flex flex-col justify-center items-center gap-4 sm:gap-2'>
                <div className='flex  items-center gap-2'>
                  <p className='text-3xl  sm:text-base text-center'>
                    {user?.firstName} {user?.lastName}
                  </p>
                  {isCurrUser ? (
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className='py-1 px-2 ring-1 rounded-md hover:bg-secondary-background text-sm sm:text-xs'
                    >
                      Edit profile
                    </button>
                  ) : null}
                </div>
                <div className='flex gap-1 text-sm sm:text-xs'>
                  <p>@{user?.userHandler}</p>
                </div>
                {user?.bio ? (
                  <div className='flex gap-2 text-sm sm:text-xs'>
                    <p>
                      <span>{user?.bio}</span>
                    </p>
                  </div>
                ) : null}
                {user?.link ? (
                  <div className='flex gap-2 text-sm sm:text-xs'>
                    <a
                      className='text-blue-500'
                      href={`https://${user?.link}`}
                      rel='noreferrer'
                      target={'_blank'}
                    >
                      {user?.link}
                    </a>
                  </div>
                ) : null}
                <div className='flex gap-2 px-2  text-sm sm:text-xs'>
                  <p>
                    {allPosts.filter((el) => el.userId === user?._id).length}{' '}
                    posts
                  </p>
                  <p>230 followers</p>
                  <p>658 following</p>
                </div>
                {isCurrUser ? (
                  <button
                    onClick={() => dispatch(logoutHandler())}
                    className='text-white text-base  sm:text-xs bg-red-500 py-1 px-3 rounded-md active:bg-red-600'
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            </div>

            <div className='flex justify-evenly items-center  bg-nav-background gap-10 rounded-lg drop-shadow-2xl  p-4 sm:p-3 sm:text-sm'>
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
              {isCurrUser ? (
                <div
                  onClick={() => setSubNav('followers')}
                  className={`cursor-pointer flex gap-1  ${
                    subNav === 'followers' ? 'text-primary' : ''
                  }`}
                >
                  <i className='ri-heart-2-line'></i>
                  <p>FOLLOWERS</p>
                </div>
              ) : null}
            </div>
            {/**Post-feed */}
            {subNav === 'posts' ? (
              <div className='flex flex-col gap-4'>
                {[...allPosts.filter((el) => el.userId === user?._id)]
                  .length === 0 ? (
                  <div className='bg-nav-background p-3 rounded-lg drop-shadow-2xl'>
                    <p className='text-center text-xl'>
                      You haven't post anything yet
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
                  <div className='bg-nav-background p-3 rounded-lg drop-shadow-2xl'>
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
              <div>followers</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
