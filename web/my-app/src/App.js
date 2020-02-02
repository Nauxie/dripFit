import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';
import Wardrobe from './components/Wardrobe';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/add' exact component={Home} />
        <Route path='/' exact component={Home} />
        <Route path='/test' exact component={Test} />
        <Route path='/wardrobe' exact component={Wardrobe} />
      </BrowserRouter>
    );
  }
}

export default App;
