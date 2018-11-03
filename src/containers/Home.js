import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventsData } from '../actions/users';

class Home extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onEventsRetrieve: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: false,
  }

  onEventsRetrieve = (data) => {
    const { onEventsRetrieve } = this.props;
    let day;
    if (data.first) {
      day = 1;
    } else if (data.second) {
      day = 2;
    } else if (data.third) {
      day = 3;
    }
    return onEventsRetrieve(day);
  }

  render = () => {
    const {
      member,
      Layout,
      isLoading,
    } = this.props;

    return (
      <Layout
        member={member}
        loading={isLoading}
        state={this.state}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
