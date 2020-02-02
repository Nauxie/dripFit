import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const vision = require('@google-cloud/vision');

class Test extends React.Component {
  handleAPICall = async () => {
    // Imports the Google Cloud client library

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection(
      '/Users/abhinav/Desktop/screenshots/Everlane-Inline-ReNew_23.jpg'
    );
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  };
  render() {
    return (
      <div>
        <button onClick={this.handleAPICall}></button>
      </div>
    );
  }
}

export default Test;
