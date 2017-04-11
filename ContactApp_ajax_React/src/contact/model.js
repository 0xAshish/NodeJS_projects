import React from 'react';
import './contact.css';
import axios from 'axios'
import {Button,Modal} from 'react-bootstrap';
import {FormGroup,FormControl,ControlLabel } from 'react-bootstrap';
module.exports =function editModal(self){

self.close=()=>{
    self.setState({ index: -1 });
    self.setState({ showModal: false });

}
self.save=(event)=>{
  console.log('save and close')
  console.log(self._edit)
      //  this.props.transition.router.stateService.go('editContact',({id:id}))
      let id=self.state._edit._id
    axios.put(`/app/contacts/${id}`,self.state._edit)
      .then(res => {
        console.log('data',res.data)
      }).catch(err=>{
        console.log(err)
      });
    self.setState({ index: -1 });      
    self.setState({ showModal: false });
    event.preventDefault();
}
function change(event){
  const target = event.target;
    const value = target.value;
    const name = target.name;
    self.state._edit[name]=value
    let _edit=self.state._edit
    self.setState({
     _edit
    });
  
}
return (<Modal show={self.state.showModal} onHide={self.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    <form>       
      <FormGroup controlId="firstname">
      <ControlLabel>First Name</ControlLabel>
      <FormControl type="text"  onChange={change} placeholder="First name" value={self.state._edit.first_name} name="first_name" />
    </FormGroup>
    <FormGroup controlId="lastname">
      <ControlLabel>Last Name</ControlLabel>
      <FormControl type="text"  onChange={change} placeholder="Last name" value={self.state._edit.last_name} name="last_name" />
    </FormGroup>
      <FormGroup controlId="email">
      <ControlLabel>Email</ControlLabel>
      <FormControl type="email"  onChange={change} placeholder="Example@abc.com" value={self.state._edit.email} name="email" />
    </FormGroup>
     <FormGroup controlId="mobile">
      <ControlLabel>Mobile No.</ControlLabel>
      <FormControl type="text"  onChange={change} placeholder="123456789" value={self.state._edit.mobile} name="mobile" />
    </FormGroup>        
    </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={self.save}>Save</Button>
            <Button onClick={self.close}>Close</Button>
          </Modal.Footer>
        </Modal>)
      
    }