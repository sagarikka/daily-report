import React, { useEffect, useState } from 'react'
import ArticleContainer from '../utils/ArticleContainer';
import postThumbnail from '../utils/news2.jpeg'
import PostItem from '../components/PostItem';
import { useParams } from 'react-router';
import { makeUnauthenticatedGETRequest } from '../utils/fetchConfig';
function AuthorPosts() {
  const [posts,setPosts]=useState([]);
  const {id}=useParams();
  console.log(id);
  useEffect(()=>{
      const getData=async()=>{
        const response=await makeUnauthenticatedGETRequest(`/posts/posts/author/${id}`)
        if(response.message){
          console.log(response.message)
        }
        console.log(response);
        setPosts(response);
        return response;
      }
      getData();
  },[])
 
  return (
    <ArticleContainer>
    <div className='author__posts '>
      {posts.length>0 ? <div className='  author__post-container '>
        {
          posts.map((post)=>

          <PostItem key={post._id} postID={post._id} thumbnail={post.thumbnail?post.thumbnail:postThumbnail} category={post.category} title={post.title} desc={post.description} author={post.author} /> )
        }
      </div>:<div className='text-4xl font-bold flex justify-center items-center'>No post found</div>}
    </div>
    </ArticleContainer>
  )
}

export default AuthorPosts
