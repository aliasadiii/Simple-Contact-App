import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactsContext";

import ContactItem from "./ContactItem";
import ModalWarning from "./ModalWarning";
import SnackBar from "./SnackBar";

import styles from "./ContactList.module.css";

function ContactList({
  setAddStatus,
  selectState,
  multiDeleteHandler,
  multiDelCheck,
  setModalDisplay,
  modalDisplay,
  setMultiDelCheck,
  selectedItems,
  displayedContacts,
  setDisplayedContacts,
}) {
  //new.........................................................

  const [state, dispatch] = useContacts();
  //new.........................................................
  useEffect(() => {
    setDisplayedContacts(state.contacts);
  }, [state.contacts]);
  //new.........................................................

  const showSnackBar = () => {
    const addToast = document.getElementById("deleteToast");
    addToast.classList.add("show");
    setTimeout(() => {
      addToast.classList.remove("show");
    }, 3000);
  };

  const singleDeleteHandler = () => {
    //new........................
    dispatch({ type: "REMOVE_CONTACT" });
    dispatch({ type: "SAVE_CONTACT" });
    //...........................
    setModalDisplay("none");
    showSnackBar();
  };

  const modalHandler = (id) => {
    //new...............
    dispatch({ type: "SELECT_CONTACTS", payload: [id] });
    //..................
    setModalDisplay("flex");
    setMultiDelCheck(false);
  };

  const selectHandler = (event) => {
    const targetId = event.target.value;
    if (event.target.checked) {
      //new....................
      selectedItems.current = [...selectedItems.current, targetId];
      //.......................
    } else {
      selectedItems.current = selectedItems.current.filter(
        (id) => id != targetId,
      );
    }
    dispatch({ type: "SELECT_CONTACTS", payload: selectedItems.current });
  };

  return (
    <div className={styles.container}>
      <h2>Contact List</h2>
      <ModalWarning
        id="modalBox"
        singleDeleteHandler={singleDeleteHandler}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
        multiDeleteHandler={multiDeleteHandler}
        multiDelCheck={multiDelCheck}
        setMultiDelCheck={setMultiDelCheck}
      />

      <SnackBar />

      {state.contacts.length ? (
        <ul className={styles.contacts}>
          {displayedContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              setAddStatus={setAddStatus}
              selectState={selectState}
              selectHandler={selectHandler}
              modalHandler={modalHandler}
            />
          ))}

          {!displayedContacts.length && (
            <li className={styles.NotFoundMessage}>No Contact Found</li>
          )}
        </ul>
      ) : (
        // {searchRes.length ?}
        <p className={styles.message}>No Contacts Yet!</p>
      )}
    </div>
  );
}

export default ContactList;
