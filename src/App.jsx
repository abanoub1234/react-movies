import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MovieDetails from './components/MovieDetails';
import Fav from './components/Fav';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/favorites" component={Fav} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Redirect to="/" /> {/* Fallback redirect */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;