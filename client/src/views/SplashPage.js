import React, { Fragment } from 'react';
import {
  Container,
  Row,
  Col
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
    return <Redirect to={`/know/${user.profile_path}`} />
  }

  return (
    <Fragment>
      <Container>
        <Row className='SplashPage'>
          <Col xs='12' md='6' lg='6'>
            <SignUpForm />
          </Col>
          <Col xs='12' md='6' lg='6'>
            <AboutContainer className='h-100'/>
          </Col>
        </Row>
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