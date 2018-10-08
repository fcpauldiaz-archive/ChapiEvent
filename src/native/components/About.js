import React from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Segment,
  Content,
  Text
} from 'native-base';

import Spacer from './Spacer';

const Home = () => (
  <Container>
    <Header hasSegment>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Días</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="search" />
        </Button>
      </Right>
    </Header>
    <Segment>
      <Button first>
        <Text>Día 1</Text>
      </Button>
      <Button>
        <Text>Día 2</Text>
      </Button>
      <Button last active>
        <Text>Día 3</Text>
      </Button>
    </Segment>
    <Content padder>
      <Text>Awesome segment</Text>
    </Content>
  </Container>
);

export default Home;
