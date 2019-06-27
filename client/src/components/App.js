import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import AppNavbar from './AppNavbar';
import { loadUser } from '../actions/shared';
import { Route } from 'react-router-dom';
import Loadingbar from 'react-redux-loading';
import SplashPage from './SplashPage';
import KnowPage from './KnowPage';
import ActivationPage from './ActivationPage';

class App extends Component {
  constructor (props) {
    super(props);

    props.loadUser();
  }

  render() {
    return (
      <Fragment>
        <Loadingbar />
        <div className='App'>
          <AppNavbar />
          <Route path='/' exact component={SplashPage} />
          <Route path='/know/:name' component={KnowPage} />
          <Route path='/activation/:token' component={ActivationPage} />
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { loadUser })(App);
