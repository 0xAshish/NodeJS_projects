import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/index.js'
import Register from './register/index.js'
import Home from './home'
import App from './app'
import Contact from './contact'
import addContact from './addContact'
import { UIRouterReact, UIRouter, UIView, servicesPlugin, pushStateLocationPlugin } from 'ui-router-react';
// import {visualizer} from 'ui-router-visualizer';

// define your states
const states = [
  {
    name: 'home',
    url: '/home',
    component: Home,
    children: ['login', 'register']
  },
  {
    name: 'app',
    url: '/app',
    component: App,
    children: ['addContact', 'contact', 'editContact']

  },
  {
    name: 'login',
    url: '/login',
    component: Login,
    parent: 'home'
  }, {
    name: 'register',
    url: '/register',
    component: Register,
    parent: 'home'
  }, {
    name: 'contact',
    url: '/contact',
    component: Contact,
    parent: 'app',

  }, {
    name: 'addContact',
    url: '/add',
    component: addContact,
    parent: 'app'
  }
];


// Create a new instance of the Router
const Router = new UIRouterReact();

// Register states

states.forEach(state => Router.stateRegistry.register(state));
Router.plugin(servicesPlugin);
Router.plugin(pushStateLocationPlugin);
console.log(Router)
// Global config for router
Router.urlRouter.otherwise(() => "/home");


// Start the router
Router.start();
// Setup the state visualizer
// visualizer(Router);
ReactDOM.render(
  <UIRouter router={Router}>
    <UIView />
  </UIRouter>,
  document.getElementById('root')
);

