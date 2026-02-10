import React from 'react'

import  './SnackBar.css'

function SnackBar() {

  const closeHandler =()=>{
    const addToast = document.getElementById("addToast")
    addToast.classList.remove("show")
  }

  return (
    <>
      <div className="addToast toast" id='addToast'>
              <span className="closeBtn" onClick={closeHandler}>&times;</span>
              <p>Contact added successfully</p>
      </div>

      <div className="deleteToast toast" id='deleteToast'>
              <span className="closeBtn" onClick={closeHandler}>&times;</span>
              <p>Contact Deleted successfully</p>
      </div>
    </>
  )
}

export default SnackBar