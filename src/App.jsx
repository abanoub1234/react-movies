
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Navbar        from './Navbar';
import HomePage      from './HomePage';
import LoginForm     from './LoginForm';
import RegisterForm  from './RegisterForm';
import MovieDetails from './MovieDetails';
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login"    component={LoginForm}    />
        <Route exact path="/home"     component={HomePage}     />
         <Route exact path="/movie/:id" component={MovieDetails}  />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
