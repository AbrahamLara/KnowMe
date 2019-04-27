import React, { Component } from 'react';
import '../css/App.css';
import { Container, CardGroup, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import AppNavbar from './AppNavbar';
import { loadUser } from '../actions/shared';

class App extends Component {
  constructor (props) {
    super(props);

    props.loadUser();
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container className='vh-100 d-flex flex-column justify-content-center align-items-center mt-10 AppContainer'>
          <h1 className='page-phrase text-center'>Welcome to KnowMe!!!</h1>
          <CardGroup>
            <Card>
              <CardBody>
                <CardTitle className='text-center'>
                  <h2>Learn</h2>
                </CardTitle>
                <CardText>
                  We build and become a part of communities that allow us to learn more about one another which leads to connections and creating an understanding as not only groups but as individuals as well. 
                </CardText>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle className='text-center'>
                  <h2>Discover</h2>
                </CardTitle>
                <CardText>
                </CardText>
                  There are many types of people in the world! Many who may not share your interests but also many that may. All it takes is a simple non-professional introduction to get to know somebody.
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle className='text-center'>
                  <h2>Define</h2>
                </CardTitle>
                <CardText>
                  Make yourself known! Let others know about you. Distinguish yourself from others and meet other amazing you would have never met had you not been on this platform.
                </CardText>
              </CardBody>
            </Card>
          </CardGroup>
        </Container>
      </div>
    );
  }
}

export default connect(null, { loadUser })(App);
