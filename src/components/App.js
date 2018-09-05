import React, { Component } from 'react';
import '../styles/app.scss';

class App extends Component {
  handleChange = param => {
    console.log(param);
  };

  render() {
    return <div id="boiler" />;
  }
}

export default App;
