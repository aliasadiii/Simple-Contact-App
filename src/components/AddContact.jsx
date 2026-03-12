import { useState } from "react";
import { useContacts } from "../context/ContactsContext.jsx";

import inputs from "../constants/inputs.js";

import SnackBar from "./SnackBar.jsx";

import styles from "./AddContact.module.css";

function AddContact({ setAddStatus }) {
  console.log()
  //new...................................
  const [state, dispatch] = useContacts();
  //new................................... 

  const [contact, setContact] = useState(
    state.editedContact || {
      id: "",
      fullName: "",
      email: "",
      job: "",
      phone: "",
    },
  );

  const [validation, setValidation] = useState({
    nameValidation: true,
    phoneValidation: true,
    emailValidation: true,
  });

  const [alert, setAlert] = useState("");

  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setContact((contact) => ({ ...contact, [name]: value }));
    if (name === "fullName") {
      const nameRegex = /[a-zA-Z\s]{7,}/g;
      const res = nameRegex.test(value);
      !res
        ? setValidation((validation) => ({
            ...validation,
            nameValidation: false,
          }))
        : setValidation((validation) => ({
            ...validation,
            nameValidation: true,
          }));
    } else if (name === "email") {
      const nameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const res = nameRegex.test(value);
      !res
        ? setValidation((validation) => ({
            ...validation,
            emailValidation: false,
          }))
        : setValidation((validation) => ({
            ...validation,
            emailValidation: true,
          }));
    } else if (name === "phone") {
      const nameRegex = /^09\d{9}$/g;
      const res = nameRegex.test(value);
      !res
        ? setValidation((validation) => ({
            ...validation,
            phoneValidation: false,
          }))
        : setValidation((validation) => ({
            ...validation,
            phoneValidation: true,
          }));
    }
  };

  const showSnackBar = () => {
    const addToast = document.getElementById("addToast");
    addToast.classList.add("show");
    setTimeout(() => {
      addToast.classList.remove("show");
    }, 3000);
  };

  const addHandler = () => {
    if (
      !contact.fullName ||
      !contact.job ||
      !contact.email ||
      !contact.phone ||
      !validation.nameValidation ||
      !validation.emailValidation ||
      !validation.phoneValidation
    ) {
      setAlert("Please enter valid data!");
      return;
    }

    setAlert("");

    const randomID = Math.floor(Math.random() * 10000);

    if (!contact.id) {
      const newContact = { ...contact, id: `${randomID}` };
      //new...................................
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      //new...................................
    } else {
      const editedContact = { ...contact, id: state.editedContact.id };
      dispatch({ type: "ADD_CONTACT", payload: editedContact });
      setAddStatus((addStatus) => !addStatus);
    }
    //new...................................
    dispatch({ type: "SAVE_CONTACT" });
    //new...................................
    showSnackBar();

    setContact({
      id: "",
      fullName: "",
      email: "",
      job: "",
      phone: "",
    });
  };

  const homeHandler = () => {
    setAddStatus((addStatus) => !addStatus);
    if (contact.id) dispatch({ type: "EDIT_CONTACT", payload: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeButton}>
        <button onClick={homeHandler}>Return to Home</button>
      </div>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <div key={index} className={styles.infoContainer}>
            <label htmlFor="">{input.placeholder} : </label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />
            <div className={styles.alert}>
              {input.name === "fullName" && !validation.nameValidation ? (
                <p>enter a valid Full Name</p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.alert}>
              {input.name === "email" && !validation.emailValidation ? (
                <p>enter a valid email address</p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.alert}>
              {input.name === "phone" && !validation.phoneValidation ? (
                <p>enter a valid Phone Number</p>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        <button onClick={addHandler}>
          {contact.id ? "Edit Contact" : "Add Contact"}
        </button>
        <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      </div>
      <SnackBar />
    </div>
  );
}

export default AddContact;
