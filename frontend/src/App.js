import React, { Component } from "react";
import "./App.css";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import axios from "axios";
class App extends Component {
  state = {
    modal: false,
    name: "",
    mail: "",
    phone: ""
  };
  // componentDidMount = () => {
  // 	this.getUsers();
  // };

  newContact = nContact => {
    axios
      .post("/contacts", {
        name: nContact.name,
        phone: nContact.phone,
        email: nContact.email
      })
      .then(this.getUsers);
  };
  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div className="App">
        <h1 className="contactList">Contact list</h1>
        <ContactList />
        <div>
          <button class="btn btn-success" color="success" onClick={this.toggle}>
            Add Contact
          </button>
          <AddContact
            handleAdd={this.newContact}
            modal={this.state.modal}
            toggle={this.toggle}
          />
        </div>
      </div>
    );
  }
}

export default App;
