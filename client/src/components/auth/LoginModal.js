import React, { Component } from 'react';
import {
  NavItem,
  NavLink,
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
import { clearErrors } from '../../actions/error';

class LoginModal extends Component {
  state = {
    isOpen: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  // After attempting to login we check whether
  // any errors were produced so that
  // the error message may be displayed. If login
  // is successful we close the modal
  componentDidUpdate (prevProps) {
    const { error, isAuthenticated } = this.props;
    
    if (error !== prevProps.error) {
      this.setState({
        msg: error.id === LOGIN_FAIL
          ? error.msg.msg
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
    if (this.props.error.status) {
      this.props.clearErrors();
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
      <NavItem onClick={this.toggle}>
        <NavLink className='text-white' href='#login'>Login</NavLink>
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
      </NavItem>
    );
  }
}

function mapStateToProps ({ auth: { isAuthenticated }, error }) {
  return {
    isAuthenticated,
    error
  }
}
 
export default connect (
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);