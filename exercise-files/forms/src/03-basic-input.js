import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "03-basic-input";
  state = {
    name: '',
    names: [],
  };

  onFormSubmit = (evt) => {
    const name = this.refs.name.value; // access value of the text field
    const names = [ ...this.state.names, name ];
    this.setState({ names: names });
    this.refs.name.value = '';
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit} id="signUp" name="signUp">
          <input
            placeholder='Name'
            form="signUp"
            value={this.state.name}
            onChange={this.onNameChange}
          />

          <input type='submit' />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
            { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
          </ul>
        </div>
      </div>
    );
  }
};
