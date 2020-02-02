import React from 'react';
import axios from 'axios';
import Header from './Header';
import './Home.css';
import allowed from './allowedArticles';
import rgbHex from 'rgb-hex';
import namer from 'color-namer';
import hexRgb from 'hex-rgb';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploadText: 'Choose image',
      questionRender: false,
      labelData: [],
      colorData: [],
      imgShow: false,
      userInput: false,
      articleGuess: '',
      type: '',
      tags: '',
      likeColors: []
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleYesClick = () => {
    this.setState({ userInput: true });
    let hexColor = this.state.colorData[0].color;
    console.log(hexColor);
    let pureRgb = hexRgb(hexColor);
    let rgb = [pureRgb.red, pureRgb.green, pureRgb.blue];
    console.log(rgb);
    axios
      .post('https://cors-anywhere.herokuapp.com/http://colormind.io/api/', {
        input: [rgb, 'N', 'N', 'N', 'N'],
        model: 'default'
      })
      .then(data => {
        console.log(data.data);
        this.setState({ likeColors: data.data.result });
      });
  };

  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }
  handleTagChange(event) {
    this.setState({ tags: event.target.value });
  }
  handleSubmit(event) {
    let hexLikes = this.state.likeColors.map(rgbArr => rgbHex(...rgbArr));
    console.log(hexLikes);
    let nameColorLikes = hexLikes.map(hex => namer('#' + hex));
    console.log(nameColorLikes);
    let onlyNames = nameColorLikes.map(obj => obj.basic[0].name);
    console.log(onlyNames);

    let guess = '';
    for (let i = 0; i < this.state.labelData.length; i++) {
      if (allowed.includes(this.state.labelData[i])) {
        guess = this.state.labelData[i];
        break;
      }
    }
    axios
      .post('http://localhost:3001/sendData', {
        articleClassification: guess,
        color: this.state.colorData[0].label,
        colorGoesWith: onlyNames.slice(3, 5),
        type: this.state.type,
        tags: this.state.tags.split(','),
        filename: this.state.selectedFile.name
      })
      .then(response => console.log(response));
  }

  render() {
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
        for (let i = 0; i < this.state.labelData.length; i++) {
          if (allowed.includes(this.state.labelData[i])) {
            guess = this.state.labelData[i];
            break;
          }
        }

        let returnString = '';
        returnString = `${
          this.state.colorData[0].label
        } ${guess.toLowerCase()}?`;

        return (
          <div>
            <h1>{returnString}</h1>
            <div>
              <button className='uploadbutton2' onClick={this.handleYesClick}>
                Yes
              </button>{' '}
              <button className='uploadbutton2' onClick={this.handleNoClick}>
                No
              </button>
            </div>
          </div>
        );
      }
    };

    let finalSave = () => {
      if (this.state.userInput) {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>
                  Type:
                  <input
                    className='finalInput'
                    type='text'
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    placeholder='Ex: Top, Bottom, etc.'
                  />
                </label>
              </div>
              <div>
                <label>
                  Tags:
                  <input
                    className='finalInput'
                    type='text'
                    value={this.state.tags}
                    onChange={this.handleTagChange}
                    placeholder='Ex: Winter, Casual, etc.'
                  />
                </label>
              </div>

              <input
                type='submit'
                value='Save to wardrobe'
                className='uploadbutton3'
              />
            </form>
          </div>
        );
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
        <div className='question'>{finalSave()}</div>
      </div>
    );
  }
}

export default Home;
