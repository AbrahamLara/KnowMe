import React, { Component, Fragment } from 'react';
import {
  Navbar,
  Container,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
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
        </NavItem>
      </Fragment>
    );

    const userLinks = (
      <NavItem>
        <LogoutButton />
      </NavItem>
    );

    return (
      <Navbar className='AppNavBar bg-white' light expand="md">
      <Container>
          <NavbarBrand className='text-dark' href='/'>
            <strong>KnowMe</strong>
          </NavbarBrand>
          <Nav className='ml-auto' navbar>
            { !isLoading && (isAuthenticated
              ? userLinks
              : authLinks)
            }
          </Nav>
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