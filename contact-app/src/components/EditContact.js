import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

// this component allows users to edit an existing contact's name and email. 
// Upon submission, it updates the contact's information using the updateContactHandler function from the context

const EditContact = () =>  {
  // access the current location and retrieve the contact information from location.state.con
  const location = useLocation();
  // used to redirect the user to the contact list page ("/") after successfully updating a contact.
  const navigate = useNavigate();
  
  // properties of the contact are extracted from the location.state.contact.
  const { id, name, email } = location.state.contact;
  
  // These states will be used to capture the updated name and email of the contact.
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(name);

  //  This function will be used to update the contact's information.
  const {updateContactHandler} = useContactsCrud();
  
// function defined to handle form submission
  const update = (e) => {
    // prevents the default form submission behavior to avoid a page refresh.
    e.preventDefault();

    if (newName === "" || newEmail === "") {
      alert("ALl the fields are mandatory!");
      return;
    }

    // Function from the context to update the contact's information. 
    // It passes an object with the id, name, and email properties to update the contact with the new values.
    updateContactHandler({id, name: newName, email : newEmail});
    setNewName("");
    setNewEmail("")
    navigate("/");
  };

    return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        
        {/*  form with two input fields for the updated name and email, and an "Update" button. 
        When the form is submitted, it triggers the update function. */}
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
}

export default EditContact;
