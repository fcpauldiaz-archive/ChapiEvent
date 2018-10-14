import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { getEventsData, loading } from '../actions/member';

class Event extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onEventsRetrieve: PropTypes.func.isRequired,
    event: PropTypes.shape({}),
    isLoading: PropTypes.bool,
  }

  state = {};

  componentDidMount() {
    loading();
  }

  onEventsRetrieve = (data) => {
    loading();
  }

  render = () => {
    const {
      member,
      Layout,
      event,
      isLoading,
    } = this.props;
    return (
      <Layout
        member={member}
        loading={isLoading}
        event={event}
        onEventsRetrieve={this.onEventsRetrieve}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onEventsRetrieve: getEventsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
