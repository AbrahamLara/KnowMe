import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { activate } from '../actions/shared';

class ActivationPage extends Component {
  state = {
    msg: '',
    error: false
  }

  // When the component mounts we check if a user
  // is not authenticated since that means their account
  // isn't activated and we can now activate it. We dispatch 
  // activate which will make a request to the /activate router
  // and return us a message returned from the backend as well
  // as whether or not the request failed.
  componentDidMount () {
    const { activate, match, isAuthenticated } = this.props;
    
    if (!isAuthenticated) {
      activate(match.params.token).then(({ msg, error }) => {
        this.setState({
          msg,
          error
        });
      });
    }
  }

  // If a user is authenticated we redirect them to the home
  // page. If they are not we display the message we received
  // from the backend after the request to activate their
  // account had been completed.
  render () {
    const { msg, error } = this.state;
    const isAuthenticated = this.props.isAuthenticated;

    if (isAuthenticated) {
      return <Redirect to="/" />
    }

    let content = (
      <div>loading...</div>
    );

    if (msg) {
      if (error) {
        content = <div>{msg}</div>
      } else {
        content = (
          <Fragment>
            <h1>Congratulations!</h1>
            <p>{msg}</p>
          </Fragment>
        );
      }
    }

    return (
      <div className='ActivationPage'>
        <Container>
          {content}
        </Container>
      </div>
    );
  }
}

function mapStateToProps ({ auth: { isAuthenticated } }) {
  return {
    isAuthenticated
  };
}

export default connect(mapStateToProps, { activate })(ActivationPage);