//  This code handles retrieving, adding, updating, and removing contacts, as well as searching for contacts based on search terms. 


// Imports: The code imports necessary modules and dependencies and other functions from other files.
import React, { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { uuid } from "uuidv4";


// This context will allow components to access the contact data and various functions for managing contacts.
const ContactsCrudContext = createContext();

// This is a React component that provides the context and manages the state of contacts and search functionality.
// It initializes several pieces of state using useState:

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  // contacts: An array that will hold the list of contacts.
  const [text, setText] = useState("");
  // text: A string state used for storing text used in the search bar.
  const [searchResults, setSearchResults] = useState([]);
  // searchResults: An array that will hold the filtered contacts based on search criteria.


  // Retrieves contacts from the API and sets the contacts state with the received data.
  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error retrieving contacts:", error);
    }
  };

  // Adds a new contact to the list of contacts both locally and on the server.
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

  // Removes a contact from the list of contacts both locally and on the server.
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

  // Updates a contact's information both locally and on the server.
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

  // Filters the list of contacts based on a search term and updates the searchResults state accordingly.
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

  // created with all these states and functions, which will be provided to the context consumers.
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

// useContactsCrud is a custom hook that allows other components to access the context value created in ContactsCrudContextProvider using useContext. 
export function useContactsCrud() {
  return useContext(ContactsCrudContext);
}
