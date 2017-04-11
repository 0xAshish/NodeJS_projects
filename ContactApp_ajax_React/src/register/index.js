import {Component} from 'react';
import register_form from './register_form.js';
import axios from 'axios'
// let http= axios.create({
//   baseURL: 'http://localhost:3005/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email: '',
      mobile:'',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  random() {
    return Math.random();
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
     axios.post(`/user/register`,this.state)
      .then(res => {
        console.log(res.data)
      });
    event.preventDefault();   
  }
  render() {
    return register_form(this);
  }
}

export default register;