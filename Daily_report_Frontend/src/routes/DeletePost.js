import React from 'react'

function DeletePost({isOpen,onClose,onConfirm}) {
  if(!isOpen) return null;
  return (
    <div className='delete-modal '>
      <div className='modal-message'>
        <div>Are you sure you want to delete this post</div> 
      </div>
      <div className='modal-buttons'>
        <button onClick={(e)=>{e.preventDefault(); onConfirm();}} className='btn'>Confirm</button>
        <button onClick={(e)=>{e.preventDefault(); onClose();}} className='btn'>Cancel</button>
      </div>
    </div>
   
  )
}

export default DeletePost
