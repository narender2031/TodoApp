/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {name as appName} from './app.json';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f7b731',
    accent: '#82ccdd',
    text: '#1e272e',
    background: '#ffffff',
    placeholder: '#778ca3',
    disabled: '#dfe6e9',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
