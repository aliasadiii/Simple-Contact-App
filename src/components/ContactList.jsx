import React from 'react'

import ContactItem from './ContactItem'

import styles from "./ContactList.module.css"

function ContactList({contacts , saveToLocalStorage , searchRes , searchValue}) {
    // console.log(contacts);
    const singleDeleteHandler = (id)=>{
        const newContact = contacts.filter((contact)=>contact.id!==id)
        saveToLocalStorage(newContact)
    }

  return (

    <div className={styles.container}>
        <h2>Contact List</h2>
        {
            contacts.length ?(
                <ul className={styles.contacts}>
                    {
                       (searchRes.length || searchValue ? searchRes : contacts).map((contact)=>
                        <ContactItem key={contact.id} data={contact} singleDeleteHandler={singleDeleteHandler}/>
                    )
                    }
                    
                </ul>
            ) :( <p className={styles.message}>No Contacts Yet!</p> ) 
        }
    </div>
  )
}

export default ContactList