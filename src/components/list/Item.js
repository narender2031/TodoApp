import React, {useContext} from 'react';
import {List, Text} from 'react-native-paper';
import {StyleSheet, Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {RealmContext} from 'react-use-realm/dist/commonjs';

const Item = ({item, handleClick, navigation}) => {
  const context = useContext(RealmContext);
  const {realm} = context;

  // delete
  const deleteTodo = () => {
    realm.write(() => {
      realm.delete(item);
    });
    navigation.navigate('Todolist', {updatedAtTimestamp: new Date()});
  };

  const changeTodoStatus = () => {
    const status = item.status === 'Complete' ? 'Pending' : 'Complete';
    realm.write(() => {
      realm.create('Todo', {id: item.id, status: status}, true);
    });
    navigation.navigate('Todolist', {updatedAtTimestamp: new Date()});
  };

  // Left slide options
  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={() => changeTodoStatus()}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          {item.status === 'Complete' ? 'Pending' : 'Complete'}
        </Animated.Text>
      </RectButton>
    );
  };

  // Right slide options
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-0, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rightAction} onPress={() => deleteTodo()}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  const todoStatusDecoration = () => {
    return item.status === 'Complete'
      ? {textDecorationLine: 'line-through'}
      : {};
  };

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <List.Item
        title={item.title}
        description={item.text}
        onPress={() => handleClick(item.id)}
        titleStyle={[styles.titleText, todoStatusDecoration()]}
        right={props => (
          <Text>{new Intl.DateTimeFormat('en-US').format(item.updatedAt)}</Text>
        )}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#82ccdd',
    fontWeight: '500',
  },
  leftAction: {
    justifyContent: 'center',
    backgroundColor: '#82ccdd',
    padding: 10,
  },
  actionText: {
    color: '#ffff',
    alignSelf: 'center',
  },
  rightAction: {
    justifyContent: 'center',
    backgroundColor: '#ff6348',
    padding: 10,
  },
});

export default Item;
