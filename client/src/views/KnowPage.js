import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import logo from '../logo.svg';
import '../css/KnowPage.css';
import PropTypes from'prop-types';

class KnowPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    const userLink = this.props.match.params.userLink;

    return (
      <Container className='KnowPage pb-3'>
        <div className='kp-user-banner'>
          <div className='kp-profile-image-container'>
            <img
              id='profileImage'
              src={logo}
              alt='profile-pic'
              draggable='false'
            />
          </div>
        </div>
        <div className='kp-user-summary border-top-0'>
          <span id='userName'>Lorem Ipsum</span>
          <div id='userSummary'>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
          </div>
        </div>
      </Container>
    ); 
  }
}

export default KnowPage;