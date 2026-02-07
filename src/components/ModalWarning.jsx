import React from 'react'

import styles from "./ModalWarning.module.css"



function ModalWarning() {

    const modalBox = document.getElementById("modalBox")
    // modalBox.style.display="flex"


    const closeHandler =()=>{
        modalBox.style.display="none"
    }
    
    const deleteHandler =()=>{

    }

    // window.onclick = function(event) {
    //     if (event.target == modalBox) {
    //         modalBox.style.display = "none";
    //     }
    // }   


    
  return (
    <div className={styles.modalBox} id='modalBox'>
        <div className={styles.modalContent}>
            <div className={styles.modalInfo}>
                <p>Are you Sure you want to delete this Contact?</p>
            </div>
            <div className={styles.modalBtn}>
                <button  className={styles.noBtn} onClick={closeHandler} >No, Don't delete</button>
                <button className={styles.delBtn} onClick={deleteHandler}>Yes, I'am Sure</button>
            </div>
        </div>
    </div>    
  )
}

export default ModalWarning