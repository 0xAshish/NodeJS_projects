import React from 'react';
import './addTopic.css';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
module.exports = function temp(this1) {
  return (<div className="form-signin">
    <form onSubmit={this1.handleSubmit}>
      <h2 className="form-signin-heading">Add Topic</h2>
      <FormGroup controlId="firstname">
        <ControlLabel>Topic Name</ControlLabel>
        <FormControl type="text" onChange={this1.handleChange} placeholder="First name" value={this1.state.Topic_name} name="first_name" />
      </FormGroup>
      <FormGroup controlId="lastname">
        <ControlLabel>Last Name</ControlLabel>
        <FormControl type="text" onChange={this1.handleChange} placeholder="Last name" value={this1.state.last_name} name="last_name" />
      </FormGroup>
      <FormGroup controlId="email">
        <ControlLabel>Email</ControlLabel>
        <FormControl type="email" onChange={this1.handleChange} placeholder="Example@abc.com" value={this1.state.email} name="email" />
      </FormGroup>
      <FormGroup controlId="mobile">
        <ControlLabel>Mobile No.</ControlLabel>
        <FormControl type="text" onChange={this1.handleChange} placeholder="123456789" value={this1.state.mobile} name="mobile" />
      </FormGroup>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Add Contact</button>
    </form>
  </div>
  );
}
