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