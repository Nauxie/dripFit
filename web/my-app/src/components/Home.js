import React from 'react';
import axios from 'axios';
import Header from './Header';
import './Home.css';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  fileUploadHandler = async event => {
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
          'X-RapidAPI-Key': '874f581ecdmshcaaa8d2b93e629bp1a3bb8jsn4eac9af8bc5d'
        }
      }
    );
    console.log(response.data);
  };

  render() {
    return (
      <div className='wrapper'>
        <div>
          <Header />
        </div>

        <div className='overlay'>
          <p>upload a picture of your fit</p>
          <input
            name='image'
            placeholder='enter colors here...'
            type='file'
            value={this.state.value}
            onChange={this.fileSelectedHandler}
          />
          <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
      </div>
    );
  }
}

export default Home;
