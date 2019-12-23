/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {TodoSchema, SectionSchema} from './src/models/schema';
import MyProvider from './src/context/MyProvider';
import AppNavigator from './src/main/AppNavigator';

const Realm = require('realm');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {realm: null};
  }

  componentDidMount() {
    // Initialize RealM DB
    Realm.open({
      schema: [TodoSchema, SectionSchema],
      deleteRealmIfMigrationNeeded: true,
    }).then(realm => {
      this.setState({realm});
    });
  }

  componentWillUnmounted() {
    // Close the realm if there is one open
    const {realm} = this.state;
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  }

  render() {
    return (
      <MyProvider value={this.state.realm}>
        <AppNavigator />
      </MyProvider>
    );
  }
}

export default App;
