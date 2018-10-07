import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Crear usuario"
            content="Guatemala 2018"
          />

          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label>
                Nombres
              </Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Apellido
              </Label>
              <Input onChangeText={v => this.handleChange('lastName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Correo
              </Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Contraseña
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Confirmar Contraseña
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
                Crear usuario
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
