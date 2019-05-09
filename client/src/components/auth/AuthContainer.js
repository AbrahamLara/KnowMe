import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import { combineClassNames } from '../../utils/helpers';

class AuthContainer extends Component {
  render() {
    const { className } = this.props;

    return (
      <div className={combineClassNames('AuthContainer', className)}>
        <SignUpForm />
      </div>
    );
  }
}

export default AuthContainer;