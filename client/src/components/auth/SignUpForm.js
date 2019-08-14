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
import '../../css/SignUpForm.css';
import PropTypes from 'prop-types';
import { register } from '../../actions/shared';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../../actions/auth';
import { clearMessages } from '../../actions/msg';
import classnames from 'classnames';

class SignUpForm extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    msg: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      conf_password: '',
      msg: null,
      error: false,
      visible: false
    };
  }

  // After attempting to register we check whether
  // any errors were produced upon registration so that
  // the error message may be displayed as an alert
  componentDidUpdate (prevProps) {
    const { msg } = this.props;
    if (msg !== prevProps.msg) {
      let newState = {
        msg: msg.msg.msg,
        error: msg.id === REGISTER_FAIL,
        visible: true
      };

      if (msg.id === REGISTER_SUCCESS) {
        newState = {
          ...newState,
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          conf_password:''
        }
      }

      this.setState(newState);
    }
  }

  // Once the user has toggled the alert for dismissal
  // we clear out any errors in redux state
  onDismiss = () => {
    if (this.props.msg.status) {
      this.props.clearMessages();
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

  // Once the decides to submit their inputs, the
  // values they entered are used to create a user
  // object and their password confirmation is used
  // to be compared to their initial password input
  handleSubmit = (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      email,
      password,
      conf_password
    } = this.state;

    const newUser = {
      first_name,
      last_name,
      email,
      password
    };

    this.props.register(newUser, conf_password);
  }

  render() {
    const {
      msg,
      visible,
      error,
      first_name,
      last_name,
      email,
      password,
      conf_password
    } = this.state;

    return (
      <div className={classnames('SignUpForm', this.props.className)}>
        <h3 className='mb-3' style={{textDecoration: 'underline'}}>Sign Up</h3>
        { msg &&
          <Alert
            color={error ? 'danger' : 'success'}
            fade
            isOpen={visible}
            toggle={this.onDismiss}
          >{ msg }</Alert>
        }
        <Form onSubmit={this.handleSubmit}>
          <div className='suf-ng d-flex'>
            <FormGroup className='flex-1'>
              <Label for='first_name'>First Name:</Label>
              <Input
                id='first_name'
                name='first_name'
                type='text'
                value={first_name}
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup className='flex-1 ml-3'>
              <Label for='last_name'>Last Name:</Label>
              <Input
                id='last_name'
                name='last_name'
                type='text'
                value={last_name}
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
              value={email}
              onChange={this.handleChange}
              />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input
              id='password'
              name='password'
              type='password'
              value={password}
              onChange={this.handleChange}
              />
          </FormGroup>
          <FormGroup>
            <Label for='conf_password'>Confirm Password:</Label>
            <Input
              id='conf_password'
              name='conf_password'
              type='password'
              value={conf_password}
              onChange={this.handleChange}
              />
          </FormGroup>
          <Button className='suf-btn' color='dark'>Submit</Button>
        </Form>
      </div>
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
  { register, clearMessages }
)(SignUpForm);