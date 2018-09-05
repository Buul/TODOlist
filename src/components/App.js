import React, { Component } from 'react';
import '../styles/app.scss';
import Todo from './todo/Todo';

class App extends Component {
  handleChange = param => {
    console.log(param);
  };

  render() {
    return <Todo />;
  }
}

export default App;
