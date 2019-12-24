import React, {useContext, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {withTheme, Button, Modal, Text, TextInput} from 'react-native-paper';
import {RealmContext} from 'react-use-realm/dist/commonjs';

const TodoDetailsScreen = props => {
  const context = useContext(RealmContext);
  const {realm} = context;
  const todoId = props.navigation.state.params.todoId;


  const todo = realm.objects('Todo').find(t => t.id === todoId);

  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [text, setText] = useState(todo.text);

  const updateTodo = () => {
    let date = new Date();
    realm.write(() => {
      realm.create(
        'Todo',
        {
          id: todo.id,
          title: title,
          text: text,
          updatedAt: date,
        },
        true,
      );
    });
    setIsVisible(false);
    props.navigation.navigate('Todolist', {updatedAtTimestamp: date});
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.todoTitleContainer}>
          <Text style={styles.totoTitle}>{todo.title}</Text>
          <Text style={styles.todoDescription}>{todo.text}</Text>
        </View>
        <View>
          <Button
            raised
            theme={{roundness: 3}}
            mode="outlined"
            style={styles.button}
            onPress={() => setIsVisible(true)}>
            edit
          </Button>
        </View>
        <Modal
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          dismissable={true}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.formContainer}>
            <TextInput
              label="Title"
              value={title}
              onChangeText={titleContext => setTitle(titleContext)}
              mode="outlined"
              style={styles.formTextInput}
            />
            <TextInput
              label="Text"
              value={text}
              onChangeText={textContent => setText(textContent)}
              mode="outlined"
              multiline={true}
              numberOfLines={4}
              style={styles.formTextArea}
            />
            <Button
              raised
              theme={{roundness: 3}}
              mode="contained"
              style={styles.button}
              onPress={() => updateTodo()}>
              Update Todo
            </Button>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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
  button: {
    alignSelf: 'center',
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
  },
  formContainer: {
    marginBottom: 40,
    padding: 20,
  },
  formTextInput: {
    marginBottom: 15,
  },
  formTextArea: {
    marginBottom: 25,
    height: 80,
  },
});

export default withTheme(TodoDetailsScreen);
