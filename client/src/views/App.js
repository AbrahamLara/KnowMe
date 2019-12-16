import React, { Component, Fragment } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import AppNavbar from '../components/AppNavbar';
import { loadUser } from '../actions/shared';
import { Switch, Route } from 'react-router-dom';
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
          <Switch>
            <Route path='/' exact component={SplashPage} />
            <Route path='/know/:profilePath' component={KnowPage} />
            <Route path='/activation/:token' component={ActivationPage} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { loadUser })(App);
