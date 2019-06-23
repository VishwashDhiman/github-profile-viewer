import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchUser from './component/SearchUser';
import './App.css';
import DetailService from './service/DetailService';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SearchUser} />
          <Route path='/user' component={DetailService} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
