import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import logo from '../logo.svg';
import '../css/KnowPage.css';
import '../css/ExpandCollapse.css';
import PropTypes from'prop-types';
import ExpandCollapse from 'react-expand-collapse';

class KnowPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    const userLink = this.props.match.params.userLink;

    return (
      <Container className='KnowPage pb-3'>
        <div className='kp-top-user-container'>
          <div className='kp-user-banner'></div>
          <img
            id='profileImage'
            src={logo}
            alt='profile-pic'
            draggable='false'
          />
        </div>
        <div className='kp-user-summary border-top-0'>
          <Row>
            <Col className='border border-top-0 border-bottom-0 border-left-0' xs='12' sm='12' md='12' lg='3'>
              <div className='kp-user-left-container'>
                <span id='userName'>Lorem Ipsum</span>
                <span className='d-block' id='userTitle'>Lorem Ipsum</span>
              </div>
              <div className='kp-user-left-container'>
                <span className='d-block mb-2'><strong>Email:</strong> lorem@ip.sum</span>
                <span className='d-block mb-2'><strong>Github:</strong> github.com</span>
                <span className='d-block mb-2'><strong>LinkIn:</strong> linkedin.com</span>
                <span className='d-block mb-2'><strong>Facebook:</strong> facebook.com</span>
                <span className='d-block mb-2'><strong>Twitter:</strong> twitter.com</span>
              </div>
            </Col>
            <Col xs='12' sm='12' md='12' lg='9'>
              <div className='mt-2'>
                <h4 className='mb-0'><strong>Biography:</strong></h4>
                <ExpandCollapse className='pl-0' previewHeight='160px' id='userDescription'>
                  {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                </ExpandCollapse>
              </div>
              <div className='mt-2'>
                <h4 className='mb-0'><strong>Section 2:</strong></h4>
                <div>Section 2 content</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    ); 
  }
}

export default KnowPage;