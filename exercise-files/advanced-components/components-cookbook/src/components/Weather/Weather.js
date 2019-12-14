import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';

import styles from './Weather.css';
import {WeatherFetcher} from 'util/WeatherFetcher';

class Weather extends React.Component {
  static propTypes = {
    storageKey: PropTypes.string,
    secondsToCache: PropTypes.number,
    city: PropTypes.string
  };

  static defaultProps = {
    city: 'San Francisco, CA',
    storageKey: 'cachedWeather',
    secondsToCache: 10
  };

  state = {
    currentWeather: localStorage.getItem(this.props.storageKey),
    refreshing: false,
    needsUpdate: true
  };

  componentWillMount() {
    this.weatherFetcher = new WeatherFetcher();

    this.setState({
      needsUpdate: this.contentNeedsRefresh()
    });
  }

  componentDidMount() {
    if (this.state.needsUpdate) {
      this.refreshWeather();
    }
  }

  contentNeedsRefresh = () => {
    const json = this.getCached();
    if (!(json && json.currentWeather)) {
      return true;
    }
    const lastCheckedAt = json.checkedAt;
    const sinceChecked = Math.round((Date.now() - lastCheckedAt) / 1000);
    return this.props.secondsToCache - sinceChecked < 0;
  };

  getCached = () => {
    const str = localStorage.getItem(this.props.storageKey);
    if (!str) {
      return {};
    }
    try {
      return JSON.parse(str);
    } catch (err) {
      console.log('An error has occurred getting cached weather', err);
      return {};
    }
  };

  refreshWeather = () => {
    // Some callback
    const that = this;
    const storageKey = this.props.storageKey;
    const secondsToCache = this.props.secondsToCache;
    const weatherFetcher = this.weatherFetcher;
    const city = this.props.city;

    this.setState(
      {
        refreshing: true
      },
      () => {
        weatherFetcher
          .getLatestForecast(city)
          .then(data => {
            localStorage.setItem(
              storageKey,
              JSON.stringify({
                checkedAt: Date.now(),
                weather: data
              })
            );
            that.setState(
              {
                refreshing: false,
                needsUpdate: false,
                currentWeather: data.list
              },
              that.setUpdateTimeout
            );
          })
          .catch(err => {
            console.log('An error has occurred fetching latest weather', err);
          });
      }
    );
  };

  setUpdateTimeout = () => {
    const that = this;
    const secondsToCache = this.props.secondsToCache;
    const city = this.props.city;

    setTimeout(() => {
      that.setState({
        needsUpdate: true
      });
    }, secondsToCache * 1000);
  };

  componentDidMount() {
    if (this.state.needsUpdate) {
      this.refreshWeather(this.props.city);
    }
  }

  renderNeedsUpdate = () => {
    return (
      <div className={styles.needsUpdate}>
        <button onClick={this.refreshWeather}>Update weather</button>
      </div>
    );
  };

  renderCurrentWeather = () => {
    // Should handle in a component
    const currentWeather = this.state.currentWeather;
    if (!currentWeather) {
      return <div>No weather yet</div>;
    }
    const latestWeather = currentWeather[0];
    const desc = latestWeather.weather && latestWeather.weather[0];
    return (
      <div>
        <span>Latest weather projection</span>
        <div>{desc && desc.description}</div>
      </div>
    );
  };

  render() {
    const needsUpdate = this.state.needsUpdate;
    const refreshing = this.state.refreshing;
    const currentWeather = this.state.currentWeather;

    if (refreshing) {
      return <div>Refreshing...</div>;
    }

    return (
      <div>
        {needsUpdate && this.renderNeedsUpdate()}
        {currentWeather && this.renderCurrentWeather()}
      </div>
    );
  }
}

module.exports = Weather;
