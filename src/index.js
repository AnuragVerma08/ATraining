import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import EnrollForm from './components/EnrollForm/EnrollForm';
import StudentList from './components/StudentList/StudentList';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Route path="/" component={App}/>
        <Route path="/enrollform" component={EnrollForm} />
        <Route path="/studentlist" component={StudentList} />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
