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
        <div className="kp-user-banner">
          <div className="kp-profile-image-container">
            <img
              id="profileImage"
              src={logo}
              alt="profile-pic"
              draggable="false"
            />
          </div>
        </div>
      </Container>
    ); 
  }
}

export default KnowPage;