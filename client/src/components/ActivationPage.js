import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { activate } from '../actions/shared';

class ActivationPage extends Component {
  state = {
    msg: '',
    error: false
  }

  componentDidMount () {
    const { activate, match } = this.props;

    activate(match.params.token).then(({ msg, error }) => {
      this.setState({
        msg,
        error
      });
    });
  }

  render () {
    const { msg, error } = this.state;

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

export default connect(null, { activate })(ActivationPage);