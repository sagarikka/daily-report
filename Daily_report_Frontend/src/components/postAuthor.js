import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../utils/avatar1.jpg"
import { makeUnauthenticatedGETRequest } from '../utils/fetchConfig'

function PostAuthor({author}) {
  
  return (
    <div >
      <Link to={`/posts/author/${author._id}`} className='post__author'>
      <div className='post__author-avatar'>
            <img src={author.profile?author.profile:Avatar} alt=''/>
        </div>
        <div className='post__author-details '>
            <div className='font-bold text-xl '>By: {author.userName}</div>
            
        </div>
      </Link>
    </div>
  )
}

export default PostAuthor
