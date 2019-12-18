// import Dependencies

import * as React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
// Declare RealM
const Realm = require('realm');

class TodoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: null,
      title: null,
      createdAt: null,
      updatedAt: null,
      status: null,
    };
  }

  handleClick() {
    const {title, text} = this.state;
    const todoObject = {
      title: title,
      text: text,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    };
    console.log(todoObject);
    this.setState({
      text: null,
      title: null,
      createdAt: null,
      updatedAt: null,
      status: null,
    });
    this.createTodo(todoObject);
  }

  async createTodo(todoData) {
    try {
      Realm.write(() => {
        Realm.create('Todo', todoData);
        console.log("succcess");

      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {colors} = this.props.theme;

    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={{color: colors.primary}}>Hello</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              label="Title"
              value={this.state.title}
              onChangeText={title => this.setState({title})}
              mode="outlined"
              style={styles.formTextInput}
            />
            <TextInput
              label="Text"
              value={this.state.text}
              onChangeText={text => this.setState({text})}
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
              onPress={() => this.handleClick()}>
              Create Todo
            </Button>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  button: {
    alignSelf: 'center',
  },
});

export default withTheme(TodoScreen);
