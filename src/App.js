import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Brunch Club</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={this.props.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export default App;
