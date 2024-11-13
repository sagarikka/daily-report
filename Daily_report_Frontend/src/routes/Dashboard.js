import React, { useEffect, useState } from 'react';
import ArticleContainer from '../utils/ArticleContainer';
import postThumbnail from "../utils/news2.jpeg";
import { Link, useParams } from 'react-router-dom';
import { makeAuthenticatedDeleteRequest, makeUnauthenticatedGETRequest } from '../utils/fetchConfig';
import DeletePost from './DeletePost';

function Dashboard() {
  const [posts,setposts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [selectedPostId,setSelectedPostId]=useState(null)
  const [isModalOpen,setIsModalOpen]=useState(false);
  const {id}=useParams();

  const handleDeleteClick = (postId) =>{
    setSelectedPostId(postId);
    setIsModalOpen(true);
  }

  useEffect(()=>{
    const getData=async()=>{
      try{
        const response=await makeUnauthenticatedGETRequest(`/posts/posts/author/${id}`);
        if(response.message){
          setLoading(false);
          setError(response.message);
          return response.message;
        }
        console.log("response",response);
        setLoading(false);
        setposts(response);
        return response;
      }
      catch(error){
        setLoading(false);
        setError(error);
        console.log("errror during fetching post for dashboard",error);
        return error;
      }
    }
    getData();
  },[id]);

  const confirmDelete=async()=>{
    try{
      const response=await makeAuthenticatedDeleteRequest(`/posts/delete/${selectedPostId}`)
      setposts(posts.filter(post => post._id !== selectedPostId));
    }
    catch(error){
      console.log("Error deleteing post:",error);
      setError("failed to delete post.");
    }
    finally {
      setIsModalOpen(false);
      setSelectedPostId(null);
    }
  }

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>error during fetchingpost: {error}</div>
  }

  return (
    <ArticleContainer>
    <div className={`dashboard ${isModalOpen && 'dashboard-opacity'} `} onClick={()=>{isModalOpen&&setIsModalOpen(false)}}>
      {
        posts.length >0 ? <div className='dashboard__container '>
          {
            posts.map((post) => 
              {return <div key={post._id} className='dashboard__post'>
                <div className='dashboard__post-info'>
                  <div className='dashboard__post-thumbnail'>
                    <img src={post.thumbnai?post.thumbnail:postThumbnail} alt={post.title} />
                  </div>
                  <div className='text-l font-bold '>{post.title}</div>
                </div>
                <div className='dashboard__post-actions'>
                  <Link to={`/posts/${post._id}`} className='btn'>view</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn primary'>Edit</Link>
                  <Link onClick={(e)=>{e.preventDefault(); handleDeleteClick(post._id)}} className='btn danger '>Delete</Link>
                </div>
              </div>})
          }
        </div>:<div className='text-4xl font-bold flex justify-center items-center'>you have no posts yet</div>
      }
    </div>
    <DeletePost 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={confirmDelete}
    />
    </ArticleContainer>
  )
}

export default Dashboard
