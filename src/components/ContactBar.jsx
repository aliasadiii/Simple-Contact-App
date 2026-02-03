import { useState } from "react"

import AddContact from "./AddContact"

import styles from "./ContactBar.module.css"
import ContactList from "./ContactList"


function ContactBar() {

    const [contacts,setContacts]=useState(JSON.parse(localStorage.getItem("contacts")))
    const [addStatus , setAddStatus] = useState(false)
    const [searchRes , setSearchRes] = useState([])
    const [searchValue , setSearchValue] = useState("")

    const saveToLocalStorage = (contacts)=>{
        const stringifyContact =JSON.stringify(contacts)
        localStorage.setItem("contacts",stringifyContact)

    }

    const searchHandler = (event)=>{
        const value = event.target.value
        // const name = event.target.name

        const searchResult = contacts.filter((contact)=>
        contact.fullName.includes(value)||contact.email.includes(value) )
        console.log(searchResult);
        
        setSearchValue(searchValue=>searchValue=value)
        setSearchRes((searchRes)=>searchRes=searchResult)

    }

    const addHandler = ()=>{
        setAddStatus((addStatus)=>!addStatus)
        // console.log(addStatus)
    }
    
    

    const selectHandler = ()=>{}

  return (
    <>
        {!addStatus 
            ?(
                <>
                <div className={styles.container}>
                    <div className={styles.searchContainer}>
                        <p>search in contact :</p>
                        <input type="text" name="search" onChange={searchHandler}/>
                    </div>
                    <div className={styles.toolsContainer}>
                        <button onClick={addHandler}>Add Contact</button>
                        <button onClick={selectHandler}>Select</button>
                    </div>
                </div>
                <ContactList contacts={contacts} setContacts={setContacts} saveToLocalStorage={saveToLocalStorage} searchRes={searchRes} searchValue={searchValue}/>
                
                </>

            ) 

            :(<AddContact setAddStatus={setAddStatus} contacts={contacts} setContacts={setContacts} saveToLocalStorage={saveToLocalStorage}/>)
        }

    </>
  )
}

export default ContactBar