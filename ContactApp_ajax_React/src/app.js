import {Component} from 'react';
import React from 'react';
import './App.css';
import axios from 'axios';
import {DropdownButton,MenuItem,Nav,NavItem,Navbar} from 'react-bootstrap';
import { UISref, UIView} from 'ui-router-react';

class App extends Component {
  
  constructor(props){
    super(props)
    this.props=props
    this.state={}
    this.isLogin=localStorage.getItem('islogin')
     this.logout = this.logout.bind(this);
    console.log('islogin',this.isLogin)
if(!this.isLogin){
  this.props.transition.router.stateService.go('login')
}   
  }
  logout(){
    axios.get('/app/logout').then(res=>{
      console.log(res.data)
      localStorage.removeItem('islogin');
      this.props.transition.router.stateService.go('login')
    })
      
  }
  showDropdown(){
    const menu_login =<Nav  pullRight> <NavItem > 
        <DropdownButton bsStyle='info'  id="nav" title="Profile">
             <MenuItem bsStyle='primary' ><UISref to="contact"><span>Contact</span></UISref>
    {' '}</MenuItem>
    <MenuItem bsStyle='primary' ><UISref to="addContact"><span>Add Contact</span></UISref>
    {' '}</MenuItem>
             <MenuItem onClick={this.logout}><span>Logout</span></MenuItem>
          </DropdownButton>
          </NavItem></Nav>
if(this.isLogin) return menu_login
else return ''
  }
  render() {
    return (<div className="App col-sm-12"><div className="col-sm-10">
                  <div className="position">
                       <Navbar>
                         <Navbar.Header>
                           <Navbar.Brand>
                             <UISref to="contact"><span>Contact Book</span></UISref>
                            </Navbar.Brand>
                           </Navbar.Header>
                              {this.showDropdown()}
                        </Navbar>
                      <UIView/>
                  </div>
            </div></div>

        );
   }
}

export default App;


 