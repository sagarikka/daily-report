import React from 'react'
import Header from "../components/header"
import "../App.css"
import Footer from '../components/Footer'
import { makeAuthenticatedGETRequest} from '../utils/fetchConfig';
import { useEffect,useState } from 'react';

function ArticleContainer({children}) {
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  // const dispatch =useDispatch();
  // const {profile}= useSelector((state) => state.userProfile); // Destructure profile, loading, error
  // console.log("profile", profile);
  
  // useEffect(() => {

  //     dispatch(fetchUserProfile()); // Fetch profile only if not already loading or available
  // }, [dispatch]);
  useEffect(()=>{
    const getData=async()=>{
      const response=await makeAuthenticatedGETRequest("/auth/userprofile");
      if(response.message){
        setError(response.message);
        setLoading(false);
        return response.message;
      }
      setLoading(false);
      console.log(response);
      setProfile(response);
      return response;
    }
    getData();
  },[])

  return (
    <div className='article text-color-gray-700 w-full h-full'>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Header profile={profile} />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
}

export default ArticleContainer
