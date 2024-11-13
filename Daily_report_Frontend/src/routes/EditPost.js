import React, { useEffect, useState } from 'react';
import ArticleContainer from '../utils/ArticleContainer';
import 'react-quill/dist/quill.snow.css';
import CloudinaryImageUpload from '../components/CloudinaryThumbnailUpload';
import { useNavigate, useParams } from 'react-router';
import { makeAuthenticatedPutRequest, makeUnauthenticatedGETRequest } from '../utils/fetchConfig';


function EditPost() {
  const [title,setTitle]=useState();
  const [category,setCategory]=useState();
  const [description,setDescription]=useState();
  const [thumbnail,setThumbnail]=useState();
  const [uploadedFileName, setUploadedFileName] = useState(""); 
  const [editedPost,setEditedPost]=useState(null);
  const {id}=useParams();
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const navigate=useNavigate();
   
  const POST_CATEGORIES=["Uncategorized","Agriculture","Business","Education","Entertainment","Art","Investment",
    "Weather"]
  useEffect(()=>{
    const getData=async()=>{
      try{
        const response=await makeUnauthenticatedGETRequest(`/posts/post/${id}`);
        if(response.message){
          setLoading(false);
          setError(response.message);
          return response.message;
        }
        setLoading(false);
        console.log(response);
        setTitle(response.title);
        setCategory(response.category);
        setThumbnail(response.thumbnail);
        setDescription(response.description);
        return response;
      }
      catch(error){
        setLoading(false);
        setError(error);
        console.log("error fetching the post during edit",error);
        return error;
      }
    }
    getData();
  },[id])

  const Edit=async()=>{
    const EditedPost=await makeAuthenticatedPutRequest(`/posts/edit/${id}`,{title,category,description,thumbnail})
    if(EditedPost.message){
      setError(EditedPost.message);
      return EditedPost.message;
    }
    console.log(EditedPost);
    setEditedPost(EditedPost);
    navigate(`/posts/${id}`);
  }

  if(loading){
    return <div>Loading....</div>
  }
  return (
    <ArticleContainer>
    <div className='create-post'>
      <div className='container w-4/5 space-y-2 m-auto md:w-1/2'>
        <div className='text-4xl font-bold flex justify-start items-center'>Edit Post</div>
        {error&&<div className='form__error-messsage w-full bg-red-500 font-semibold p-1 px-2'>
          {error}
        </div>}
        <form className='form create-post__form w-full space-y-2 '>
          <input type='test' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='w-full p-1 px-2  border border-black outline-none' autoFocus/>
          <select name='category' value={category} onChange={e => setCategory(e.target.value)} className='p-1 px-2 border border-black'>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className='w-full border border-black outline-none h-48'/>
          {/*<input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png.jgp.jpeg' className='w-full'/>*/}
          {/* Cloudinary Image Upload */}
          <CloudinaryImageUpload seturl={setThumbnail}  setName={setUploadedFileName}/>
            
            {/* Display the uploaded image (if available) */}
            {thumbnail && <img src={thumbnail} alt="Uploaded" className='w-24 h-24 mt-2' />}
          <button type='submit' className='btn primary border border-black' onClick={(e)=>{e.preventDefault(); Edit();}}>Update</button>
        </form>
      </div>
    </div>
    </ArticleContainer>
  )
}

export default EditPost
