import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";


// This component allows users to input a new contact's name and email, and upon submission, it sends a POST request to add the contact to the server's database running locally. 
// It also updates the contact list on the client side by calling the addContactHandler function from the context.

const AddContact = () => {
  // These states will be used to capture the user's input for the contact's email and name.
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // This function will be used to add the new contact to the list.
  const { addContactHandler } = useContactsCrud();

  // used to redirect the user to the contact list page ("/") after successfully adding a contact.
  const navigate = useNavigate();

  const add = async (e) => {
    // to avoid a page refresh.
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    try {
      // Send a POST request to add the new contact to the database
      const response = await axios.post("http://localhost:3006/contacts", { name, email });
      const newContact = response.data; // Assuming the API returns the new contact
      
      // add the new contact to the list of contacts.
      addContactHandler(newContact);
      setEmail("");
      setName("");
      navigate("/");
    } catch (error) {
      // catches and logs any errors that may occur during the process.
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      {/* a form with two input fields for name and email, and a "Add" button.
       When the form is submitted, it triggers the add function. */}
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
