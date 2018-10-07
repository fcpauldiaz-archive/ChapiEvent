import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const Profile = ({ member, logout }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email)
          ? (
            <View>
              <Content padder>
                <Header
                  title={`Hi ${member.firstName},`}
                  content={`You are currently logged in as ${member.email}`}
                />
              </Content>

              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add" />
                </Left>
                <Body>
                  <Text>
                    Update My Profile
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={logout} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
          : (
            <View>
              <Content padder>
                <Header
                  title="Cumbre de las Américas"
                  content="Guatemala 2018"
                />
              </Content>
              <View style={styles.container}>
                <Image
                  source={require('../../images/logo_cumbres_transparent.png')}
                  style={{ height: 200, width: 200 }}
                />
              </View>
              <ListItem onPress={Actions.login} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Iniciar Sesión
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle" />
                </Left>
                <Body>
                  <Text>
                    Crear Usuario
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <Icon name="help-buoy" />
                </Left>
                <Body>
                  <Text>
                   Olvidé Contraseña
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Profile;
