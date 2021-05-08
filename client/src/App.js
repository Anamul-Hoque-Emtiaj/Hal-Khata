import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>I am Frontend</h1>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login'  component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
     </div>
    </BrowserRouter>
  );
}
export default App;
