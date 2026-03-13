import { useRef, useState } from "react";
import { useContacts } from "../context/ContactsContext";

import AddContact from "./AddContact";
import ContactList from "./ContactList";

import styles from "./ContactBar.module.css";

import deleteIcon from "../assets/delete-svgrepo-com2.svg";
import { showSnackBar } from "../helpers/helpers";

function ContactBar() {
  const [state, dispatch] = useContacts();
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [addStatus, setAddStatus] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [multiDelCheck, setMultiDelCheck] = useState(false);
  const [modalDisplay, setModalDisplay] = useState("");
  const selectedItems = useRef([]);

  const addHandler = () => {
    setAddStatus((addStatus) => !addStatus);
  };

  const searchHandler = (event) => {
    const value = event.target.value;
    const searchResult = state.contacts.filter(
      (contact) =>
        contact.fullName.includes(value) || contact.email.includes(value),
    );
    setDisplayedContacts(searchResult);
  };

  const multiDelCheckHandler = () => {
    if (selectedItems.current.length) {
      setMultiDelCheck(true);
      setModalDisplay("flex");
    }
  };

  const multiDeleteHandler = () => {
    dispatch({ type: "REMOVE_CONTACT" });
    dispatch({ type: "SAVE_CONTACT" });
    setModalDisplay("none");
    setMultiDelCheck(false);
    showSnackBar("multiDeleteToast");
    setSelectState(false);
  };

  const selectBtnHandler = () => {
    setSelectState((selectState) => !selectState);
    if (selectState) {
      selectedItems.current = [];
    }
  };

  return (
    <>
      {!addStatus ? (
        <>
          <div className={styles.container}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                name="search"
                placeholder="search in contacts"
                onChange={searchHandler}
              />
            </div>
            <div className={styles.toolsContainer}>
              {selectState ? (
                <>
                  <img
                    src={deleteIcon}
                    alt="deleteAll"
                    className={styles.deleteallBtn}
                    onClick={multiDelCheckHandler}
                  />
                  <button onClick={selectBtnHandler}>Deselect</button>
                </>
              ) : (
                <>
                  <button onClick={addHandler}>Add Contact</button>
                  <button onClick={selectBtnHandler}>Select</button>
                </>
              )}
            </div>
          </div>
          <ContactList
            displayedContacts={displayedContacts}
            setDisplayedContacts={setDisplayedContacts}
            setAddStatus={setAddStatus}
            selectState={selectState}
            multiDeleteHandler={multiDeleteHandler}
            setMultiDelCheck={setMultiDelCheck}
            multiDelCheck={multiDelCheck}
            modalDisplay={modalDisplay}
            setModalDisplay={setModalDisplay}
            selectedItems={selectedItems}
          />
        </>
      ) : (
        <AddContact setAddStatus={setAddStatus} />
      )}
    </>
  );
}

export default ContactBar;
