import React, { useEffect, useState } from 'react'
import ArticleContainer from '../utils/ArticleContainer';
import PostAuthor from '../components/postAuthor';
import { Link, useParams } from 'react-router-dom';
import postThumbnail from '../utils/news2.jpeg'
import { makeAuthenticatedGETRequest} from '../utils/fetchConfig';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);
  const [CurrentUser,setCurrentUser]=useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(`/posts/post/${id}`);
        const user=await makeAuthenticatedGETRequest("/auth/userprofile");
        console.log(response);
        if (response.message) {
          setError(response.message);
          return response.message;
        }
        setPost(response); // Set the post data
        if(user.message){
          console.log(user.message);
        }
        else{
          console.log(user);
          setCurrentUser(user);
        }
        setLoading(false);
        return response;
      } catch (error) {
        console.log(error);
        setError('Error fetching post');
        setLoading(false);
        return error;
      }
    };
    getData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }
  return (
    <ArticleContainer>
    <div className='post-detail flex justify-center items-center  '>
    <div className=' w-full md:w-1/2 lg:w-2/5 bg-white px-10 py-4 h-screen space-y-2'>
      <div className=' post-detail__container '>
        <div className='post-detail__header flex justify-between items-center '>
          <PostAuthor author={post.author}/>
          {CurrentUser.id===post.author._id&&<div className='post-detail__buttons'>
            <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
            <Link className='btn sm danger'>Delete</Link>
          </div>}
        </div>
      </div>
      <div className='text-3xl font-bold py-1 '>{post.title}</div>
      <div className='post-detail__thumbnail h-1/2 w-full'>
        <img src={post.thumbnail?post.thumbnail:postThumbnail} alt='' className='h-full w-full'/>
      </div>
      <div>{post.description}</div>
      </div>
    </div>
    </ArticleContainer>
  )
}

export default PostDetail
