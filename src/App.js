import React from 'react';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AddClients from './components/clients/AddClients';
import ClientDetails from './components/clients/ClientDetails';
import EditClients from './components/clients/EditClients';
import Login from './components/auth/Login';
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';
import Settings from './components/settings/Settings';
import Register from './components/auth/Register';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={UserIsAuthenticated(Dashboard)} />
              <Route exact path='/clients/add' component={UserIsAuthenticated(AddClients)} />
              <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetails)} />
              <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClients)} />
              <Route exact path='/settings' component={UserIsAuthenticated(Settings)} />
              <Route exact path='/login' component={UserIsNotAuthenticated(Login)} />
              <Route exact path='/register' component={UserIsNotAuthenticated(Register)} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
