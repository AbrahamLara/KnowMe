import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { activate } from '../actions/shared';
import { clearErrors } from '../actions/error';

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

  componentDidUpdate (prevProps) {
    const error = this.props.error;

    if (error !== prevProps.error) {
      this.setState({
        msg: error.msg.msg
      });
    }
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

function mapStateToProps ({ error }) {
  return {
    error
  }
}

export default connect(mapStateToProps, { activate, clearErrors })(ActivationPage);