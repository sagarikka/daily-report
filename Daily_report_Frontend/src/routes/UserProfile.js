import React, { useEffect, useState } from 'react';
import ArticleContainer from '../utils/ArticleContainer';
import { Link } from 'react-router-dom';
import Avatar from "../utils/avatar1.jpg";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../utils/userProfileSlice';
import CloudinaryImageUpload from '../components/CloudinaryThumbnailUpload';
import { makeAuthenticatedPutRequest } from '../utils/fetchConfig';

function UserProfile() {
  const [Edit, setEdit] = useState(true);
  const [profilePicture,setProfilePicture]=useState(null);
  const [userName,setUserName]=useState(null)
  const [uploadedFileName,setUploadedFileName]=useState(null);
  const [id,setId]=useState(null)

  const dispatch = useDispatch();
  const {profile}  = useSelector((state) => state.userProfile); 
  console.log("profile",profile)

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfilePicture(profile.profile || Avatar);
      setUserName(profile.userName);
      setId(profile.id);
    }
  }, [profile]);

  // Function to toggle between edit and check buttons
  function toggleEdit() {
    setEdit(!Edit); // Toggle the state between true and false
  }
 const changeProfile=async()=>{
    const response= await makeAuthenticatedPutRequest("/auth/profile",{profilePicture,userName})
    console.log(response);
    if(response.message){
      return response.message;
    }
  }
  
  return (
    <ArticleContainer>
      <div className='profile'>
        <div className='profile__container'>
          <Link to={`/myposts/${id}`} className='btn'>My posts</Link>
          <div className='profile__details'>
            <div className='avatar__wrapper'>
              <div className='profile__avatar'>
                <img src={profilePicture} alt="" />
              </div>

              {/* Conditionally render the Cloudinary form based on Edit state */}
              <form className='avatar__form'>
              {Edit  && (
                  <div className='upload-avatar'>
                    <CloudinaryImageUpload seturl={setProfilePicture} setName={setUploadedFileName}/>
                  </div>
                )}
                {/* Edit button should only show when Edit is true */}
                {Edit && (
                  <label htmlFor='avatar' className='profile__avatar-edit' >
                    <FaEdit />
                  </label>
                )}
              </form>

              {!Edit && (
                <button className='profile__avatar-btn' onClick={(e) => { e.preventDefault(); toggleEdit(); }}>
                  <FaCheck />
                </button>
              )}
            </div>

            <div className='font-bold text-2xl user-name'>{userName}</div>

            {/* Form to update user details */}
            <form className='form profile__form '>
              <div className='font-semibold mt-2'>Change your User Name here:</div>
              <input type='text' placeholder='Full Name' value={userName} onChange={(e)=>{setUserName(e.target.value)}} autoFocus />
              <button 
                className='update__button' 
                onClick={(e) => { e.preventDefault(); toggleEdit(); changeProfile();}}
              >
                Update Name
              </button>
            </form>
          </div>
        </div>
      </div>
    </ArticleContainer>
  );
}

export default UserProfile;
