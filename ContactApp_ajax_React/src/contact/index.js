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
  delete(event) {
    console.log('delete')
    let i = event.currentTarget.dataset.id
    let id = this.state.contacts[i]._id
    console.log(id)
    axios.delete(`/app/contacts/${id}`)
      .then(res => {
        console.log('data', res.data)
        this.getData();
      }).catch(err => {
        console.log(err)
      });
  }
  edit(event) {
    console.log('edit')
    let index = event.currentTarget.dataset.id
    this.setState({ index: index })
    this.setState({ _edit: this.state.contacts[index] })
    this.setState({ showModal: true })
  }
  componentWillMount() {
    console.log('componentWillMount')
    this.getData();

  }
  getData() {
    axios.get(`/app/contacts`)
      .then(res => {
        console.log('data', res.data.data)
        this.setState({ contacts: res.data.data })
      }).catch(err => {
        console.log(err)
      });
  }
  render() {
    return contacts(this);
  }
}

export default contact;