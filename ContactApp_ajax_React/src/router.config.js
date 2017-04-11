import 
    {UIRouterReact,servicesPlugin, pushStateLocationPlugin
} from 'ui-router-react';
import {
    visualizer
} from 'ui-router-visualizer';
import Login from './login/index.js'
import Register from './register/index.js'
import Home from './home'
import App from './App';


// Create a new instance of the Router
const Router = new UIRouterReact();

// Register states
const states = [{
        name: 'home',
        url: '/',
        component: Home
    }, {
        name: 'home.app',
        url: '/app',
        component: App
    },
    {
        name: 'home.login',
        url: '/login',
        component: Login
    }, {
        name: 'home.register',
        url: '/register',
        component: Register
    }
];
states.forEach(state => Router.stateRegistry.register(state));
Router.plugin(servicesPlugin);
Router.plugin(pushStateLocationPlugin);
console.log(Router)
// Global config for router
Router.urlRouteprovider.otherwise(() => "/");


// Start the router
Router.start();

// Setup the state visualizer
visualizer(Router);