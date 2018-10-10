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
import { Alert } from 'react-native';
import Spacer from './Spacer';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first: true,
      second: false,
      third: false,
      active: 'first',
    }
  }

  changeDay(param) {
    this.setState(() => ({
      first: false,
      second: false,
      third: false,
      [param]: true,
      active: param,
    }));
  }

  render() {
    const { first, second, third, active } = this.state;
    return (
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
          <Button first active={first} onPress={() => this.changeDay('first')}>
            <Text>Día 1</Text>
          </Button>
          <Button active={second} onPress={() => this.changeDay('second')}>
            <Text>Día 2</Text>
          </Button>
          <Button last active={third} onPress={() => this.changeDay('third')}>
            <Text>Día 3</Text>
          </Button>
        </Segment>
        <Content padder>
          <Text>
            Awesome segment
            {active}
          </Text>
        </Content>
      </Container>
    );
  }
}

export default Home;
