import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nav } from '../../components';
import PostFeedCard from '../PostFeedPage/components/PostFeedCard/PostFeedCard';
import { getPostById } from './PostIndividualSlice';

export const PostIndividualPage = () => {
  const { postId } = useParams();
  const { allPosts } = useSelector((store) => store.posts);
  const { post, isLoading } = useSelector((store) => store.postIndividual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(getPostById({ postId }));
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById({ postId }));
    }
  }, [allPosts]);

  console.log(post);
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
      <main className='p-4'>
        <div className='flex justify-center'>
          <div className='flex flex-col w-2/5 md:w-4/5 sm:w-full gap-4'>
            <div className='flex flex-col gap-4'>
              {Object.keys(post).length > 0 ? (
                <PostFeedCard
                  key={post?._id}
                  postData={post}
                  individualPage={true}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
