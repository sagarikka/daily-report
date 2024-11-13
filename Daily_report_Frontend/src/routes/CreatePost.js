import React, { useState } from 'react';
import ArticleContainer from '../utils/ArticleContainer';
import 'react-quill/dist/quill.snow.css';
import { makeAuthenticatedPostRequest } from '../utils/fetchConfig';
import CloudinaryImageUpload from '../components/CloudinaryThumbnailUpload';
import { useNavigate } from 'react-router';

function CreatePost() {
  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("uncategorized");
  const [description,setDescription]=useState("");
  const [thumbnail,setThumbnail]=useState("");
  const [uploadedFileName, setUploadedFileName] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [post,setPost]=useState("");
  const navigate=useNavigate();

  const submit = async () => {
    console.log(category);
    try {
      const response = await makeAuthenticatedPostRequest("/posts/post", {
        title,
        category,
        description,
        thumbnail
      });

      console.log("Response from server:", response);

      if (response.message) {
        setErrorMessage(response.message);
        return response.message;
      } 
      setPost(response);
      navigate(`/posts/${response._id}`);

    } catch (error) {
      console.error("Error making authenticated POST request:", error);
      setErrorMessage("Failed to create post. Please try again."); 
    }
  };
 
  const POST_CATEGORIES=[ "Uncategorized","Agriculture","Business","Education","Entertainment","Art","Investment",
   "Weather"]

  return (
    <ArticleContainer>
    <div className='create-post'>
      <div className='container w-4/5 space-y-2 m-auto md:w-1/2'>
        <div className='text-4xl font-bold flex justify-start items-center'>Create Post</div>
        {errorMessage&&<div className='form__error-messsage w-full bg-red-500 font-semibold p-1 px-2'>
          {errorMessage}
        </div>}
        <form className='form create-post__form w-full space-y-2 '>
          <input type='test' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='w-full p-1 px-2  border border-black outline-none' autoFocus/>
          <select name='category' value={category} onChange={e => setCategory(e.target.value)} className='p-1 px-2 border border-black'>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          {/*<ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>*/}
          <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className='w-full border border-black outline-none h-48'/>
          {/*<input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png.jgp.jpeg' className='w-full'/>*/}
          {/* Cloudinary Image Upload */}
          <CloudinaryImageUpload seturl={setThumbnail} setName={setUploadedFileName} />
            
            {/* Display the uploaded image (if available) */}
            {thumbnail && <img src={thumbnail} alt="Uploaded" className='w-24 h-24 mt-2' />}
          <button type='submit' className='btn primary border border-black' onClick={(e)=>{e.preventDefault(); submit();}}>Create</button>
        </form>
      </div>
    </div>
    </ArticleContainer>
  )
}

export default CreatePost
