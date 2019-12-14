import PropTypes from 'prop-types';
/* eslint-disable no-undef, no-param-reassign,
                  import/prefer-default-export */
import React from 'react';
import $ from 'jquery';

export const WeatherFetcher = function () {
  const rootUrl = 'http://api.openweathermap.org/data/2.5';
  const appId = __WEATHER_API_KEY__;
  const defaultCity = 'San Francisco, CA';

  this.getLatestForecast = function (city) {
    city = city || defaultCity;
    return new Promise((resolve, reject) => {
      return $.ajax({
        url: `${rootUrl}/forecast`,
        method: 'GET',
        dataType: 'json',
        data: {
          q: city,
          appid: appId,
          mode: 'json',
        },
        success: resolve,
        error: reject,
      });
    });
  };

  return this;
};
