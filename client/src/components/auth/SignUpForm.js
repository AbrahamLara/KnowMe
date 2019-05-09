import React, { Component } from 'react';
import {
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

class SignUpForm extends Component {
  state = {
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
    
    if (isAuthenticated) {
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
    const { msg } = this.state;

    return (
      <div className='SignUpForm'>
        <h3>Sign Up</h3>
        { msg &&
          <Alert color='danger'>{ msg }</Alert>
        }
        <Form onSubmit={this.handleSubmit}>
          <div className='d-flex'>
            <FormGroup className='flex-1'>
              <Label for='first_name'>First Name:</Label>
              <Input
                id='first_name'
                name='first_name'
                type='text'
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className='flex-1 ml-3'>
              <Label for='last_name'>Last Name:</Label>
              <Input
                id='last_name'
                name='last_name'
                type='text'
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Label for='email'>Email:</Label>
            <Input
              id='email'
              name='email'
              type='email'
              onChange={this.handleChange}
              />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input
              id='password'
              name='password'
              type='password'
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='conf_password'>Confirm Password:</Label>
            <Input
              id='conf_password'
              name='conf_password'
              type='password'
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button color='dark'>Submit</Button>
        </Form>
      </div>
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
)(SignUpForm);