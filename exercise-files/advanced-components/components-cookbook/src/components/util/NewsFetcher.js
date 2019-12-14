import PropTypes from 'prop-types';
import React from 'React';
import $ from 'jquery';

export const NewsFetcher = function (appId) {
  const rootUrl = 'http://api.nytimes.com/svc';
  const defaultKeyword = 'politics';

  this.fetchArticles = function (keyword, opts) {
    opts = opts || {
      page: 1,
    };
    return $.ajax({
      url: `${rootUrl}/search/v2/articlesearch.json`,
      method: 'GET',
      dataType: 'json',
      data: {
        'q': keyword,
        'api-key': appId,
        'mode': 'json',
        'sort': 'newest',
        ...opts,
      },
    }).then(resp => resp.response.docs);
  };

  return this;
};
