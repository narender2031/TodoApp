import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, SectionList} from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

import ListHeader from '../components/list/Header';
import ListItem from '../components/list/Item';
import {RealmContext} from 'react-use-realm/dist/commonjs';

const TodoListScreen = ({navigation}) => {
  const context = useContext(RealmContext);
  const {realm} = context;

  let sections = realm.objects('Section');
  sections = sections.map(section => ({...section, data: section.todos}));

  const [todos, setTodos] = useState(null);
  const u = navigation.state.params
    ? navigation.state.params.updatedAtTimestamp
    : 1;

  useEffect(() => {
    setTodos(sections);
  }, [u]);

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
