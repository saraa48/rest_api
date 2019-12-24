import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Style.css";
import AddContact from "./AddContact";
class Contacts extends Component {
  state = {
    modal: false
  };
  toggle = () => this.setState({ modal: !this.state.modal });
  render() {
    const { contact, handleAdd } = this.props;
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Name: {contact.name}</p>
            <p className="card-text">Phone: 📱 {contact.phone}</p>
            <p className="card-text">Email 📧 {contact.email}</p>
            <div className="Boutton">
              <Button
                variant="danger"
                className="button"
                onClick={() => this.props.deleteContact(contact._id)}
              >
                Delete
              </Button>

              <Button
                variant="warning"
                className="button"
                onClick={this.toggle}
              >
                Edit contact
              </Button>
              {this.state.modal ? (
                <AddContact
                  modal={this.state.modal}
                  toggle={this.toggle}
                  isEdit={true}
                  contact ={contact}
                  handleAdd={handleAdd}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
