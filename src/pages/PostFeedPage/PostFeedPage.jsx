import { Nav } from '../../components';

export const PostFeedPage = () => {
  return (
    <>
      <Nav />
      <main className='p-4'>
        {/*divider */}
        <div className='flex justify-center'>
          {/* news feed */}
          <div className='flex flex-col    w-3/5 md:w-4/5 sm:w-full  gap-4 '>
            {/**Scrollable follow chips */}
            <div className='flex flex-col gap-2 bg-nav-background rounded-lg drop-shadow-2xl p-4'>
              <div className='p-1'>
                <div className='flex gap-1 flex-nowrap overflow-x-scroll'>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                  <div className='w-28 h-40 bg-yellow-400 rounded-lg'>
                    Hello Loremsddsdsd
                  </div>
                </div>
              </div>
              <button className='p-2 bg-primary active:bg-blue-500 text-white rounded-lg'>
                See More People
              </button>
            </div>
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
                      className='h-14 w-14 rounded-full'
                      src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650096757/1_vztwsr.jpg'
                      alt=''
                    />
                    <textarea
                      className='grow resize-none focus:outline-none font-light text-txt-secondary-color'
                      placeholder='Write something here'
                      type='text'
                    ></textarea>
                  </div>
                  <hr className='font-extralight text-secondary' />
                  <ul className='flex gap-4 font-light items-center'>
                    <li className='flex items-center gap-3 bg-secondary-background py-2 px-3 rounded-md cursor-pointer'>
                      <img
                        src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650190023/07_dffvl5.png'
                        alt=''
                      />
                      <p className='text-primary text-sm font-semibold'>
                        Photo/Video
                      </p>
                    </li>
                    <li className='flex items-center gap-3 bg-secondary-background py-2 px-3 rounded-md cursor-pointer'>
                      <img
                        src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650190352/08_xnw23j.png'
                        alt=''
                      />
                      <p className='text-primary text-sm font-semibold'>
                        Tag Friend
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <button className='mb-4 mx-4 p-2 bg-primary active:bg-blue-500 text-white rounded-lg'>
                Post
              </button>
            </div>
            {/**Post-feed */}
            <div className='flex flex-col gap-4 bg-nav-background rounded-lg drop-shadow-2xl p-5'>
              {/** post header */}
              <div className='flex gap-4  flex-grow'>
                <img
                  className='rounded-full h-12 w-12'
                  src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650191393/01_jxbjlo.jpg'
                  alt=''
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
                  Yesterday with @Karen Miller and @Marvin Stemperd at the
                  #Rock'n'Rolla concert in LA. Was totally fantastic! People
                  were really excited about this one!
                </p>
                <img
                  className='rounded-lg'
                  src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650194819/1_erzjab.jpg'
                  alt=''
                />
              </div>
              {/**Post footer */}
              <div className='flex gap-4 flex-grow py-1  items-center justify-evenly font-normal text-txt-secondary-color'>
                <div className='flex items-center  cursor-pointer gap-1'>
                  <i class='ri-heart-line'></i>
                  <span>140 likes</span>
                </div>
                <div className='flex items-center cursor-pointer gap-1'>
                  <i class='ri-chat-1-line'></i>
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
                    alt=''
                  />
                  <div>
                    <p className='font-normal'>Monty Carlo</p>
                    <p className='font-light text-txt-secondary-color'>
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className='flex gap-3'>
                      <p className='font-light text-primary cursor-pointer'>
                        Like
                      </p>
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
                    alt=''
                  />
                  <div>
                    <p className='font-normal'>Monty Carlo</p>
                    <p className='font-light text-txt-secondary-color'>
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className='flex gap-3'>
                      <p className='font-light text-primary cursor-pointer'>
                        Like
                      </p>
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
                    alt=''
                  />
                  <div>
                    <p className='font-normal'>Monty Carlo</p>
                    <p className='font-light text-txt-secondary-color'>
                      Thank you for your reply!
                    </p>
                    <p className='font-light text-primary cursor-pointer'>
                      Like
                    </p>
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
          </div>
        </div>
      </main>
    </>
  );
};
