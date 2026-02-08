import React, { useState } from 'react'

import ContactItem from './ContactItem'

import styles from "./ContactList.module.css"
import ModalWarning from './ModalWarning'

function ContactList({contacts , setContacts , searchRes , searchValue , setAddStatus , edit , setEdit , setSaveStatus , selectState , setCheckedId , checkedId , multiDeleteHandler , multiDelCheck , setModalDisplay , modalDisplay , setMultiDelCheck}) {
   
    const [deleteId , setDeleteId] = useState("")
   

    const singleDeleteHandler = ()=>{
        const newContact = contacts.filter((contact)=>contact.id!==deleteId)
        setContacts(newContact)
        setSaveStatus(saveStatus=>!saveStatus)
        setModalDisplay("none")
        setDeleteId("")
    }

    const modalHandler=(id)=>{
        setModalDisplay("flex")
        setDeleteId(id)
        setMultiDelCheck(false)
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

  return (

    <div className={styles.container}>
        <h2>Contact List</h2>
        <ModalWarning id='modalBox' 
            setDeleteId={setDeleteId}
            singleDeleteHandler={singleDeleteHandler}
            modalDisplay={modalDisplay}
            setModalDisplay={setModalDisplay}
            multiDeleteHandler={multiDeleteHandler}
            multiDelCheck={multiDelCheck}
            setMultiDelCheck={setMultiDelCheck}
        />

        {
            contacts.length ?(
                <ul className={styles.contacts}>
                    {
                       (searchRes.length || searchValue ? searchRes : contacts).map((contact)=>
                        <ContactItem 
                            key={contact.id} 
                            data={contact} 
                            setAddStatus={setAddStatus}
                            setEdit={setEdit}
                            edit={edit}
                            selectState={selectState}
                            selectHandler={selectHandler}
                            modalHandler={modalHandler}
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