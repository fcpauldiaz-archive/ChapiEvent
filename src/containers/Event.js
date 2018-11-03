import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEventsData } from '../actions/users';

class Event extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onEventsRetrieve: PropTypes.func.isRequired,
    event: PropTypes.shape({}),
    isLoading: PropTypes.bool,
  }

  state = {};

  render = () => {
    const {
      member,
      Layout,
      event,
      isLoading,
      onEventsRetrieve,
    } = this.props;
    return (
      <Layout
        member={member}
        loading={isLoading}
        event={event}
        onEventsRetrieve={onEventsRetrieve}
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
