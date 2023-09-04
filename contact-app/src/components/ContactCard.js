import React from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import user from "../images/user.png";

// this component is used to display contact information as a card. It provides options to view the contact details, edit the contact, and delete the contact.

const ContactCard = (props) => {
  // is a functional component that receives a props object as an argument, which is expected to contain contact information like id, name, and email.
  const { id, name, email } = props.contact;

  const {removeContactHandler} = useContactsCrud();

  // The deleteContact function, when called, invokes the removeContactHandler function from the context with the contact's id as an argument.
  // This function is responsible for deleting the contact.
 
  const deleteContact = (id) => {
    removeContactHandler(id);
  }

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      {/* It displays a user avatar image (user.png) on the left side of the contact card. */}
      <div className="content">

      {/* creates a link to the contact's details page (/contact/${id}). It also passes the contact information as state data using the state prop. */}
        <Link
          to = {`/contact/${id}`}
          state={{contact: props.contact}} 
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>

      {/*  When the delete icon is clicked, it triggers the removeContactHandler function from the context to delete the contact from the list of contacts.  */}
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => deleteContact(id)}
      ></i> 
      
      {/* provides a link to the edit page with the contact's information as state data. */}
      <Link 
      to={`/edit`}
      state={{ contact: props.contact } }>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
