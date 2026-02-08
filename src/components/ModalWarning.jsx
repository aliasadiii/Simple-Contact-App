import React from 'react'

import styles from "./ModalWarning.module.css"



                            
function ModalWarning({singleDeleteHandler,setDeleteId , modalDisplay , setModalDisplay , multiDeleteHandler , multiDelCheck , setMultiDelCheck}) {
    
    const modalBox = document.getElementById("modalBox")

    const closeHandler =()=>{
        setModalDisplay("none")
        setDeleteId("")
        setMultiDelCheck(false)
    }
    
    //for closing modal by clicking outside bix //why eslint shows error?
    window.onclick = function(event) {
        if (event.target == modalBox) {
            setModalDisplay("none")
            setMultiDelCheck(false)
        }
    }   


    
  return (
    <div className={styles.modalBox} style={{display:modalDisplay}} id='modalBox'>
        <div className={styles.modalContent}>
            <div className={styles.modalInfo}>
                {
                    multiDelCheck ? <p>Are you Sure you want to delete Multiple Contact?</p>
                    :<p  >Are you Sure you want to delete this Contact?</p>
                }
            </div>
            <div className={styles.modalBtn}>
                <button  className={styles.noBtn} onClick={closeHandler} >No, Don't delete</button>
                <button className={styles.delBtn} onClick={multiDelCheck ? multiDeleteHandler  : singleDeleteHandler }>Yes, I'am Sure</button>
            </div>
        </div>
    </div>    
  )
}

export default ModalWarning