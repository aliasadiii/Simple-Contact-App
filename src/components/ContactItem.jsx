import React, { useState } from 'react'

import styles from "./ContactItem.module.css"


function ContactItem({data: {id,fullName,job,email,phone} , singleDeleteHandler}) {
    // console.log(data);
    const [moreCheck , setMoreCheck] = useState(true)
    const moreHandler = ()=>{
        setMoreCheck(moreCheck=>!moreCheck)
    }


  return (
    <li className={styles.item}>
        <p>{fullName}</p>
        <p>Mail Box: {email}</p>
        {
            moreCheck ? 
            (<button onClick={moreHandler}>more</button>)
            : 
            (
                <>
                    <button onClick={()=>singleDeleteHandler(id)}>Delete</button>
                    <button>Edit</button>
                </>

            )
            
        }
    </li>
  )
}

export default ContactItem