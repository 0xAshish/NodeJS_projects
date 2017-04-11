import {Component} from 'react';
import login_form from './login_form.js';
import axios from 'axios'
class login extends Component {
  constructor(props) {

    super(props);

    
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
}
componentWillMount(){
  this.isLogin=localStorage.getItem('islogin')
    console.log('islogin ',this.isLogin)
    if(this.isLogin){
    this.props.transition.router.stateService.go('contact')
    }
}
 
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value, name)
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
     axios.post(`/user/login`,this.state)
      .then(res => {
        console.log(res.data)
        if(res.data==='valid'){
          console.log('localStorage')
          localStorage.setItem('islogin',true)
          this.props.transition.router.stateService.go('contact')

        }
      });
    event.preventDefault();   
  }
  render() {
    return login_form(this);
  }
}

export default login;