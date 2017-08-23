import { Component } from 'react';
import contacts from './contact';
import axios from 'axios'


class contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      _edit: {}
    };
    this.getData = this.getData.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }
  
 
  componentWillMount() {
    console.log('componentWillMount');
  }
 
  render() {
    return contacts(this);
  }
}

export default contact;