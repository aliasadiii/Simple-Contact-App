import React, { useState } from 'react'

import inputs from '../constants/inputs.js'

import styles from "./AddContact.module.css"

function AddContact({setAddStatus , setContacts , contacts , saveToLocalStorage , setEdit , edit , setSaveStatus}) {

    // console.log(Object.keys(edit).length)
    console.log(edit.id)

    
    const [contact , setContact]=useState(edit)

    const [validation , setValidation]=useState({
        nameValidation: true,
        phoneValidation: true,
        emailValidation: true,
    })

    const [alert,setAlert]=useState("")



    const changeHandler = (event)=>{
        const value = event.target.value
        const name = event.target.name
        setContact(contact => ({...contact , [name]:value}))
        if (name==="fullName"){
            const nameRegex = /[a-zA-Z\s]{7,}/g;
            const res=nameRegex.test(value)
            !res 
            ? setValidation((validation=>({...validation , nameValidation:false}))) 
            : setValidation((validation=>({...validation , nameValidation:true})))
            // console.log(validation.nameValidation)
        }else if(name==="email"){
            const nameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const res=nameRegex.test(value)
            !res 
            ? setValidation((validation=>({...validation , emailValidation:false}))) 
            : setValidation((validation=>({...validation , emailValidation:true})))
        }else if(name==="phone"){
            const nameRegex = /^09\d{9}$/g;
            const res=nameRegex.test(value)
            !res 
            ? setValidation((validation=>({...validation , phoneValidation:false}))) 
            : setValidation((validation=>({...validation , phoneValidation:true})))
        }
    }

    const addHandler = ()=>{

        if(!contact.fullName ||
            !contact.job ||
            !contact.email ||
            !contact.phone ||
            !validation.nameValidation ||
            !validation.emailValidation ||
            !validation.phoneValidation
        ){
            setAlert("Please enter valid data!")
            return;
        }

        setAlert("")

        const randomID=Math.floor(Math.random()*10000)
        // setContact(contact=> ({...contact , id:randomID}) ) it's not working!!

        if(!Object.keys(edit).length){
            const newContact={...contact , id: `${randomID}`}

            setContacts(contacts => [...contacts , newContact]); 
        }else{
            const editedContact = {...contact , id: edit.id}
            const editedContacts =  contacts.filter(contact => contact.id!==edit.id)

            setContacts(contacts => [...editedContacts , editedContact]); 

            setAddStatus((addStatus)=>!addStatus)
        }
        
        setSaveStatus(saveStatus=>!saveStatus)

        // saveToLocalStorage(contacts);

        setContact({
            id:"",
            fullName:"",
            email:"",
            job:"",
            phone:"",
        });
        
        if(Object.keys(edit).length)(
            setEdit((edit)=>edit={})
        )
    }

    const homeHandler = ()=>{
        setAddStatus(addStatus=>!addStatus)
        if(Object.keys(edit).length)(
            setEdit((edit)=>edit={})
        )
    }

  return (
    <div className={styles.container}>
        <div className={styles.homeButton}>
            <button onClick={homeHandler}>Return to Home</button>
        </div>
        <div className={styles.form}>
            {inputs.map((input , index)=>
                <div key={index} className={styles.infoContainer}>
                    <label htmlFor="" >{input.placeholder} : </label>
                    <input   
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.name}
                        value={contact[input.name]}
                        onChange={changeHandler}
                    />
                    <div className={styles.alert}>{(input.name==="fullName" && !validation.nameValidation? <p>enter a valid Full Name</p> : "") }</div>
                    <div className={styles.alert}>{(input.name==="email" && !validation.emailValidation? <p>enter a valid email address</p> : "") }</div>
                    <div className={styles.alert}>{(input.name==="phone" && !validation.phoneValidation? <p>enter a valid Phone Number</p> : "") }</div>
                </div>
            )}
            <button onClick={addHandler}>{Object.keys(edit).length ? "Edit Contact" : "Add Contact"}</button>
            <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
        </div>

    </div>
  )
}

export default AddContact