import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import ContactCard from "./ContactCard";


// component used to display a list of contacts and provides search functionality.
const ContactList = () => {

  const {
    contacts,
    retrieveContacts,
    searchHandler,
    text,
    searchResults,
  } = useContactsCrud();
  // custom hook to access various properties and functions from the context

  useEffect(() => {
    retrieveContacts();
  }, [retrieveContacts]); 
  // used to fetch the list of contacts (retrieveContacts()) when the component is mounted. 
  // The dependency array [retrieveContacts] ensures that this effect runs only when retrieveContacts changes.

  const filteredContacts = text.length < 1 ? contacts : searchResults;

  //As the user types in the search input, the onUserSearch function is called, 
  //which in turn calls the searchHandler function from the context to perform the search based on the input value (e.target.value). */}

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        {/* navigates the user to the "/add" route using the Link component */}
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          {/* Users can type in this input field to search for contacts. */}
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={text}
            onChange={onUserSearch}
          />
          <i className="search icon"></i>
        </div>
      </div>
      
      {/*  list of contacts is displayed as a "ui celled list */}

      <div className="ui celled list">
        {/*  If there are contacts to display (filteredContacts.length > 0), 
        it maps through the filteredContacts array and renders a ContactCard component for each contact.  */}
        {filteredContacts.length > 0
          ? filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
