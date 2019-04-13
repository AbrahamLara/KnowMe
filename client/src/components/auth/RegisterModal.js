import React, { Component, Fragment } from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/shared';

class RegisterModal extends Component {
  state = {
    isOpen: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  }

  // Toggles modal's visibility to
  // set it open or not
  toggle = () => {
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

    this.toggle();
  }

  render() {
    const { isOpen } = this.state;

    return (
      <NavItem onClick={this.toggle}>
        <NavLink className='text-white' href='#signup'>Sign Up</NavLink>
        <Modal isOpen={isOpen} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            Placeholder
          </ModalHeader>
          <ModalBody>
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
 
export default connect(mapStateToProps, { register })(RegisterModal);