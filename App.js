/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';


// realM
const Realm = require('realm');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {realm: null};
  }

  componentDidMount() {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}],
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', {name: 'Rex'});
      });
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
    const info = this.state.realm
      ? 'Total Dogs I have ' + this.state.realm.objects('Dog').length
      : 'Loading...';

    return (
      <>
        <SafeAreaView style={styles.body}>
          <Text>{info}</Text>
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
