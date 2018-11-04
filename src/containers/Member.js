import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { logout } from '../actions/users';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  };

  componentDidMount = () => {
    const { user } = this.props;
    console.log(this.props);
    if (user && user.jwt && user.email && Actions.currentScene !== 'main') {
      Actions.main();
    }
  };

  render = () => {
    const { Layout, member, memberLogout } = this.props;

    return <Layout member={member} logout={memberLogout} />;
  };
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
