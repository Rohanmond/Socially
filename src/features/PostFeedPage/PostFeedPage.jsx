import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from '../../components';
import './PostFeedPage.css';
import { useOutsideClickHandler } from '../../custom-hooks';
import { EditPostModal } from './components/EditPostModal';
import { FollowChip } from './components/FollowChip/FollowChip';
import PostFeedCard from './components/PostFeedCard/PostFeedCard';
import { addPost, getAllPosts } from './PostsSlice';
import { getAllUsers } from './UserSlice';

export const PostFeedPage = () => {
  const { user, token } = useSelector((store) => store.authentication);
  const emojiContainerRef = useRef();
  const { resetMenu } = useOutsideClickHandler(emojiContainerRef);
  const [showEmojis, setShowEmojis] = useState(false);
  const { allPosts, isLoading } = useSelector((store) => store.posts);
  const { openModal, postData } = useSelector(
    (store) => store.toggleEditPostModal
  );
  const { allUsers } = useSelector((store) => store.users);
  const [postInputForm, setPostInputForm] = useState({
    content: '',
    pic: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (resetMenu) setShowEmojis(false);
  }, [resetMenu]);

  const emojiLib = [
    '😂',
    '😅',
    '😁',
    '🙄',
    '😱',
    '🥹',
    '🥵',
    '😇',
    '😆',
    '🤣',
    '👀',
    '👍',
    '😎',
    '🤨',
    '😒',
    '😊',
    '😰',
    '😄',
    '🥳',
    '😘',
    '🙃',
    '🤯',
    '👆',
    '😭',
    '🥶',
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

  console.log(allUsers);
  console.log(user);
  return (
    <>
      <Nav />
      {isLoading ? (
        <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center'>
          <img
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1651565040/auth-loader_atroq7.gif'
            alt='loader'
          />
        </div>
      ) : null}
      {openModal ? <EditPostModal postData={postData} /> : null}
      <main className='p-4'>
        {/*divider */}
        <div className='flex justify-center'>
          {/* news feed */}
          <div className='flex flex-col  w-2/5 md:w-4/5 sm:w-full  gap-4 '>
            {/* create post section */}
            <div className='flex flex-col bg-nav-background rounded-lg drop-shadow-2xl divide-y divide-blue-200'>
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
                      className='grow focus:outline-none font-light text-txt-secondary-color'
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
                  <hr className='font-extralight text-secondary' />
                  <ul className='flex gap-4 font-light items-center'>
                    <li className='relative flex items-center gap-3 bg-secondary-background py-2 px-3 rounded-md cursor-pointer'>
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
                            content: postInputForm.content + e.target.innerText,
                          });

                          setShowEmojis(false);
                        }
                      }}
                      className='relative flex items-center gap-3 bg-secondary-background py-2 px-3 rounded-md cursor-pointer'
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
                          className='absolute w-48 p-4 flex flex-wrap justify-center items-center gap-1 rounded-lg  bg-secondary-background '
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
                  postInputForm.content ? '' : 'cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>

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
              {[...allPosts]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((el) => {
                  return <PostFeedCard key={el._id} postData={el} />;
                })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
