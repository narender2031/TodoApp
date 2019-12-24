// import Dependencies

import * as React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {withTheme, Button, TextInput} from 'react-native-paper';
import DropDown from '../components/form/Dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RealmConsumer} from 'react-use-realm/dist/commonjs';

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

  handleClick(realm) {
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
    this.createSectionsOrTodo(realm, todoObject);
  }

  // static contextType = RealmContext;

  async createSectionsOrTodo(realm, todoData) {
    try {
      realm.write(() => {
        let section = realm.create(
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

  render() {
    const {colors} = this.props.theme;
    return (
      <RealmConsumer>
        {({realm}) => (
          <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={{color: colors.primary}}>Create Todo</Text>
            </View>
            <KeyboardAwareScrollView
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}>
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
                  onPress={() => this.handleClick(realm)}>
                  Create Todo
                </Button>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
          )
        }
      </RealmConsumer>
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
    marginTop: 40,
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
