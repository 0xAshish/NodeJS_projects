import React from 'react';
import './contact.css';
import { UISref } from 'ui-router-react';
import { Panel, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import editModal from './model'
module.exports = function temp(self) {
  let listTopics = [{name:'Algorithms',state:''},{name:'Data Structure',state:''},{name:'Java',state:''}];
  let contacts = self.state.contacts || [];

  if (contacts && contacts.length) {
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
    listContact = contacts.map((contact, i) => {
      return (
        <div className="col-sm-6" key={contact._id+"1"}>
        <ListGroupItem bsStyle="info" style={wellStyles}
          key={contact._id} >{contact.first_name + ' ' + contact.last_name}
          <span className="pull-right">
            <Button data-id={i} onClick={self.edit} bsStyle="info" bsSize="small">
              <Glyphicon glyph="edit" />
            </Button>
            <Button className="icon" data-id={i} onClick={self.delete} bsStyle="info" bsSize="small"><Glyphicon glyph="trash" />
            </Button>
          </span>
        </ListGroupItem></div>)
    })
  }

  return (
    <div>
      <Panel >
        <ListGroup>
          <div className="col-sm-12">
          {listContact}
          </div>
        </ListGroup>
      </Panel>
      {editModal(self)}

      <Button>
        <UISref to="addTopic">
          <span>Add Topic</span>
        </UISref>{' '}
      </Button>
    </div>
  );
}
