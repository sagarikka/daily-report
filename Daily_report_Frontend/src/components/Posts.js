import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { makeUnauthenticatedGETRequest } from '../utils/fetchConfig';
import postThumbnail from '../utils/news2.jpeg'

function Posts() {
    const [posts,setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null);

    useEffect(() => {
      const  getData=async()=>{
        try{
          const response=await makeUnauthenticatedGETRequest("/posts/allpost");
          console.log(response);
          if(response.message){
            setError(response.message);
            return error;
          }
          setPosts(response);
          setLoading(false);
          return response;
        }
        catch(error){
          console.log(error);
          setError('Error fetching post');
          setLoading(false);
          return error;
        }
      }
      getData();
    },[])
    if (loading) {
      return <div>Loading...</div>; // Show loading spinner
    }
  
    if (error) {
      return <div>{error}</div>; // Show error message
    }

  return (
    <div className='posts'>
     {posts.length > 0 ? <div className='container posts__container'>
       {
        posts.map((post)=>

        <PostItem key={post._id} postID={post._id} thumbnail={post.thumbnail?post.thumbnail:postThumbnail} category={post.category} title={post.title} desc={post.description} author={post.author} /> )
       }
      </div>:<div className='text-4xl font-bold flex justify-center items-center'>No posts founds</div>}
    </div>
  )
}

export default Posts
