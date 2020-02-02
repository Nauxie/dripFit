import React from 'react';
import './Recommend.css';
import Header from './Header';
import axios from 'axios';
import WardrobeArticle from './WardrobeArticle.js';

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: [],
      keyValue: '',
      performAlgo: false
    };

    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/getData')
      .then(data => this.setState({ articleData: data.data.result }));
  }
  handleInput(e) {
    console.log(e.target.value);
    this.setState({ keyValue: e.target.value });
    this.setState({ performAlgo: true });
  }
  render() {
    let renderMatches = () => {
      if (this.state.performAlgo) {
        let keyList = [];
        let objList = [];
        for (let i = 0; i < this.state.articleData.length; i++) {
          if (
            this.state.articleData[i].tags.includes(this.state.keyValue) &&
            !keyList.includes(this.state.articleData[i].type)
          ) {
            objList.push(this.state.articleData[i]);
            keyList.push(this.state.articleData[i].type);
          }
        }
        console.log(objList);
        let renderedArticles = objList.map(object => (
          <WardrobeArticle alldata={object} />
        ));
        return <div>{renderedArticles}</div>;
      }
    };
    return (
      <div className='wrapper'>
        <div>
          <Header />
        </div>

        <div className='overlay'>
          <h1>What kind of outfit would you like?</h1>
        </div>
        <div
          className='gridspecial'
          onClick={e => this.handleInput(e, 'value')}
        >
          <button className='buttonspecial' value='casual'>
            Casual
          </button>

          <button className='buttonspecial' value='formal'>
            Formal
          </button>

          <button className='buttonspecial' value='athletic'>
            Athletic
          </button>

          <button className='buttonspecial' value='winter'>
            Winter
          </button>
        </div>
        <div className='matches'>{renderMatches()}</div>
      </div>
    );
  }
}
export default Recommend;
