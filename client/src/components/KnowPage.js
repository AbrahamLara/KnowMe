import React, { Component } from 'react';
import {
  Container,
  Jumbotron,
  Row
} from 'reactstrap';
import default_pic from '../images/test_profile_pic.png';
import '../css/KnowPage.css';

class KnowPage extends Component {
  render() {
    const match = this.props.match;

    return (
      <Container className='KnowPage pt-6'>
        <Jumbotron className='bg-white' fluid>
          <Container fluid>
            <Row className='align-items-center mb-3'>
              <img className='kp-user-profile-image mb-10' src={default_pic} alt='png file' />
              <h1 className='ml-4'>{match.params.name}</h1>
            </Row>
            <div className='kp-user-description'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
          </Container>
        </Jumbotron>
      </Container>
    ); 
  }
}

export default KnowPage;