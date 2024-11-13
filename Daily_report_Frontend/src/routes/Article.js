import React from 'react'
import ArticleContainer from '../utils/ArticleContainer'
import Posts from '../components/Posts'


function Article() {
 
  return (
    <ArticleContainer>
    <div className='postscard'>
        <Posts/>
    </div>
    </ArticleContainer>
   
  )
}

export default Article
