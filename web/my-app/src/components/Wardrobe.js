import React from 'react';
import Header from './Header';
import './Wardrobe.css';
import './WardrobeArticle.js';
import WardrobeArticle from './WardrobeArticle.js';

class Wardrobe extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='wrapper'>
          <div className='outer_grid'>
            <WardrobeArticle name='grey hoodie' filename='image4.jpg' />
            <WardrobeArticle name='grey hoodie' filename='image4.jpg' />
            <WardrobeArticle name='grey hoodie' filename='image4.jpg' />
            <WardrobeArticle name='grey hoodie' filename='image4.jpg' />
          </div>
        </div>
      </div>
    );
  }
}

export default Wardrobe;
