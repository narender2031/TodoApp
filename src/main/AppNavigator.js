import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// Import screens
import TodoScreen from '../screens/TodoScreen';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';

const TodoListStack = createStackNavigator({
  Todolist: {
    screen: TodoListScreen,
  },
  TodoDetails: {
    screen: TodoDetailsScreen,
  },
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: TodoScreen,
    },
    TodoList: {
      screen: TodoListStack,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#f7b731',
      inactiveTintColor: '#778ca3',
    },
  },
);

export default createAppContainer(AppNavigator);
