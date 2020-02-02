import React from 'react';
import axios from 'axios';
import Header from './Header';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploadText: 'Choose image',
      questionRender: false,
      labelData: [],
      colorData: [],
      imgShow: false
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      uploadText: event.target.files[0].name
    });
  };
  fileUploadHandler = async event => {
    if (this.state.selectedFile == null) {
      alert('you need to choose an image first!');
    } else {
      event.preventDefault();
      event.stopPropagation();

      const fd = new FormData();
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name);

      const response = await axios.post(
        'https://apicloud-colortag.p.mashape.com/tag-file.json',
        fd,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'apicloud-colortag.p.rapidapi.com',
            'X-RapidAPI-Key':
              '874f581ecdmshcaaa8d2b93e629bp1a3bb8jsn4eac9af8bc5d'
          }
        }
      );
      console.log(response.data);
      this.setState({ colorData: response.data.tags });
      this.setState({ questionRender: true });
      this.setState({ imgShow: true });
      axios
        .get('http://localhost:5000?filename=' + this.state.selectedFile.name)
        .then(data => {
          console.log(data.data);
          this.setState({ labelData: data.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  render() {
    let allowed = [
      'T-shirt',
      'Jeans',
      'Shirt',
      'Sweater',
      'Trousers',
      'Cargo Pants',
      'Hoodie',
      'Jacket',
      'Dress Shirt',
      'Collar',
      'Suit',
      'Sweatpant',
      'Leggings',
      'Tights',
      'Khaki',
      'Polo Shirt',
      'Suit',
      'Shorts',
      'Blazer',
      'Footwear',
      'Shoe',
      'Pajamas',
      'Coat',
      'Leather Jacket',
      'Trench Coat',
      'Overcoat',
      'Crop Top',
      'Pajamas',
      'Coat',
      'Pencil Skirt',
      'Dress',
      'Gown',
      'Pantsuit',
      'Suit Trousers',
      'Cardigan',
      'Long-sleeved T-shirt',
      'Sweatshirt',
      'Jersey',
      'Plaid',
      'Denim',
      'Parka',
      'Tuxedo',
      'Robe',
      'Gown',
      'Flip-flop',
      'Sandal',
      'Slipper',
      'Knee-high Boot',
      'Uniform',
      'Boot',
      'Dress Shoe',
      'Active Pants',
      'Rain Pants',
      'Yoga Pants',
      'High Heels',
      'Riding Boot',
      'Slingback',
      'Court Shoe',
      'Skort',
      'Cocktail Dress',
      'Cowboy Boot',
      'Sneakers',
      'Skate Shoe',
      'Walking Shoe',
      'Athletic Shoe',
      'Running Shoe',
      'Plimsoll Shoe',
      'Tennis Shoe',
      'Outdoor Shoe',
      'Rain Boot',
      'Durango Boot',
      'Snow Boot',
      'Wedge'
    ];
    let imgRender = () => {
      if (this.state.imgShow) {
        let imgSource = '/images/' + this.state.selectedFile.name;
        return (
          <img src={imgSource} alt='uploaded pic' className='imageArticle' />
        );
      }
    };
    let question = () => {
      let guess = '';
      if (this.state.questionRender === false) {
        return <h1> </h1>;
      } else {
        //const resource = fetchData('sweater.jpg');
        console.log(this.state.labelData);
        for (let i = 0; i < this.state.labelData.length; i++) {
          if (allowed.includes(this.state.labelData[i])) {
            guess = this.state.labelData[i];
            break;
          }
        }
        console.log(guess);
        console.log(this.state.colorData[0].label);
        let returnString = '';
        returnString = `${
          this.state.colorData[0].label
        } ${guess.toLowerCase()}?`;

        return <h1>{returnString}</h1>;
      }
    };
    return (
      <div className='wrapper'>
        <div>
          <Header />
        </div>

        <div className='overlay'>
          <h1>Upload an image of your outfit...</h1>
        </div>
        <div className='upload-btn-wrapper'>
          <input
            type='file'
            name='attachment'
            onChange={this.fileSelectedHandler}
          />
          <button className='btn'>{this.state.uploadText}</button>
        </div>
        <div className='uploadbuttonwrapper'>
          <button onClick={this.fileUploadHandler} className='uploadbutton'>
            Upload
          </button>
        </div>
        <div className='imageArticleDiv'>{imgRender()}</div>
        <div className='question'>{question()}</div>
      </div>
    );
  }
}

export default Home;
