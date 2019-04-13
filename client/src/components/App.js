import React, { Component } from 'react';
import '../css/App.css';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import AppNavbar from './AppNavbar';
import { loadUser } from '../actions/shared';

class App extends Component {
  constructor (props) {
    super(props);

    this.props.loadUser();
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container className='mt-10'>
          <h1 className='page-phrase text-center'>Get to KnowMe!!!</h1>
          <p className='app-description text-center'>
            Welcome to <strong>KnowMe</strong> where the main goal is to let others <strong>know</strong> about <strong>you</strong>. This platform aims to allow you to have <strong>your</strong> own <strong>page</strong> that allows others to know who you are and what <strong>define</strong>s <strong>you</strong>.
          </p>
          <p className='app-description text-center'>
            <strong>Discovering</strong> others allows you to make new friends that can lead to a <strong>network</strong> of people that <strong>share</strong> your interests. You don't need to have existing friends on this platform! But you should totally get them on board as well if they are not already <strong>here</strong>!
          </p>
          <p className='app-description text-center'>
            We <strong>don't</strong> encourage you ditch your current friends and <strong>immediately</strong> start to <strong>trust</strong> complete <strong>strangers</strong>. Of course it is completely up to you what you would want to share about yourself, but you should also be careful about what information you share.
          </p>
        </Container>
      </div>
    );
  }
}

export default connect(null, { loadUser })(App);
