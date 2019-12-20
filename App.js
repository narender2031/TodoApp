/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TodoScreen from './src/screens/TodoScreen';
import {TodoSchema, SectionSchema} from './src/models/schema';
import MyProvider from './src/context/MyProvider';

const Realm = require('realm');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {realm: null};
  }

  componentDidMount() {
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
      <>
        <SafeAreaView style={styles.body}>
          <MyProvider value={this.state.realm}>
            <TodoScreen />
          </MyProvider>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
