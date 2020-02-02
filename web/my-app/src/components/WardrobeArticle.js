import React from 'react';
import './WardrobeArticle.css';
class WardrobeArticle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      class: 'card'
    };
  }

  toggleClass() {
    if (this.state.class === 'card') {
      this.setState({ class: 'card is-flipped' });
    } else if (this.state.class === 'card is-flipped') {
      this.setState({ class: 'card' });
    }
  }

  render() {
    let imgurl2 = '/images/' + this.props.filename;

    return (
      <div className='scene'>
        <div className={this.state.class} onClick={this.toggleClass}>
          <div className='card__face card__face--front'>
            <div className='imgstyle'>
              <img src={imgurl2} alt='icon' width='110px' vspace='10px'></img>
            </div>
            <div className='namecenter'>
              <b>{this.props.name}</b>
            </div>
          </div>
          <div className='card__face card__face--back'>
            <div className='container'>
              <div className='inner'>
                <div className='child'>
                  <p> HP: {this.props.name} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WardrobeArticle;
