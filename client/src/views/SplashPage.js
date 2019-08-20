import React, { Fragment } from 'react';
import {
  Container
} from 'reactstrap';
import '../css/SplashPage.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';
import AboutContainer from '../components/AboutContainer';
import PropTypes from 'prop-types';

// If the user is authenticated then we want to redirect them
// to their profile page when revisiting the splash page
function SplashPage ({ auth: { isAuthenticated, user } }) {
  if (isAuthenticated) {
    return <Redirect to={`/know/${user.first_name.concat('-', user.last_name)}`} />
  }

  return (
    <Fragment>
      <Container className='SplashPage d-flex align-items-center'>
        <SignUpForm className='flex-1' />
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