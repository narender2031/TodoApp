import * as React from 'react';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const Item = ({itemText, itemDescription, itemId, handleClick}) => {
  return (
    <List.Item
      title={itemText}
      description={itemDescription}
      onPress={() => handleClick(itemId)}
      titleStyle={styles.titleText}
    />
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#82ccdd',
    fontWeight: '500',
  },
});

export default Item;
