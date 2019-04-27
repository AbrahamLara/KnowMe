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
import { register } from '../../actions/shared';
import { REGISTER_FAIL } from '../../actions/auth';
import { clearErrors } from '../../actions/error';

class SignUpButton extends Component {
  state = {
    isOpen: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  // After attempting to register we check whether
  // any errors were produced upon registration so that
  // the error message may be displayed. If registration
  // was successful we close the modal
  componentDidUpdate (prevProps) {
    const { error, isAuthenticated } = this.props;
    
    if (error !== prevProps.error) {
      this.setState({
        msg: error.id === REGISTER_FAIL
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
  // will be saved as a new user object to send
  // to registration function to make api request
  // to register the user
  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password
    };

    this.props.register(newUser);
  }

  render() {
    const { isOpen, msg } = this.state;

    return (
      <Fragment>
        <Button
          className='bg-dark text-white'
          onClick={this.toggle}
          block
        >
          Sign Up
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            Register
          </ModalHeader>
          <ModalBody>
            { msg &&
              <Alert color='danger'>{ msg }</Alert>
            }
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for='name'>Name:</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Name'
                  onChange={this.handleChange}
                />
              </FormGroup>
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

function mapStateToProps ({ auth: { isAuthenticated }, error }) {
  return {
    isAuthenticated,
    error
  }
}
 
export default connect (
  mapStateToProps,
  { register, clearErrors }
)(SignUpButton);