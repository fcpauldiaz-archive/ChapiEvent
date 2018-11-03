import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Profile = () => (
  <Container>
    <Content>
      <List>
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
        </View>
      </List>
      <View style={styles.container}>
        <Image
          source={require('../../images/chapilabs.png')}
          style={{ height: 100, width: 200 }}
        />
      </View>
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

export default Profile;
