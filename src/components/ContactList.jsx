import { useEffect, useState } from "react";
import { useContacts } from "../context/ContactsContext";

import {
  formatText,
  showSnackBar,
  sortByDate,
  sortByName,
} from "../helpers/helpers";

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
  const [state, dispatch] = useContacts();

  useEffect(() => {
    setDisplayedContacts(sortByDate(state.contacts, "SortbyNewest"));
  }, [state.contacts]);

  const singleDeleteHandler = () => {
    dispatch({ type: "REMOVE_CONTACT" });
    dispatch({ type: "SAVE_CONTACT" });
    setModalDisplay("none");
    showSnackBar("deleteToast");
  };

  const modalHandler = (id) => {
    dispatch({ type: "SELECT_CONTACTS", payload: [id] });
    setModalDisplay("flex");
    setMultiDelCheck(false);
  };

  const selectHandler = (event) => {
    const targetId = event.target.value;
    if (event.target.checked) {
      selectedItems.current = [...selectedItems.current, targetId];
    } else {
      selectedItems.current = selectedItems.current.filter(
        (id) => id != targetId,
      );
    }
    dispatch({ type: "SELECT_CONTACTS", payload: selectedItems.current });
  };

  const sortHandler = (event) => {
    const sortingOption = formatText(event.target.value);
    if (sortingOption === "SortbyAtoZ")
      setDisplayedContacts(sortByName(displayedContacts));
    else if (sortingOption === "SortbyNewest")
      setDisplayedContacts(sortByDate(displayedContacts, sortingOption));
    else if (sortingOption === "SortbyOldest")
      setDisplayedContacts(sortByDate(displayedContacts, sortingOption));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Contact List</h2>
        <select className={styles.sortSelection} onChange={sortHandler}>
          <option>Sort by Newest</option>
          <option>Sort by Oldest</option>
          <option>Sort by A to Z</option>
        </select>
      </div>
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
        <p className={styles.message}>No Contacts Yet!</p>
      )}
    </div>
  );
}

export default ContactList;
