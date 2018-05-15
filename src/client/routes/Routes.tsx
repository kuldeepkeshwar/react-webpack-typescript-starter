import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Nav } from 'components/Nav';
import Home from './Home';
import Counter from './Counter';

const App = () => {
  return (
    <div>
      <Nav>
        <li>
          <NavLink exact={true} to='/' activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/counter' activeClassName='active'>
            Counter
          </NavLink>
        </li>
      </Nav>
      <hr />
      <Route exact path='/' render={props => <Home />} />
      <Route exact path='/counter' render={props => <Counter />} />
    </div>
  );
};

export default hot(module)(App);
