import React, { useEffect, useState } from 'react'
import ArticleContainer from '../utils/ArticleContainer';
import Avatar1 from '../utils/avatar1.jpg'
import { Link } from 'react-router-dom';
import { makeUnauthenticatedGETRequest} from '../utils/fetchConfig';

function Authors() {
  
  const [authorsData,setAuthorsData]=useState([]);
  useEffect(()=>{
    const getData=async()=>{
       const response =await makeUnauthenticatedGETRequest("/auth/authors")
       console.log(response)
       setAuthorsData(response)
       return response
    }
    getData();
   
  },[authorsData])
  return (
    <ArticleContainer>
    <div className='authors'>
      {authorsData.length>0 ? <div className=' authors__container'>
        {
          authorsData.map((author)=> (
          <Link to={`/posts/author/${author.id}`}><div className='authors__card' key={author.id}>
            <div className='authors-card__avatar'><img src={author.profile?author.profile:Avatar1} alt={author.userName}/></div>
            <div className='authors__details'>
                <div className='font-bold text-lg'>{author.userName}</div>
                <div>{author.postCount}</div>
            </div>
          </div></Link>))
        }
      </div>: (<div> No author found</div>)}
    </div>
    </ArticleContainer>
  )
}

export default Authors
