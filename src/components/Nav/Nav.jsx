export const Nav = () => {
  return (
    <nav className='w-full sticky top-0 min h-20 sm:h-18 left-0 right-0 leading-10 z-50 bg-nav-background shadow'>
      <div className='flex justify-between relative items-center p-4 sm:p-2  h-full'>
        <div className='flex gap-2 items-center cursor-pointer'>
          <img
            className='h-12 sm:h-10 max-w-full align-middle'
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650084912/logo_tzzpf3.png'
            alt='hero'
          />
          <span className='text-3xl sm:hidden'>Socially</span>
        </div>
        <div className='px-4'>
          <form className='relative w-96 md:w-60 sm:hidden flex'>
            <input
              className='py-1 px-4 rounded-md  w-full h-10 bg-secondary-background text-sm'
              type='seach'
              placeholder='search here...'
            />
          </form>
        </div>
        <ul className='text-primary flex items-center gap-4 text-2xl'>
          <li title='search' className='cursor-pointer hidden sm:block'>
            <i className='ri-search-line'></i>
          </li>
          <li title='feed' className='cursor-pointer'>
            <i className='ri-home-8-line'></i>
          </li>
          <li title='follow' className='cursor-pointer'>
            <i className='ri-heart-line'></i>
          </li>

          <li className='cursor-pointer'>
            <img
              className='w-12 h-12 rounded-full'
              src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650096757/1_vztwsr.jpg'
              alt='profile'
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};
