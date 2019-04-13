import React, { Component, Fragment } from 'react';
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AppNavbar extends Component {
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  // When viewing app in mobile browsers the
  // user can toggle between displaying or hiding
  // navbar links
  toggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Navbar color='dark' dark expand="md">
        <Container>
          <NavbarBrand className='text-white' href='/'>
            <strong>KnowMe</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              { isAuthenticated
                ? <NavItem>
                    <Logout />
                  </NavItem>
                : <Fragment>
                    <LoginModal />
                    <RegisterModal />
                  </Fragment>
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
  }
}
 
export default connect(mapStateToProps)(AppNavbar);