const PostFeedCard = ({ postData }) => {
  return (
    <div className='flex flex-col gap-4 bg-nav-background rounded-lg drop-shadow-2xl p-5'>
      {/** post header */}
      <div className='flex gap-4  flex-grow'>
        <img
          className='rounded-full h-12 w-12'
          src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650191393/01_jxbjlo.jpg'
          alt='post-hero'
        />
        <div className='flex justify-between flex-grow'>
          <div className='flex flex-col'>
            <p className='text-xl'>Anna Sthesia</p>
            <p className='text-xs text-txt-secondary-color'>
              July 26 2018, 01:03pm
            </p>
          </div>
          <i className='ri-more-fill text-xl cursor-pointer'></i>
        </div>
      </div>
      {/**Post details */}
      <div className='flex flex-col gap-2 flex-grow'>
        <p>
          Yesterday with @Karen Miller and @Marvin Stemperd at the #Rock'n'Rolla
          concert in LA. Was totally fantastic! People were really excited about
          this one!
        </p>
        <img
          className='rounded-lg'
          src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650194819/1_erzjab.jpg'
          alt='post-details'
        />
      </div>
      {/**Post footer */}
      <div className='flex gap-4 flex-grow py-1  items-center justify-evenly font-normal text-txt-secondary-color'>
        <div className='flex items-center  cursor-pointer gap-1'>
          <i className='ri-heart-line'></i>
          <span>140 likes</span>
        </div>
        <div className='flex items-center cursor-pointer gap-1'>
          <i className='ri-chat-1-line'></i>
          <span>comments</span>
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
              <p className='font-light text-primary cursor-pointer'>Reply</p>
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
              <p className='font-light text-primary cursor-pointer'>Reply</p>
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
  );
};

export default PostFeedCard;
