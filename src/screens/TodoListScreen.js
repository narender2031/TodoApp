import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, SectionList, View} from 'react-native';
import ListHeader from '../components/list/Header';
import ListItem from '../components/list/Item';
import {useRealmQuery} from 'react-use-realm/dist/commonjs';
import SearchBar from '../components/form/Search';

const TodoListScreen = ({navigation}) => {

  const [searchValue, setSearchValue] = useState('');

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

  const searchTodo = value => {
    setSearchValue(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
          searchPlaceHolder="Search"
          searchQuery={value => searchTodo(value)}
          searchValue={searchValue}
        />
      </View>
      <View>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default TodoListScreen;
