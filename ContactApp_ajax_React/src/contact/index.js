import {
  Component
} from 'react';
import contacts from './contact';
import axios from 'axios'


class contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      _edit: {},
      array: ["2", "3223342", "232", "32423", "22"]
      // array: ["ashisasdasdas435435h", "4353454sfsonemoreguy", "somemore23423423", "asdas324344512", "afsdf767^&*^*sfada", "afsdf767^&*^*sfadasa"]
    };
    this.getData = this.getData.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.compareData = this.compareData.bind(this);

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
    this.setState({
      index: index
    })
    this.setState({
      _edit: this.state.contacts[index]
    })
    this.setState({
      showModal: true
    })
  }
  componentWillMount() {
    console.log('componentWillMount')
    this.getData();
    console.log(this.state.array);
    (async function loop(array) {
      for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
          let first = array[i];
          let sec = array[j];
          await axios.post(`/app/compare`, {
              first,
              sec,
              type: ""
            })
            .then(res => {
              console.log('data', res.data.data)
              if (res.data.data > 0) {
                console.log("-1");
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
              }

            }).catch(err => {
              console.log(err)
            });

        }
      }
      console.log(array);
    })(this.state.array);

  }


  getData() {
    axios.get(`/app/contacts`)
      .then(res => {
        console.log('data', res.data.data)
        this.setState({
          contacts: res.data.data
        })
      }).catch(err => {
        console.log(err)
      });
  }
  compareData(first, sec) {
    axios.post(`/app/compare`, {
        first,
        sec,
        type: ""
      })
      .then(res => {
        console.log('data', res.data.data)
        return res.data.data;
      }).catch(err => {
        console.log(err)
      });
  }
  render() {
    return contacts(this);
  }
}

export default contact;