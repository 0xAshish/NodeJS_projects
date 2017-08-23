import {Component} from 'react';
import contact_form from './addTopic';
import axios from 'axios'

class addTopic extends Component {
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
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
     axios.post(`/app/add`,this.state)
      .then(res => {
        console.log(res.data)
      });
    this.props.transition.router.stateService.go('contact')

    event.preventDefault();   
  }
  render() {
    return contact_form(this);
  }
}

export default addTopic;