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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from  'react-redux';
import { getUserProfile } from '../actions/shared';
import { clearMessages } from '../actions/msg';
import { RETRIEVING_PROFILE_FAILED } from '../actions/profile';

class KnowPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
  }

  // We retreive the profile path from the url and
  // dispatch getUserProfile to retreive the user
  // profile.
  constructor(props) {
    super(props);

    this.state = {
      msg: null,
      error: false
    }

    const currProfilePath = props.match.params.profilePath;
    
    props.getUserProfile(currProfilePath);
  }

  // Once the component updates after attempting to retreive
  // the user's profile page we check if the current msg state does
  // not match the previous msg state from props which tells us there
  // was an error fetching the user profile page. 
  componentDidUpdate(prevProps) {
    const msg = this.props.msg;
    
    if (msg !== prevProps.msg && msg.id === RETRIEVING_PROFILE_FAILED) {
      this.setState({
        msg: msg.msg.msg,
        error: true
      });
    }
  }

  // If there was an error retreiving the user's profile page then we
  // display the error message. If retreival was successful then we
  // display the user's profile page.
  render() {
    const { msg, error } = this.state;
    const {
      first_name,
      last_name,
      user_title
    } = this.props.profile;

    if (error) {
      return (
        <div className='container'>
          <h5 className='text-center'>{msg}</h5>
        </div>
      )
    }

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
                {first_name && last_name &&
                  <span id='userName'>{`${first_name} ${last_name}`}</span>
                }
                {user_title &&
                  <span className='d-block' id='userTitle'>{user_title}</span>
                }
              </div>
              <div className='kp-user-left-container'>
                <i className='text-secondary'>Lorem, Ipsum</i>
              </div>
              <div className='kp-user-left-container'>
                <div className='d-flex mb-2'>
                  <div className='w-30'><FontAwesomeIcon icon={['fa', 'phone']}/></div>
                  <span>(123) 456-7890</span>
                </div>
                <div className='d-flex mb-2'>
                  <div className='w-30'><FontAwesomeIcon icon={['fa', 'envelope']}/></div>
                  <span>lorem@ip.sum</span>
                </div>
                <div className='d-flex mb-2'>
                  <div className='w-30'><FontAwesomeIcon icon={['fab', 'github-square']}/></div>
                  <span>github.com</span>
                </div>
                <div className='d-flex mb-2'>
                  <div className='w-30'><FontAwesomeIcon style={{color: '#0E76A8'}} icon={['fab', 'linkedin-in']}/></div>
                  <span>linkedin.com</span>
                </div>
                <div className='d-flex mb-2'>
                  <div className='w-30'><FontAwesomeIcon style={{color: '#3B5998'}} icon={['fab', 'facebook-f']}/></div>
                  <span>facebook.com</span>
                </div>
                <div className='d-flex mb-2'>
                  <div className='w-30'><FontAwesomeIcon style={{color: '#00ACEE'}} icon={['fab', 'twitter']}/></div>
                  <span>twitter.com</span>
                </div>
              </div>
            </Col>
            <Col xs='12' sm='12' md='12' lg='9'>
              <div className='mt-2'>
                <h4 className='mb-0'><strong>About:</strong></h4>
                <ExpandCollapse className='pl-0' previewHeight='160px' id='userDescription'>
                  {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                </ExpandCollapse>
              </div>
              <div className='mt-2'>
                <h4 className='mb-0'><strong>Favorite Activities:</strong></h4>
                <div>
                  <ul className='pl-4'>
                    <li>
                      <i>Lorem Ipsum</i>
                    </li>
                    <li>
                      <i>Lorem Ipsum</i>
                    </li>
                    <li>
                      <i>Lorem Ipsum</i>
                    </li>
                    <li>
                      <i>Lorem Ipsum</i>
                    </li>
                    <li>
                      <i>Lorem Ipsum</i>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    ); 
  }
}

function mapStateToProps({ profile, msg }) {
  return { profile, msg };
}

export default connect(mapStateToProps, {
  getUserProfile,
  clearMessages
})(KnowPage);