import React from 'react';
import {UISref} from 'ui-router-react';
import './login.css';
import {FormGroup,FormControl,ControlLabel ,Checkbox,Button} from 'react-bootstrap';
module.exports =function temp(this1) { 
return (<div  className="form-signin" >
   <h2 className="form-signin-heading">Login</h2> 
    <form  onSubmit={this1.handleSubmit}>           
      <FormGroup controlId="email">
      <ControlLabel>Name</ControlLabel>
      <FormControl type="email"  onChange={this1.handleChange} placeholder="Example@abc.com" value={this1.state.email} name="username" />
    </FormGroup>
       <FormGroup controlId="password">
      <ControlLabel>Password</ControlLabel>
      <FormControl type="password"  onChange={this1.handleChange} placeholder="*******" value={this1.state.password} name="password" />
    </FormGroup>     
     <FormGroup>
        <ControlLabel>
      <Checkbox inline>Remember me!
      </Checkbox></ControlLabel>
      </FormGroup>
    <UISref to="register"><Button bsStyle="link">Let me register</Button></UISref>
      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
    </form>
</div>
);
}
