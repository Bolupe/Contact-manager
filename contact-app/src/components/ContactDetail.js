import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user.jpg";

// This component is responsible for displaying detailed contact information, including the contact's image, name, and email. It also provides a button to navigate back to the contact list page.

const ContactDetail = () => {

// The useLocation hook is used to access the location object, and the contact information is extracted from location.state.contact.
  const location = useLocation();
  const {name, email} = location.state.contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">

        {/* The "Back to Contact List" button is a Link component that directs the user back to the contact list page ("/") when clicked. */}
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
