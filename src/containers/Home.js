import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { login } from '../actions/member';

class Home extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: false,
  }

  state = {
    tabSelected: {
      first: true,
      second: false,
      third: false,
    },
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .then((result) => {
        if (result.type === 'USER_LOGIN') {
          Actions.home();
        }
      })
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  render = () => {
    const {
      member,
      Layout,
      isLoading,
    } = this.props;

    const { tabSelected } = this.state;

    return (
      <Layout
        member={member}
        loading={isLoading}
        tabSelected={tabSelected}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
