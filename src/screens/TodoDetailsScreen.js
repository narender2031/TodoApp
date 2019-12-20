import React, { useContext, useEffect } from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import MyContext from '../context/MyContext';

const TodoDetailsScreen = props => {
  const context = useContext(MyContext);
  const todoId = props.navigation.state.params.todoId;
  const realm = context.realm;

  const todo = realm.objects('Todo').find(t => t.id === todoId);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.todoTitleContainer}>
          <Text style={styles.totoTitle}>{todo.title}</Text>
          <Text style={styles.todoDescription}>{todo.text}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  todoTitleContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  totoTitle: {
    fontSize: 22,
    color: '#f7b731',
    fontWeight: '600',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  todoDescription: {
    fontSize: 16,
  },
});

export default withTheme(TodoDetailsScreen);
