import React, { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { uuid } from "uuidv4";

const ContactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error retrieving contacts:", error);
    }
  };

  const addContactHandler = async (contact) => {
    try {
      const request = {
        id: uuid(),
        ...contact,
      };
      const response = await api.post("/contacts", request);
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c.id === contact.id ? response.data : c))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) =>
        Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const contextValue = {
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults,
  };

  return (
    <ContactsCrudContext.Provider value={contextValue}>
      {children}
    </ContactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(ContactsCrudContext);
}
