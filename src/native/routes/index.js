import React from 'react';
import { Scene, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import HomeComponent from '../components/About';
import HomeContainer from '../../containers/Home';

import EventComponent from '../components/Event';
import EventContainer from '../../containers/Event';

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Stack
        key="profile"
        title="PRINCIPAL"
        icon={() => <Icon name="contact" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene
          hideNavBar
          key="profileHome"
          component={MemberContainer}
          Layout={ProfileComponent}
        />
        <Scene
          back
          key="signUp"
          title="Crear Usuario"
          {...DefaultProps.navbarProps}
          component={SignUpContainer}
          Layout={SignUpComponent}
        />
        <Scene
          back
          key="login"
          title="LOGIN"
          {...DefaultProps.navbarProps}
          component={LoginContainer}
          Layout={LoginComponent}
        />
      </Stack>
      <Stack
        key="main"
        title={AppConfig.appName.toUpperCase()}
        icon={() => <Icon name="planet" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene
          back={false}
          renderBackButton={() => null}
          key="home"
          {...DefaultProps.navbarProps}
          component={HomeContainer}
          Layout={HomeComponent}
        />
        <Scene
          back
          key="event"
          title="Evento"
          {...DefaultProps.navbarProps}
          component={EventContainer}
          Layout={EventComponent}
        />
      </Stack>
    </Scene>
  </Stack>
);

export default Index;
