import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import ContactCard from "./ContactCard";

const ContactList = () => {
  const {
    contacts,
    retrieveContacts,
    searchHandler,
    text,
    searchResults,
  } = useContactsCrud();


  useEffect(() => {
    retrieveContacts();
  }, [retrieveContacts]); 

  const filteredContacts = text.length < 1 ? contacts : searchResults;

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
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
      <div className="ui celled list">
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
