import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';
import Wardrobe from './components/Wardrobe';
import Recommend from './components/Recommend';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/add' exact component={Home} />
        <Route path='/' exact component={Home} />
        <Route path='/recommend' exact component={Recommend} />
        <Route path='/wardrobe' exact component={Wardrobe} />
      </BrowserRouter>
    );
  }
}

export default App;
