/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './src/main/AppNavigator';
import {RealmProvider} from 'react-use-realm/dist/commonjs';
import {realm} from './src/database/Seed';

export default () => {
  return (
    <RealmProvider initialRealm={realm}>
      <AppNavigator />
    </RealmProvider>
  );
};

