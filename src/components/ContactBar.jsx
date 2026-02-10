import { useEffect, useState } from "react"

import AddContact from "./AddContact"

import styles from "./ContactBar.module.css"
import ContactList from "./ContactList"

import deleteIcon from "../assets/delete-svgrepo-com2.svg"


function ContactBar() {

    const [contacts,setContacts]=useState(JSON.parse(localStorage.getItem("contacts")) || [])
    const [addStatus , setAddStatus] = useState(false)
    const [searchRes , setSearchRes] = useState([])
    const [searchValue , setSearchValue] = useState("")
    const [edit , setEdit] = useState({})
    const [saveStatus , setSaveStatus] = useState(false)
    const [selectState , setSelectState] = useState(false)
    const [checkedId , setCheckedId] = useState([])
    const [multiDelCheck , setMultiDelCheck ] = useState(false)
    const [modalDisplay,setModalDisplay] = useState("")


    //but with useEffect way we fixed the lost update problem
    useEffect(()=>{
        const stringifyContact =JSON.stringify(contacts)
        localStorage.setItem("contacts",stringifyContact)

    } , [saveStatus])

    //this way(below) we have a lost update in local storage
    // const saveToLocalStorage = (contacts)=>{
    //     const stringifyContact =JSON.stringify(contacts)
    //     localStorage.setItem("contacts",stringifyContact)
    // }

    const searchHandler = (event)=>{
        const value = event.target.value

        const searchResult = contacts.filter((contact)=>
        contact.fullName.includes(value)||contact.email.includes(value) )
        console.log(searchResult);
        
        setSearchValue(value)
        setSearchRes(searchResult)
    }

    const addHandler = ()=>{
        setAddStatus((addStatus)=>!addStatus)
    }
    
    
    const multiDelCheckHandler = ()=>{
        if(checkedId.length){
            setMultiDelCheck(true)
            setModalDisplay("flex")
        }
    }

    const multiDeleteHandler = ()=>{

        const newContacts = contacts.filter(contact=>{
            return !checkedId.includes(contact.id)
        })
        
        setContacts(newContacts)
        setSaveStatus(saveStatus=>!saveStatus)
        setCheckedId([])
        setModalDisplay("none")
        setMultiDelCheck(false)
    }

    const selectBtnHandler = ()=>{
        setSelectState(selectState => !selectState)
        //why when selectState is true, is working ??!
        if(selectState){
            setCheckedId([])
        }
    }

  return (
    <>
        {!addStatus 
            ?(
                <>
                <div className={styles.container}>
                    <div className={styles.searchContainer}>
                        {/* <p>search in contacts :</p> */}
                        <input type="text" name="search" placeholder="Search Contact" onChange={searchHandler}/>
                    </div>
                    <div className={styles.toolsContainer}>
                        {
                            selectState ? 
                            <>
                            <img src={deleteIcon} alt="deleteAll"  className={styles.deleteallBtn} onClick={multiDelCheckHandler}/>
                            <button onClick={selectBtnHandler}>Deselect</button>
                            </>
                            : 
                            <>
                            <button onClick={addHandler}>Add Contact</button>
                            <button onClick={selectBtnHandler}>Select</button>
                            </>
                        }
                    </div>
                </div>
                <ContactList 
                    contacts={contacts} 
                    setContacts={setContacts} 
                    searchRes={searchRes} 
                    searchValue={searchValue} 
                    setAddStatus={setAddStatus}
                    setEdit={setEdit}
                    setSaveStatus={setSaveStatus}
                    selectState={selectState}
                    checkedId={checkedId}
                    setCheckedId={setCheckedId}
                    multiDeleteHandler={multiDeleteHandler}
                    setMultiDelCheck={setMultiDelCheck}
                    multiDelCheck={multiDelCheck}
                    modalDisplay={modalDisplay}
                    setModalDisplay={setModalDisplay}
                />
                </>

            ) 

            :(<AddContact 
                setAddStatus={setAddStatus} 
                contacts={contacts} 
                setContacts={setContacts} 
                edit={edit}
                setEdit={setEdit}
                setSaveStatus={setSaveStatus}
            />)
        }

    </>
  )
}

export default ContactBar