import React, { Component } from "react";
import Contacts from "./Contacts";
import axios from "axios";
import "./Style.css";
class ContactList extends Component {
  state = {
    list: [],
    name: "",
    mail: "",
    phone: ""
  };
  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    axios.get("/getcontact").then(res =>
      this.setState({
        list: res.data
      })
    );
  };
  deleteContact = id => {
    axios.delete(`/delete_contact/${id}`).then(this.getUsers);
  };

  modifyContact = modifContact =>
    axios.put(`/modifyContact/${modifContact._id}`, {
      name: modifContact.name,
      phone: modifContact.phone,
      email: modifContact.email
    }).then(this.getUsers());
  toggle = contact => {
    this.setState({
      id: contact._id,
      name: contact.name,
      number: contact.number,
      email: contact.email
    });
  };
  // newContact = () => {
  // 	axios
  // 		.post("/contacts", {
  // 			name: this.state.name,
  // 			phone: this.state.phone,
  // 			email: this.state.email
  // 		})
  // 		.then(this.getUsers);
  // };
  render() {
    console.log(this.state.list);
    return (
      <div className="List">
        {this.state.list.map((el, key) => (
          <div key={key}>
            <Contacts
              contact={el}
              deleteContact={this.deleteContact}
              handleAdd={ this.modifyContact}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default ContactList;
