import React from 'react';

class App extends React.Component {
  state = {
    items: [],
    item: '',
  };

  onItemChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  addItem = (e) => {
    e.preventDefault();

    this.setState({
      items: this.state.items.concat(
        this.state.item
      ),
      item: '',
    });
  };

  render() {
    const submitDisabled = !this.state.item;
    return(
      <div
        className='ui text container'
        id='app'
      >
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.items.map((item, idx) => (
                <tr
                  key={idx}
                >
                  <td>{item}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <th>
                <form
                  className='ui form'
                  onSubmit={this.addItem}
                >
                <div className='field'>
                  <input
                    className='prompt'
                    type='text'
                    placeholder='Add item...'
                    value={this.state.item}
                    onChange={this.onItemChange}
                  />
                </div>
                <button
                  className='ui button'
                  type='submit'
                  disabled={submitDisabled}
                >
                  Add item
                </button>
                </form>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default App;
