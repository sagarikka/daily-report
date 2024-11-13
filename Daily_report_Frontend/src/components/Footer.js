import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-gray-900'>
      <div className='footer__categories  ' >
        <div><Link to="/posts/category/Agriculture">Agriculture</Link></div>
        <div><Link to="/posts/category/Business">Business</Link></div>
        <div><Link to="/posts/category/Education">Education</Link></div>
        <div><Link to="/posts/category/Agriculture">Entertainment</Link></div>
        <div><Link to="/posts/category/Investment">Investment</Link></div>
        <div><Link to="/posts/category/Uncategorized">Uncategorized</Link></div>
        <div><Link to="/posts/category/Weather">Weather</Link></div>
      </div>
      <div className='footer__copyright'>
        <div className='text-sm'>All Rights Reserved &copy; Copyright</div>
      </div>
    </footer>
  )
}

export default Footer
