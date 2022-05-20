import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, ScrollToTop } from '../../components';
import './PostFeedPage.css';
import { useOutsideClickHandler } from '../../custom-hooks';

import { FollowChip } from './components/FollowChip/FollowChip';
import PostFeedCard from './components/PostFeedCard/PostFeedCard';
import { addPost, getAllPosts, getAllPostsByObserver } from './PostsSlice';
import { getAllUsers } from './UserSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const LIMIT = 2;

export const PostFeedPage = () => {
  const location = useLocation();
  const [pageNo, setPageNo] = useState(0);

  const loader = useRef(null);
  const { user, token } = useSelector((store) => store.authentication);
  const emojiContainerRef = useRef();
  const { resetMenu } = useOutsideClickHandler(emojiContainerRef);
  const [showEmojis, setShowEmojis] = useState(false);
  const { allPosts, isLoading, isSmallLoading } = useSelector(
    (store) => store.posts
  );

  const [customLoader, setCustomLoader] = useState(false);
  const { allUsers } = useSelector((store) => store.users);
  const [postInputForm, setPostInputForm] = useState({
    content: '',
    pic: '',
  });
  const dispatch = useDispatch();
  const [subNav, setSubNav] = useState('latest');
  const [filteredPosts, setFilteredPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());

    const elementRef = loader.current;
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPageNo((prev) => ++prev);
      }
    };
    const observer = new IntersectionObserver(handleObserver);
    if (elementRef) observer.observe(elementRef);

    return () => {
      observer.unobserve(elementRef);
    };
  }, []);
  useEffect(() => {
    setCustomLoader(true);
    setPageNo(0);
    if (location.pathname !== '/explore') dispatch(getAllPosts());
    const id = setTimeout(() => {
      setCustomLoader(false);
    }, 500);
    return () => clearTimeout(id);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/explore')
      dispatch(getAllPostsByObserver({ limit: LIMIT, page: pageNo }));
  }, [pageNo, location]);

  useEffect(() => {
    if (location.pathname.includes('explore')) setFilteredPost(allPosts);
    else
      setFilteredPost(
        allPosts.filter(
          (post) =>
            user?.followers?.some((p) => p?._id === post?.userId) ||
            user?.following?.some((p) => p?._id === post?.userId) ||
            user?._id === post.userId
        )
      );
  }, [allPosts, user, location]);

  useEffect(() => {
    if (resetMenu) setShowEmojis(false);
  }, [resetMenu]);

  const emojiLib = [
    '🙂',
    '😊',
    '🤗',
    '😄',
    '😅',
    '😆',
    '😂',
    '🤣',
    '😘',
    '🥰',
    '😍',
    '🤩',
    '😇',
    '😎',
    '😋',
    '😜',
    '🙃',
    '😴',
    '🤯',
    '🥳',
  ];

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    setPostInputForm({ ...postInputForm, pic: base64File });
  };

  return (
    <>
      <Nav />
      {isLoading || customLoader ? (
        <div className='fixed z-50 top-0 bg-background-dim left-0 w-full h-full flex justify-center items-center'>
          <img
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1652687732/Eclipse-1s-200px_1_aq2n6f.gif'
            alt='loader'
          />
        </div>
      ) : null}
      <main className='p-4'>
        {/*divider */}
        <div className='flex justify-center'>
          {/* news feed */}
          <div className='flex flex-col  w-2/5 md:w-4/5 sm:w-full  gap-4 '>
            {/* create post section */}
            {!location.pathname.includes('/explore') ? (
              <div
                className='flex flex-col bg-nav-background  dark:bg-dark-secondary-background 
              text-txt-color
              dark:text-dark-txt-color rounded-lg drop-shadow-2xl dark:divide-primary divide-y divide-primary'
              >
                <div className='p-4'>
                  <h1 className='text-xl'>Create Post</h1>
                </div>
                <div className='p-4'>
                  <div className='flex flex-col gap-4 grow'>
                    {/** enter text section */}
                    <div className='flex items-center gap-4 grow'>
                      <img
                        className='h-14 w-14 rounded-full object-cover'
                        src={user?.pic}
                        alt='profile-img'
                      />
                      <input
                        className='grow focus:outline-none font-normal text-txt-secondary-color text-lg dark:bg-dark-secondary-background dark:text-dark-txt-secondary-color'
                        placeholder='Write something here'
                        value={postInputForm.content}
                        onChange={(e) =>
                          setPostInputForm({
                            ...postInputForm,
                            content: e.target.value,
                          })
                        }
                        type='text'
                      />
                    </div>
                    {postInputForm.pic ? (
                      <div className='relative'>
                        <img src={postInputForm.pic} alt='post pic' />
                        <i
                          onClick={() =>
                            setPostInputForm({ ...postInputForm, pic: '' })
                          }
                          className='absolute top-1 right-1 text-4xl text-txt-hover-color cursor-pointer fas fa-times-circle'
                        ></i>
                      </div>
                    ) : null}

                    <ul className='border-t border-t-primary flex pt-4 gap-4 font-light items-center'>
                      <li className='relative flex items-center gap-3 bg-secondary-background dark:bg-dark-nav-background py-2 px-3 rounded-md cursor-pointer'>
                        <img
                          className='h-6 w-6'
                          src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650190023/07_dffvl5.png'
                          alt='phot'
                        />
                        <p className='text-primary text-sm font-semibold'>
                          Photo/GIF
                        </p>
                        <input
                          className='cursor-pointer absolute w-28 opacity-0'
                          accept='image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp'
                          type='file'
                          onChange={onFileChange}
                        />
                      </li>
                      <li
                        onClick={(e) => {
                          setShowEmojis(true);
                          if (
                            e.target.childNodes.length === 1 &&
                            e.target.innerText !== 'Emojis'
                          ) {
                            setPostInputForm({
                              ...postInputForm,
                              content:
                                postInputForm.content + e.target.innerText,
                            });

                            setShowEmojis(false);
                          }
                        }}
                        className='relative flex items-center gap-3 bg-secondary-background dark:bg-dark-nav-background py-2 px-3 rounded-md cursor-pointer'
                      >
                        <img
                          className='h-6 w-6'
                          src='https://res.cloudinary.com/donqbxlnc/image/upload/v1652278871/Sunglasses_Emoji_be26cc0a-eef9-49e5-8da2-169bb417cc0b_grande_tz0jya.png'
                          alt='emojis'
                        />
                        <p className='text-primary text-sm font-semibold'>
                          Emojis
                        </p>
                        {showEmojis ? (
                          <div
                            ref={emojiContainerRef}
                            className='absolute w-48 p-4 flex flex-wrap justify-center items-center gap-2 rounded-lg dark:bg-dark-nav-background  bg-secondary-background '
                          >
                            {emojiLib.map((el) => {
                              return (
                                <span
                                  key={el}
                                  className='cursor-pointer text-2xl'
                                >
                                  {el}
                                </span>
                              );
                            })}
                          </div>
                        ) : null}
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(
                      addPost({
                        postData: { ...postInputForm, userId: user._id },
                        authToken: token,
                      })
                    );
                    setPostInputForm({ content: '', pic: '' });
                  }}
                  disabled={postInputForm.content ? false : true}
                  className={`mb-4 mx-4 p-2 bg-primary active:bg-blue-500 text-white rounded-lg ${
                    postInputForm.content
                      ? ''
                      : 'cursor-not-allowed bg-txt-hover-color active:bg-txt-hover-color'
                  }`}
                >
                  Post
                </button>
              </div>
            ) : null}

            {location.pathname !== '/explore' ? (
              <div className='flex justify-evenly items-center   bg-nav-background dark:bg-dark-secondary-background dark:text-dark-txt-color gap-10 rounded-lg drop-shadow-2xl  p-4 sm:p-3 '>
                <div
                  onClick={() => setSubNav('trending')}
                  className={`cursor-pointer flex gap-1  ${
                    subNav === 'trending' ? 'text-primary' : ''
                  }`}
                >
                  <p>🔥Trending</p>
                </div>

                <div
                  onClick={() => setSubNav('latest')}
                  className={`cursor-pointer items-center flex gap-1  ${
                    subNav === 'latest' ? 'text-primary' : ''
                  }`}
                >
                  <i className='far fa-clock'></i>
                  <p>Latest</p>
                </div>
              </div>
            ) : null}
            {/**Scrollable follow chips */}
            <div className='flex flex-col gap-2  rounded-lg drop-shadow-2xl '>
              <div className=''>
                <div className='follow-chip-scroll w-full flex gap-1 flex-nowrap overflow-x-scroll'>
                  {allUsers
                    .filter(
                      (us) =>
                        user._id !== us._id &&
                        !user.following.some((eachUs) => eachUs._id === us._id)
                    )
                    .map((el) => {
                      return <FollowChip key={el._id} user={el} />;
                    })}
                </div>
              </div>
            </div>
            {/**Post-feed */}
            <div className='flex flex-col gap-4'>
              {filteredPosts.length === 0 ? (
                <div className='flex justify-center bg-nav-background dark:bg-dark-secondary-background rounded-lg drop-shadow-2xl p-5'>
                  <p className='text-xl text-txt-secondary-color dark:text-dark-txt-secondary-color font-medium'>
                    No posts yet. You can go{' '}
                    <span
                      onClick={() => navigate('/explore')}
                      className='cursor-pointer text-secondary'
                    >
                      Explore
                    </span>{' '}
                    Feed
                  </p>
                </div>
              ) : null}

              {location.pathname !== '/explore' && subNav === 'latest'
                ? [...filteredPosts]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((el) => {
                      return <PostFeedCard key={el._id} postData={el} />;
                    })
                : location.pathname !== '/explore'
                ? [
                    ...filteredPosts.filter(
                      (post) =>
                        post?.likes?.likeCount > 0 || post?.comments?.length > 0
                    ),
                  ]
                    .sort((a, b) => {
                      return (
                        b?.likes?.likeCount +
                        b?.comments?.length -
                        (a?.likes?.likeCount + a?.comments?.length)
                      );
                    })
                    .map((el) => {
                      return <PostFeedCard key={el._id} postData={el} />;
                    })
                : null}

              {location.pathname === '/explore' &&
                filteredPosts.map((el, index) => {
                  if (index === filteredPosts.length - 1)
                    return <PostFeedCard key={el._id} postData={el} />;
                  return <PostFeedCard key={el._id} postData={el} />;
                })}
              {isSmallLoading && (
                <div className='flex justify-center'>
                  <img
                    className='w-24 h-24'
                    src='https://res.cloudinary.com/donqbxlnc/image/upload/v1653034827/Bean_Eater-1s-200px_2_ae7ljg.gif'
                    alt='loader'
                  />
                </div>
              )}
              <div ref={loader}></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
