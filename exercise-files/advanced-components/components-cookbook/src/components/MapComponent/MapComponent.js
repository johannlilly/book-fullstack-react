import PropTypes from 'prop-types';
/* eslint-disable array-callback-return,no-underscore-dangle,no-undef,
   react/no-unused-prop-types, react/no-did-update-set-state,
   react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleApi from '../util/GoogleApi';

import styles from './MapComponent.css';

window._gapiInst = new GoogleApi({
  apiKey: __GOOGLE_API_KEY__,
  libraries: ['places']
});

class MapComponent extends React.Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    zoom: PropTypes.number,
    place: PropTypes.object,
    markers: PropTypes.array
  };

  static defaultProps = {
    lat: 37.773972,
    lng: -122.431297,
    zoom: 10,
    markers: [
      {lat: 37.773972, lng: -122.431297, title: 'San Francisco'},
      {lat: 37.8719, lng: -122.2585, title: 'Berkeley, CA'}
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      loading: true
    };

    this.renderLoading = this.renderLoading.bind(this);
    this.loadGoogleMap = this.loadGoogleMap.bind(this);
  }

  componentDidMount() {
    this.loadGoogleMap();
  }

  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) {
      this.setState(
        {
          map: null
        },
        this.loadGoogleMap
      );
    }
  }

  loadGoogleMap = () => {
    if (this.state.map) {
      return;
    }
    window._gapiInst.load(google => {
      const maps = google.maps;

      const mapRef = this.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const center = new maps.LatLng(this.props.lat, this.props.lng);

      this.map = new google.maps.Map(node, {
        center: center,
        zoom: this.props.zoom
      });

      // Load markers
      this.props.markers.map(o => {
        const {lat, lng, title} = o;
        if (lat && lng) {
          const pos = new maps.LatLng(lat, lng);
          const marker = new maps.Marker({
            position: pos,
            title: title
          });

          marker.setMap(this.map);
        }
      });

      setTimeout(() => {
        this.setState({
          map: this.map,
          loading: false
        });
      }, 0);
    });
  };

  renderLoading = () => {
    if (!this.state.loading) {
      return null;
    }
    return <i className="fa fa-spinner fa-spin" />;
  };

  render() {
    return (
      <div className={styles.mapContainer}>
        {this.renderLoading()}
        <div className={styles.map} ref={map => (this.map = map)} />
      </div>
    );
  }
}

export default MapComponent;
