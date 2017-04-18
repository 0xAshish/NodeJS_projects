import React from 'react';
import './contact.css';
import { UISref } from 'ui-router-react';
import { Panel, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import editModal from './model'
module.exports = function temp(self) {
  let listContact = [];
  let contacts = self.state.contacts || [];

  if (contacts && contacts.length) {
    listContact = contacts.map((contact, i) => {
      return (
        <ListGroupItem bsStyle="info"
          key={contact._id}>{contact.first_name + ' ' + contact.last_name + ' Email:' + contact.email}
          <span className="pull-right">
            <Button data-id={i} onClick={self.edit} bsStyle="info" bsSize="small">
              <Glyphicon glyph="edit" />
            </Button>
            <Button className="icon" data-id={i} onClick={self.delete} bsStyle="info" bsSize="small"><Glyphicon glyph="trash" />
            </Button>
          </span>
        </ListGroupItem>)
    })
  }

  return (
    <div>
      <Panel >
        <ListGroup>
          {listContact}
        </ListGroup>
      </Panel>
      {editModal(self)}

      <Button>
        <UISref to="addContact">
          <span>Add Contact</span>
        </UISref>{' '}
      </Button>
    </div>
  );
}
