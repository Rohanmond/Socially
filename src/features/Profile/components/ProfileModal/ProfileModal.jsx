import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClickHandler } from '../../../../custom-hooks';
import { userUpdateHandler } from '../../../Authentication/authenticationSlice';

export const ProfileModal = ({ setShowProfileModal }) => {
  const { user, token } = useSelector((store) => store.authentication);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    bio: user.bio,
    pic: user.pic,
    link: user.link,
    file: user?.file,
  });
  const ref = useRef();
  const { resetMenu } = useOutsideClickHandler(ref);

  useEffect(() => {
    if (resetMenu) {
      setShowProfileModal(false);
    }
  }, [resetMenu]);

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
    setUserData({ ...userData, pic: base64File });
  };
  // const updateImageHandler = (e) => {
  //   const file = e.target.files[0];
  //   setUserData({ ...userData, pic: file });
  // };

  console.log(userData.pic, 'file');
  return (
    <div className='h-screen w-screen fixed flex justify-center items-center z-50 bg-background-dim'>
      <div
        ref={ref}
        className='flex flex-col gap-4 p-5 rounded-xl  sm:w-9/12 w-1/3 bg-background'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <p className='w-16 text-xl font-semibold text-txt-secondary-color'>
              Avatar
            </p>
            <div className='w-12 relative'>
              <img
                src={
                  userData?.pic ||
                  'https://res.cloudinary.com/donqbxlnc/image/upload/v1651664931/avatar-1577909_960_720_cl1ooh.png'
                }
                className='rounded-full object-cover w-12 h-12'
                alt='user pic'
              />
              <div className='cursor-pointer'>
                <i className='fas text-txt-secondary-color fa-camera rounded-full absolute left-0 top-8' />
                <input
                  className='absolute left-0 right-8 w-5 h-5 top-8 opacity-0'
                  accept='image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp'
                  type='file'
                  onChange={onFileChange}
                ></input>
              </div>
            </div>
          </div>

          <div className='flex justify-between gap-4'>
            <p className='w-16 text-lg text-txt-secondary-color font-semibold'>
              Bio
            </p>
            <textarea
              className='px-2 focus:outline-none'
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
            />
          </div>
          <div className='flex gap-4'>
            <p className='w-16 text-lg text-txt-secondary-color font-semibold'>
              Link
            </p>
            <input
              className='flex-1 border border-solid border-txt-secondary-color rounded-md px-2 focus:outline-none'
              value={userData.link}
              onChange={(e) =>
                setUserData({ ...userData, link: e.target.value })
              }
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            className='rounded-lg px-2 py-1 bg-blue-500 text-white font-bold hover:bg-blue-400'
            onClick={() => {
              dispatch(
                userUpdateHandler({ userData: { ...user, ...userData }, token })
              );
              setShowProfileModal(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
