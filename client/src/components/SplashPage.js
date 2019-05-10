import React, { Fragment } from 'react';
import {
  Container
} from 'reactstrap';
import '../css/SplashPage.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthContainer from './auth/AuthContainer';
import AboutContainer from './AboutContainer';
import PropTypes from 'prop-types';

// If the user is authenticated then we want to redirect them
// to their profile page when revisiting the splash page
function SplashPage ({ auth: { isAuthenticated, user } }) {
  if (isAuthenticated) {
    return <Redirect to={`/know/${user.first_name.concat('-', user.last_name)}`} />
  }

  return (
    <Fragment>
      <h3 className='sp-phrase text-center mt-2 mb-2'>Hello, World!</h3>
      <Container className='SplashPage d-flex align-items-center'>
        <AuthContainer className='flex-1' />
        <AboutContainer className='flex-1 ml-4 align-self-stretch' />
      </Container>
    </Fragment>
  );
}

SplashPage.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps ({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(SplashPage);