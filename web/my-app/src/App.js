import React from 'react';
import './App.css';

class App extends React.Component {
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
  fileUploadHandler = () => {};

  render() {
    return (
      <div>
        Please upload a picture of your fit
        <form>
          <input
            placeholder='enter colors here...'
            type='file'
            value={this.state.value}
            onChange={this.fileSelectedHandler}
          />
          <button onClick={this.fileUploadHandler}>Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
