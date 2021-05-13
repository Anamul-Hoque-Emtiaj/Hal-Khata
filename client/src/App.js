import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Navber from './components/Navber'

function App() {
  return (
    <BrowserRouter>
      <div>
      <Navber />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login'  component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
        <Footer />
     </div>
    </BrowserRouter>
  );
}
export default App;
