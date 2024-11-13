import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './postAuthor'

function PostItem({postID,category,title,desc,author,thumbnail}) {
  const shortDescription=desc.length >145 ? desc.substr(0,145)+"..." :desc;
  const shortTitle=title.length >30 ?title.substr(0,30)+"...":title;
  return (
    <div className='post'>
      <div className='post__thumbnail'>
        <img src={thumbnail} alt={title} className='w-full'/>
      </div>
      <div className='post__content'>
        <Link to={`/posts/${postID}`}>
          <div className='text-xl title'>{shortTitle}</div>
        </Link>
        <div>{shortDescription}</div>
        <div className='post__footer'>
          <PostAuthor author={author}/>
          <Link to={`/posts/category/${category}`} className='btn category primary'>{category}</Link>
        </div>
      </div>
    </div>
  )
}

export default PostItem
