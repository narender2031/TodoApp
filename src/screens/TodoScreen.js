// import Dependencies

import * as React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import MyContext from '../context/MyContext';
import RNPickerSelect from 'react-native-picker-select';

const data = [
  {label: 'Personal', value: 'personal'},
  {label: 'Office', value: 'office'},
];

class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      title: null,
      createdAt: null,
      updatedAt: null,
      status: null,
      section: null,
    };
  }

  // read the todos
  // get last todo
  //
  getUniqueId() {
    let string = 'abcdefghijklmnopqrstuvwxyz';
    let str = '';
    for (let i = 1; i <= 6; i++) {
      let randomCharacter = string.charAt(
        Math.floor(Math.random() * string.length),
      );
      str += randomCharacter;
    }
    return str;
  }

  handleClick() {
    const {title, text} = this.state;
    const todoObject = {
      id: this.getUniqueId(),
      title: title,
      text: text,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    };

    this.setState({
      text: null,
      title: null,
      createdAt: null,
      updatedAt: null,
      status: null,
    });
    this.createSectionsOrTodo(todoObject);
  }

  static contextType = MyContext;

  async createSectionsOrTodo(todoData) {
    try {
      this.context.realm.write(() => {
        console.log(todoData);
        let section = this.context.realm.create(
          'Section',
          {
            title: this.state.section,
            id: this.getUniqueId(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          true,
        );
        section.todos.push(todoData);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(todoData, sections) {
    try {
      // let section = this.context.realm
      //   .objects('Section')
      //   .filtered(`title = "${this.state.section}"`);
      console.log(sections);
      let section = sections.find(
        record => record.title === this.state.section,
      );

      console.log(section, 'sections');
      this.context.realm.write(() => {
        section.todos.push(todoData);
        console.log('success');
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(sections);
    }
  }

  render() {
    const {colors} = this.props.theme;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{color: colors.primary}}>Create Todo</Text>
        </View>
        <View style={styles.formContainer}>
          <RNPickerSelect
            onValueChange={value => this.setState({section: value})}
            items={data}
            placeholder={{
              label: 'Select the section',
              value: null,
            }}
          />
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
