import React, { useState } from 'react'

import styles from "./ContactItem.module.css"

import mailbox from "../assets/mailbox-svgrepo-com.svg"
import deleteIcon from "../assets/delete-svgrepo-com2.svg"
import editIcon from "../assets/edit-3-svgrepo-com.svg"
import moreIcon from "../assets/more-horizontal-square-svgrepo.svg"


function ContactItem({data , setAddStatus , setEdit , selectState , selectHandler , modalHandler}) {

    const [moreCheck , setMoreCheck] = useState(true)
     
    const moreHandler = ()=>{
        setMoreCheck(moreCheck=>!moreCheck)
    }
    
    const  {id,fullName,job,email,phone} = data

    const editHandler = ()=>{
        setEdit({... data})
        setAddStatus((addStatus)=>!addStatus)
    }

  return (
    <li className={styles.item}>
        <p>{fullName}</p>
        <p><img src={mailbox} alt="mailbox" className={styles.mailBox}/>{email}</p>
        
        {
            selectState
            ? 
                (<div className={styles.checkBox}>
                    <input type="checkbox" value={id}  onClick={selectHandler}/>
                </div>)
            :    
                (<div className={styles.buttonBox}>
                    {
                        moreCheck ? 
                        (
                            <img src={moreIcon} alt="moreIcon" className={styles.moreBtn} onClick={moreHandler}/>
                        )
                        : 
                        (
                            <>
                                <img src={editIcon} alt="editIcon" className={styles.editBtn}  onClick={editHandler}/>
                                <img src={deleteIcon} alt="deleteIcon"  className={styles.deleteBtn} onClick={()=>modalHandler(id)}/>
                            </>

                        )  
                    }
                </div>)
        }
        
    </li>
  )
}

export default ContactItem