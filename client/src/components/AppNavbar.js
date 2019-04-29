import React, { Component, Fragment } from 'react';
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from 'reactstrap';
import SignUpButton from './auth/SignUpButton';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/AppNavBar.css';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  // When viewing app in mobile browsers the
  // user can toggle between displaying or hiding
  // navbar links
  toggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <LoginButton />
        </NavItem>
        <NavItem>
          <SignUpButton />
        </NavItem>
      </Fragment>
    );

    const userLinks = (
      <NavItem>
        <LogoutButton />
      </NavItem>
    );

    return (
      <Navbar className='AppNavBar w-100 position-fixed' light expand="md">
      <Container>
          <NavbarBrand className='text-dark' href='/'>
            <strong>KnowMe</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              { !isLoading && (isAuthenticated
                ? userLinks
                : authLinks)
              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

function mapStateToProps ({ auth }) {
  return {
    auth
  };
}
 
export default connect(mapStateToProps)(AppNavbar);