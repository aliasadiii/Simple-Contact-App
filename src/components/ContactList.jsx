import React, { useState } from 'react'

import ContactItem from './ContactItem'

import styles from "./ContactList.module.css"
import ModalWarning from './ModalWarning'
import SnackBar from './SnackBar'

function ContactList({contacts , setContacts , searchRes , searchValue , setAddStatus , setEdit , setSaveStatus , selectState , setCheckedId , checkedId , multiDeleteHandler , multiDelCheck , setModalDisplay , modalDisplay , setMultiDelCheck}) {
   
    const [deleteId , setDeleteId] = useState("")


    const showSnackBar = () => {
        const addToast = document.getElementById("deleteToast")
        addToast.classList.add("show")
        setTimeout(()=>{
            addToast.classList.remove("show")
        },3000)
    }

    const singleDeleteHandler = ()=>{
        const newContact = contacts.filter((contact)=>contact.id!==deleteId)
        setContacts(newContact)
        setSaveStatus(saveStatus=>!saveStatus)
        setModalDisplay("none")
        setDeleteId("")
        showSnackBar()
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
// console.log(searchValue , searchRes)

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

        <SnackBar />

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
                                selectState={selectState}
                                selectHandler={selectHandler}
                                modalHandler={modalHandler}    
                            />                       
                        )
                    }

                    {(!searchRes.length && searchValue) && <li  className={styles.NotFoundMessage}>No Contact Found</li>}
 
                </ul>
                // {searchRes.length ?}
            ) :( <p className={styles.message}>No Contacts Yet!</p> ) 
        }
    </div>
  )
}

export default ContactList