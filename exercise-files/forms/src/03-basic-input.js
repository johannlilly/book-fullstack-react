import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "03-basic-input";

  onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.refs.name.value);
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
          />

          <input type='submit' />
        </form>
      </div>
    );
  }
};
