import React, { Component } from 'react';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      post: '',
      responseToPost: '',
    };

  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  async callApi() {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  async handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <nav className="mainNav">
          <h1 className="mainNavTitle">What App</h1>
        </nav>
        <form onSubmit={this.handleSubmit}>
          <h1 className="userNameLabel">Name:</h1>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;
