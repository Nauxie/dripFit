import React from 'react';
import Header from './Header';
import './Wardrobe.css';
import './WardrobeArticle.js';
import WardrobeArticle from './WardrobeArticle.js';
import axios from 'axios';

class Wardrobe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/getData')
      .then(data => this.setState({ articleData: data.data.result }));
  }
  render() {
    let renderedArticles = this.state.articleData.map(object => (
      <WardrobeArticle alldata={object} />
    ));
    return (
      <div>
        <Header />
        <div className='wrapper'>
          <div className='outer_grid'>{renderedArticles}</div>
        </div>
      </div>
    );
  }
}

export default Wardrobe;
