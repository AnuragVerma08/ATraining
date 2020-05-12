import React, { Component } from 'react';
import { Link } from "react-router-dom"; 
import Navigation from './components/Navigation/Navigation';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }


  render() {
    
    return (
      <div className="App">
        <Navigation />
        <div>
          <h2>Welcome to Astarexz Training !</h2>
          <Link to='/enrollform' id="enrolllink">Enroll Now !</Link>
        </div>
      </div>
    );
  }
}

export default App;
