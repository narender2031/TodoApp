// import Dependencies

import * as React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import MyContext from '../context/MyContext';
import DropDown from '../components/form/Dropdown';

import {uniqueString} from '../util/uniqueString';

const data = [
  {label: 'Personal', value: 'personal'},
  {label: 'Office', value: 'office'},
];

const initialState = {
  text: null,
  title: null,
  createdAt: null,
  updatedAt: null,
  status: null,
  section: null,
};

const date = new Date();

class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleClick() {
    const {title, text} = this.state;
    const todoObject = {
      id: uniqueString(),
      title: title,
      text: text,
      createdAt: date,
      updatedAt: date,
      status: 'Pending',
    };

    this.setState(initialState);
    this.createSectionsOrTodo(todoObject);
  }

  static contextType = MyContext;

  async createSectionsOrTodo(todoData) {
    try {
      this.context.realm.write(() => {
        let section = this.context.realm.create(
          'Section',
          {
            title: this.state.section,
            id: uniqueString(),
            createdAt: date,
            updatedAt: date,
          },
          true,
        );
        section.todos.push(todoData);
        this.props.navigation.navigate('Todolist', {
          updatedAtTimestamp: date,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(todoData, sections) {
    try {
      let section = sections.find(
        record => record.title === this.state.section,
      );
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
          <DropDown
            updateDropDownValue={value => this.setState({section: value})}
            data={data}
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
