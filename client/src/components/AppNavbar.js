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
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  // We check whether isAuthenticated is true
  // to update the Navbar and display log out
  // and user name.
  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props;
    if (
      isAuthenticated &&
      (isAuthenticated !== prevProps.isAuthenticated)
    ) {
      this.forceUpdate()
    }
  }

  // When viewing app in mobile browsers the
  // user can toggle between displaying or hiding
  // navbar links
  toggle () {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  }

  render() {
    const { isAuthenticated, isLoading, user } = this.props.auth;

    const authLinks = (
      <NavItem>
        <LoginButton />
      </NavItem>
    );

    const userLinks = (
      <Fragment>
        { user &&
          <NavItem>
            {user.first_name.concat(' ', user.last_name)}
          </NavItem>
        }
        <NavItem>
          <LogoutButton />
        </NavItem>
      </Fragment>
    );

    return (
      <Navbar className='AppNavBar bg-white' light expand="md">
      <Container>
          <NavbarBrand className='text-dark' href='/'>
            Know<strong>Me</strong>
          </NavbarBrand>
          <Nav className='ml-auto align-items-center' navbar>
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