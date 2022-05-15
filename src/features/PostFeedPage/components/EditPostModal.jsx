import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClickHandler } from '../../../custom-hooks';
import { addPost, editPost } from '../PostsSlice';
import { closeEditPostHandler } from '../toggleEditPostModalSlice';

export const EditPostModal = () => {
  const { postData } = useSelector((store) => store.toggleEditPostModal);
  const { user, token } = useSelector((store) => store.authentication);
  const emojiContainerRef = useRef();
  const editPostModalRef = useRef();
  const { resetMenu: emojiResetMenu } =
    useOutsideClickHandler(emojiContainerRef);
  const { resetMenu: editModalResetMenu } =
    useOutsideClickHandler(editPostModalRef);
  const [postInputForm, setPostInputForm] = useState({
    content: postData?.content,
    pic: postData?.pic,
  });
  const [showEmojis, setShowEmojis] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emojiResetMenu) setShowEmojis(false);
  }, [emojiResetMenu]);

  useEffect(() => {
    if (editModalResetMenu) {
      dispatch(closeEditPostHandler());
    }
  }, [editModalResetMenu]);
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
    <div className='fixed p-4 left-0 right-0 top-0 h-screen z-50 flex justify-center items-center bg-background-dim'>
      <div
        ref={editPostModalRef}
        className='w-2/5 md:w-3/5 sm:w-full  flex flex-col bg-nav-background dark:bg-dark-background dark:text-dark-txt-color rounded-lg drop-shadow-2xl divide-y divide-blue-200'
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
                src={user.pic}
                alt='profile-img'
              />
              <input
                className='grow focus:outline-none font-light text-txt-secondary-color dark:bg-dark-background'
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
                <img
                  className='max-h-96 object-cover'
                  src={postInputForm.pic}
                  alt='post pic'
                />
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
              <li className='relative flex items-center gap-3 bg-secondary-background dark:bg-dark-nav-background py-2 px-3 rounded-md cursor-pointer'>
                <img
                  className='h-6 w-6'
                  src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650190023/07_dffvl5.png'
                  alt='phot'
                />
                <p className='text-primary text-sm font-semibold'>Photo/GIF</p>
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
                className='relative flex items-center gap-3 bg-secondary-background dark:bg-dark-nav-background py-2 px-3 rounded-md cursor-pointer'
              >
                <img
                  className='h-6 w-6'
                  src='https://res.cloudinary.com/donqbxlnc/image/upload/v1652278871/Sunglasses_Emoji_be26cc0a-eef9-49e5-8da2-169bb417cc0b_grande_tz0jya.png'
                  alt='emojis'
                />
                <p className='text-primary text-sm font-semibold'>Emojis</p>
                {showEmojis ? (
                  <div
                    ref={emojiContainerRef}
                    className='absolute w-48 p-4 flex flex-wrap justify-center items-center gap-1 rounded-lg  bg-secondary-background dark:bg-dark-nav-background'
                  >
                    {emojiLib.map((el) => {
                      return (
                        <span key={el} className='cursor-pointer text-2xl'>
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
              editPost({
                postData: { ...postData, ...postInputForm, userId: user._id },
                authToken: token,
              })
            );
            dispatch(closeEditPostHandler());
            setPostInputForm({ content: '', pic: '' });
          }}
          disabled={postInputForm.content ? false : true}
          className={`mb-4 mx-4 p-2 bg-primary active:bg-blue-500 text-white rounded-lg ${
            postInputForm.content
              ? ''
              : 'cursor-not-allowed bg-txt-secondary-color active:bg-txt-secondary-color'
          }`}
        >
          Post
        </button>
      </div>
    </div>
  );
};
