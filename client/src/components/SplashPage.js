import React from 'react';
import {
  Container,
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import '../css/SplashPage.css';

export default function SplashPage () {
  return (
    <Container className='SplashPage vh-100 d-flex flex-column justify-content-center align-items-center mt-10'>
      <h1 className='sp-phrase text-center'>Welcome to KnowMe!!!</h1>
      <CardGroup>
        <Card>
          <CardBody>
            <CardTitle className='text-center'>
              <h2>Learn</h2>
            </CardTitle>
            <CardText className='sp-description'>
              We build and become a part of communities that allow us to learn more about one another which leads to connections and creating an understanding as not only groups but as individuals as well. 
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle className='text-center'>
              <h2>Discover</h2>
            </CardTitle>
            <CardText className='sp-description'>
              There are many types of people in the world! Many who may not share your interests but also many that may. All it takes is a simple non-professional introduction to get to know somebody.
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle className='text-center'>
              <h2>Define</h2>
            </CardTitle>
            <CardText className='sp-description'>
              Make yourself known! Let others know about you. Distinguish yourself from others and meet other amazing you would have never met had you not been on this platform.
            </CardText>
          </CardBody>
        </Card>
      </CardGroup>
    </Container>
  );
}