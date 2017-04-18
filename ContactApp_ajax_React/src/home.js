import { Component } from 'react';
import React from 'react';
import './App.css';
import { UIView } from 'ui-router-react';

class home extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.state = {}

  }
  componentWillMount() {
    this.isLogin = localStorage.getItem('islogin')
    console.log('user login', this.isLogin)
    if (this.isLogin) {
      this.props.transition.router.stateService.go('contact')
    } else this.props.transition.router.stateService.go('login')

  }
  render() {
    return (<div className="">
      <UIView />
    </div>
    );
  }
}

export default home;


