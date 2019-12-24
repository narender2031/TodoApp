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

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {realm: null};
//   }

//   componentDidMount() {
//     // Initialize RealM DB
//     Realm.open({
//       schema: [TodoSchema, SectionSchema],
//       deleteRealmIfMigrationNeeded: true,
//     }).then(realm => {
//       this.setState({realm});
//     });
//   }

//   componentWillUnmounted() {
//     // Close the realm if there is one open
//     const {realm} = this.state;
//     if (realm !== null && !realm.isClosed) {
//       realm.close();
//     }
//   }

//   render() {
//     return (
//       <MyProvider value={this.state.realm}>
//         <AppNavigator />
//       </MyProvider>
//     );
//   }
// }

// export default App;
