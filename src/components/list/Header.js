import * as React from 'react';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';

function Header(props) {
  return <List.Subheader style={styles.sectionTitle}>{props.headerText}</List.Subheader>;
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f7b731',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default Header;
