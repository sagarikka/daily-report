import React, { useEffect, useState } from 'react'
import ArticleContainer from '../utils/ArticleContainer';
import PostItem from '../components/PostItem';
import { useParams } from 'react-router-dom';
import { makeUnauthenticatedGETRequest } from '../utils/fetchConfig';
import postThumbnail from "../utils/news2.jpeg";

function CategoryPosts() {
  const [posts,setPosts] =useState([]);
  const [errorMessage,setErrorMessage]=useState("");
  const [loading, setLoading] = useState(true);  // Initialize loading state

  const {category}=useParams();
  useEffect(()=>{
    const getData=async()=>{
      console.log(category);
      const response=await makeUnauthenticatedGETRequest(`/posts/posts/${category}`);
      console.log(response);
      if(response.message){
        setErrorMessage(response.message);
        return response.message;
      }
      setPosts(response);
      return response;
    }
    getData();
  },[category])
  
  return (
    <ArticleContainer>
    <div className='category__posts'>
      {
        posts.length>0?<div className='category__posts-container'>
          {
            posts.map((post) =>  <PostItem key={post._id} postID={post._id} thumbnail={post.thumbnail?post.thumbnail:postThumbnail} category={category} title={post.title} desc={post.description} author={post.author}/>)
          }
        </div>:<h2 className='text-4xl font-bold flex justify-center items-center'>No posts found</h2>

      }
    </div>
    </ArticleContainer>
  )
}

export default CategoryPosts
