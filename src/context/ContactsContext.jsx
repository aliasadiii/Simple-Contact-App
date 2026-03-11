import { createContext, useContext, useReducer } from "react";

const ContactsContext = createContext();

const initialState = {
  contacts: JSON.parse(localStorage.getItem("contacts")) || [],
  selectedContacts: [],
  editedContact: null,
};
console.log(initialState);
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      if (state.editedContact != null) {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== state.editedContact.id,
        );
      }
      state.contacts.push(action.payload);
      return { ...state, editedContact: null };
    case "SAVE_CONTACT":
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
      return { ...state };
    case "REMOVE_CONTACT":
      state.contacts = state.contacts.filter((contact) => {
        return !state.selectedContacts.includes(contact.id);
      });
      return { ...state, selectedContacts: [] };
    case "SELECT_CONTACTS":
      return {
        ...state,
        selectedContacts: [...action.payload],
      };
    case "EDIT_CONTACT":
      state.editedContact = action.payload;
      return { ...state };
    default:
      throw new Error("Invalid Action !");
  }
};

function ContactListProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}
const useContacts = () => {
  const { state, dispatch } = useContext(ContactsContext);
  return [state, dispatch];
}; // custom hook

export default ContactListProvider;

export { useContacts };
