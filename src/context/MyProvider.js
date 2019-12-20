import * as React from 'react';
import MyContext from './MyContext';

class MyProvider extends React.Component {
  render() {
    console.log(this.props.value)
    return (
      <MyContext.Provider value={{realm: this.props.value}}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
export default MyProvider;
