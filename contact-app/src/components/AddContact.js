import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const AddContact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { addContactHandler } = useContactsCrud();
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    try {
      // Send a POST request to add the new contact to the database
      const response = await axios.post("http://localhost:3006/contacts", { name, email });
      const newContact = response.data; // Assuming the API returns the new contact
      addContactHandler(newContact);
      setEmail("");
      setName("");
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
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
