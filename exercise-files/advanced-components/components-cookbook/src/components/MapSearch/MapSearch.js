import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './MapSearch.css';

class MapSearch extends React.Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    bounds: PropTypes.object,
    types: PropTypes.array,
    size: PropTypes.number
  };

  static defaultProps = {
    bounds: null,
    types: ['establishment'],
    size: 50
  };

  state = {value: ''};
  componentDidMount() {
    this.loadGoogleSearch();
  }
  componentDidUpdate() {
    this.loadGoogleSearch();
  }

  componentWillUnmount() {}

  loadGoogleSearch = () => {
    window._gapiInst.load(google => {
      const opts = {
        types: this.props.types
      };

      const node = ReactDOM.findDOMNode(this.refs.input);
      const autocomplete = new google.maps.places.Autocomplete(node, opts);

      if (this.props.bounds) {
        autocomplete.setBounds(this.props.bounds);
      } else {
        autocomplete.bindTo('bounds', this.props.map);
      }

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.setState({
          place: place,
          value: place.name
        });
      });

      this.autocomplete = autocomplete;
    });
  };

  handleChange = e => {
    e.preventDefault();

    this.setState({
      value: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const val = this.state.place || this.state.value;

    console.log('val: ', val);

    if (this.props.onSearch) {
      this.props.onSearch(val);
    }
  };

  render() {
    return (
      <div>
        <form className={styles.search} onSubmit={this.onSubmit}>
          <input
            type="string"
            placeholder="Find a location"
            size={this.props.size}
            value={this.state.value}
            ref="input"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default MapSearch;
