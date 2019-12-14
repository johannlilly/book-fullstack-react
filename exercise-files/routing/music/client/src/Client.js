/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
import fetch from 'isomorphic-fetch';

const LOCAL_STORAGE_KEY = 'fsr-spotify-fake-auth';

// There are risks with using localStorage for API tokens in a production
// application. You open yourself up to XSS attacks. If malicious
// JavaScript makes it into your app, that JavaScript will have access
// to localStorage and therefore any sensitive tokens.

// For more info on token management, see this article:
// https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    this.subscribers = [];

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (this.token) {
        this.isTokenValid().then((bool) => {
          if (!bool) {
            this.token = null;
          }
        });
      }
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.isLoggedIn()));
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  isTokenValid() {
    // See note about tokens above
    const url = '/api/check_token?token=' + this.token;
    return fetch(url, {
      method: 'get',
      headers: {
        accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => json.valid === true);
  }

  getAlbum(albumId) {
    return this.getAlbums([ albumId ], albums => albums[0]);
  }

  getAlbums(albumIds) {
    // See note about tokens above
    const url = (
      '/api/albums?ids=' + albumIds.join(',') + '&token=' + this.token
    );
    return fetch(url, {
      method: 'get',
      headers: {
        accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJson);
  }

  login() {
    return fetch('/api/login', {
      method: 'post',
      headers: {
        accept: 'application/json',
      },
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => this.setToken(json.token));
  }

  logout() {
    this.removeToken();
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJson(response) {
    return response.json();
  }
}

export const client = new Client();
