import React, {useContext, useEffect} from 'react';
import {StyleSheet, SafeAreaView, SectionList} from 'react-native';

import MyContext from '../context/MyContext';
import ListHeader from '../components/list/Header';
import ListItem from '../components/list/Item';

const TodoListScreen = ({navigation}) => {
  const context = useContext(MyContext);
  const {realm} = context;

  useEffect(() => {
    getTodoList();
  });

  const getTodoList = () => {
    let sections = realm.objects('Section');
    sections = formatedTodoList(sections);
    return sections;
  };

  const formatedTodoList = sections => {
    let todoList = [];
    sections.map(section =>
      todoList.push({
        title: section.title,
        createdAt: section.createdAt,
        updatedAt: section.updatedAt,
        is: section.id,
        data: section.todos,
      }),
    );
    return todoList;
  };

  const handleClickOnTodo = todoId => {
    navigation.navigate('TodoDetails', {todoId: todoId});
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={getTodoList()}
        renderItem={({item}) => (
          <ListItem
            itemText={item.title}
            itemDescription={item.text}
            itemId={item.id}
            handleClick={id => handleClickOnTodo(id)}
          />
        )}
        renderSectionHeader={({section}) => (
          <ListHeader headerText={section.title} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    alignSelf: 'flex-start',
  },
});

export default TodoListScreen;
