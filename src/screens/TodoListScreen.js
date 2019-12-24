import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, SectionList, Text} from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

import ListHeader from '../components/list/Header';
import ListItem from '../components/list/Item';
import {RealmContext, useRealmQuery} from 'react-use-realm/dist/commonjs';

const TodoListScreen = ({navigation}) => {
  const context = useContext(RealmContext);
  const {realm} = context;

  let sectionQuery = useRealmQuery({type: 'Section'});
  console.log(sectionQuery);
  let todos = sectionQuery
    ? sectionQuery.map(section => ({
        ...section,
        data: section.todos,
      }))
    : [];

  const handleClickOnTodo = todoId => {
    navigation.navigate('TodoDetails', {todoId: todoId});
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={todos}
        renderItem={({item}) => (
          <ListItem
            item={item}
            handleClick={id => handleClickOnTodo(id)}
            navigation={navigation}
          />
        )}
        renderSectionHeader={({section}) => (
          <ListHeader headerText={section.title} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'flex-start',
  },
});

export default TodoListScreen;
