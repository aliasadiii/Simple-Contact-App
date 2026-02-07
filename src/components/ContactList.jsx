import React, { useState } from 'react'

import ContactItem from './ContactItem'

import styles from "./ContactList.module.css"
import ModalWarning from './ModalWarning'

function ContactList({contacts , setContacts , saveToLocalStorage , searchRes , searchValue , setAddStatus , edit , setEdit , setSaveStatus , selectState , setCheckedId , checkedId , modalBox}) {
   
    const [modalStatus , setModalStatus] = useState({modalState:false , deleteState:false})
    // const modalBox = document.getElementById("modalBox")


    const singleDeleteHandler = (id)=>{
        setModalStatus(modalStatus=>!modalStatus.modalState)
        modalBox.style.display="flex"
        // const newContact = contacts.filter((contact)=>contact.id!==id)
        // setContacts(newContact)
        // setSaveStatus(saveStatus=>!saveStatus)

        
        // saveToLocalStorage(newContact)
    }

    const selectHandler = (event)=>{
        const targetId = event.target.value
        if (event.target.checked){
            setCheckedId(checkedId=>checkedId=[...checkedId , targetId])
        }else{
            const newCheckedId=checkedId.filter(id => id !=targetId)
            setCheckedId([...newCheckedId])
        }

    }

    // console.log(selectState)
    // console.log("checkedId", checkedId)

  return (

    <div className={styles.container}>
        <h2>Contact List</h2>
        <ModalWarning id='modalBox'/>
        {
            contacts.length ?(
                <ul className={styles.contacts}>
                    {
                       (searchRes.length || searchValue ? searchRes : contacts).map((contact)=>
                        <ContactItem 
                            key={contact.id} 
                            data={contact} 
                            singleDeleteHandler={singleDeleteHandler} 
                            setAddStatus={setAddStatus}
                            setEdit={setEdit}
                            edit={edit}
                            selectState={selectState}
                            selectHandler={selectHandler}
                        />
                    )
                    }
                    
                </ul>
            ) :( <p className={styles.message}>No Contacts Yet!</p> ) 
        }
    </div>
  )
}

export default ContactList