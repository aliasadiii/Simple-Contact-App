import { useState } from "react"

import AddContact from "./AddContact"

import styles from "./ContactBar.module.css"


function ContactBar() {
    const [addStatus , setAddStatus] = useState(false)
    const addHandler = ()=>{
        setAddStatus((addStatus)=>!addStatus)
        // console.log(addStatus)
    }


    const selectHandler = ()=>{}

  return (
    <>
        {!addStatus 
            ?(<div className={styles.container}>
                <div className={styles.searchContainer}>
                    <h4>search in contact :</h4>
                    <input type="text" />
                </div>
                <div className={styles.toolsContainer}>
                    <button onClick={addHandler}>Add</button>
                    <button onClick={selectHandler}>Select</button>
                </div>
            </div>) 

            :(<AddContact setAddStatus={setAddStatus}/>)
        }

    </>
  )
}

export default ContactBar