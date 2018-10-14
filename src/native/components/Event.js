import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Container, Content, List,
} from 'native-base';
import QRCode from 'react-native-qrcode';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Event = ({ event, member, loading, error }) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  return (
    <Container>
      <Content>
        <View padder>
          <Header
            title=""
          />
        </View>
        <List>
          <View style={styles.container}>
            <Content padder>
              <Header
                title={event.name}
                content={event.description}
              />
              <QRCode
                value={JSON.stringify({
                  email: member.email,
                  event_id: event._id,
                  username: member.username,
                })}
                size={250}
              />
            </Content>
          </View>
        </List>
      </Content>
    </Container>
  );
};

Event.propTypes = {
  member: PropTypes.shape({}),
  event: PropTypes.shape({}),
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

Event.defaultProps = {
  member: {},
  event: {},
  error: null,
};

export default Event;
