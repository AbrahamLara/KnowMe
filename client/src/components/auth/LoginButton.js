import React, { Component, Fragment } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/shared';
import { LOGIN_FAIL } from '../../actions/auth';
import { clearMessages } from '../../actions/msg';

class LoginModal extends Component {
  state = {
    isOpen: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    msg: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
  }

  // After attempting to login we check whether
  // any errors were produced so that
  // the error message may be displayed. If login
  // is successful we close the modal
  componentDidUpdate (prevProps) {
    const { msg, isAuthenticated } = this.props;
    
    if (msg !== prevProps.msg) {
      this.setState({
        msg: msg.id === LOGIN_FAIL
          ? msg.msg.msg
          :null
      });
    }
    
    if (this.state.isOpen && isAuthenticated) {
      this.toggle();
    }
  }

  // Toggles modal's visibility to
  // set it open or hidden while also clearing
  // any errors in redux state;
  toggle = () => {
    if (this.props.msg.status) {
      this.props.clearMessages();
    }
    
    this.setState((currState) => ({
      isOpen: !currState.isOpen
    }));
  }

  // As the user types in each field their
  // value is updated in state based on the
  // name provided to the inputs
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  // Once the user clicks submit their inputs
  // will be saved as a user object to send
  // to the login function to make api request
  // to login the user
  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.props.login(user);
  }

  render() {
    const { isOpen, msg } = this.state;

    return (
      <Fragment>
        <Button
          className='text-dark'
          color='link'
          onClick={this.toggle}
          block
        >
          Login
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            Login
          </ModalHeader>
          <ModalBody>
            { msg &&
              <Alert color='danger'>{ msg }</Alert>
            }
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for='email'>Email:</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Email'
                  onChange={this.handleChange}
                  />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password:</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color='dark' block>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps ({ auth: { isAuthenticated }, msg }) {
  return {
    isAuthenticated,
    msg
  }
}
 
export default connect (
  mapStateToProps,
  { login, clearMessages }
)(LoginModal);