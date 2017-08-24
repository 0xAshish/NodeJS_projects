import {Component} from 'react';
import login_form from './login_form.js';
import axios from 'axios'
class login extends Component {
  constructor(props) {

    super(props);

    
    this.state = {
      username: '',
      password: '',
      array: ["2", "3223342", "232", "32423", "22"]
      // array: ["ashisasdasdas435435h", "4353454sfsonemoreguy", "somemore23423423", "asdas324344512", "afsdf767^&*^*sfada", "afsdf767^&*^*sfadasa"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
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
  componentWillMount() {
    console.log('componentWillMount')
   // this.getData();
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