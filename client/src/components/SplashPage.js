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

function SplashPage ({ auth }) {
  if (auth.isAuthenticated) {
    return <Redirect to={`/know/${auth.user.name}`} />
  }

  return (
    <Fragment>
      <h2 className='sp-phrase text-center'>Welcome stranger!</h2>
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