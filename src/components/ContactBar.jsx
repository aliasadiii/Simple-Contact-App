import { useRef, useState } from "react";
import { useContacts } from "../context/ContactsContext";

import AddContact from "./AddContact";
import ContactList from "./ContactList";

import styles from "./ContactBar.module.css";

import deleteIcon from "../assets/delete-svgrepo-com2.svg";

function ContactBar() {
  //new.........................................................
  const [state, dispatch] = useContacts();
  const selectedItems = useRef([]);
  //............................................................
  const [addStatus, setAddStatus] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectState, setSelectState] = useState(false);
  const [multiDelCheck, setMultiDelCheck] = useState(false);
  const [modalDisplay, setModalDisplay] = useState("");

  const addHandler = () => {
    setAddStatus((addStatus) => !addStatus);
  };

  const searchHandler = (event) => {
    const value = event.target.value;

    const searchResult = state.contacts.filter(
      (contact) =>
        contact.fullName.includes(value) || contact.email.includes(value),
    );
    console.log(searchResult);

    setSearchValue(value);
    setSearchRes(searchResult);
  };

  const multiDelCheckHandler = () => {
    if (selectedItems.current.length) {
      setMultiDelCheck(true);
      setModalDisplay("flex");
    }
  };

  const multiDeleteHandler = () => {
    //new..............
    dispatch({ type: "REMOVE_CONTACT" });
    dispatch({ type: "SAVE_CONTACT" });
    //.................
    setModalDisplay("none");
    setMultiDelCheck(false);
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
              {/* <p>search in contacts :</p> */}
              <input
                type="text"
                name="search"
                placeholder="Search Contact"
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
            searchRes={searchRes}
            searchValue={searchValue}
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
