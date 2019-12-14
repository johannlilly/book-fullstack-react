/* eslint-disable prefer-template, new-cap */
import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import camelcaseKeys from 'camelcase-keys';
import btoa from 'btoa';
import path from 'path';
import fs from 'fs';

// Credentials for Spotify
const SPOTIFY_CLIENT_ID = '6518e61ac2a54a968ad5db5fc9d4806f';
const SPOTIFY_CLIENT_SECRET = '24492f0774a0437181877887cb68ac9e';
const BASE_64_ENCODED_CLIENT_CREDENTIALS = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

const getFirstImageUrl = (images) => (
  images && images[0] && images[0].url
);

// Makes the artist page more interesting by removing albums that are dupes
// like deluxe editions, remasters, etc.
const filterDupes = (albums) => (
  albums.reduce((memo, album) => {
    if (!memo.find((m) => m.name === album.name)) {
      return memo.concat(album);
    } else {
      return memo;
    }
  }, [])
);

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log('Error communicating with Spotify:');
    console.log(error);
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

function parseAlbum(album) {
  return {
    id: album.id,
    tracks: album.tracks && album.tracks.items.map((i) => parseTrack(i)),
    artist: parseArtist(album.artists[0]),
    year: album.releaseDate && album.releaseDate.slice(0, 4),
    imageUrl: getFirstImageUrl(album.images),
    name: album.name.replace(/\s\(.+\)$/, ''),
  };
}

function parseArtist(artist) {
  return {
    imageUrl: getFirstImageUrl(artist.images),
    name: artist.name,
    id: artist.id,
  };
}

function parseTrack(track) {
  return {
    albumImage: track.album && getFirstImageUrl(track.album.images),
    name: track.name,
    durationMs: track.durationMs,
    id: track.id,
    trackNumber: track.trackNumber,
    previewUrl: track.previewUrl,
  };
}

const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';

const SpotifyClient = {

  _getWithToken(url, token) {
    return fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(checkStatus)
      .then(parseJson)
      .then((data) => camelcaseKeys(data, { deep: true }));
  },

  _get(url) {
    if (this.token) {
      return this._getWithToken(url, this.token)
    } else {
      return this._getApiToken().then((token) => (
        this._getWithToken(url, token)
      ));
    }
  },

  _getApiToken() {
    return fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${BASE_64_ENCODED_CLIENT_CREDENTIALS}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(checkStatus)
      .then(parseJson)
      .then((json) => json.access_token)
      .then((token) => this.token = token)
  },

  getAlbum(albumId) {
    return this._get(
      SPOTIFY_BASE_URI + '/albums/' + albumId
    ).then((data) => parseAlbum(data));
  },

  getAlbums(albumIds) {
    return this._get(
      SPOTIFY_BASE_URI + '/albums?ids=' + albumIds.join(',')
    ).then((data) => (
      data.albums.map((a) => parseAlbum(a))
    ));
  },

  getArtist(artistId) {
    return this._get(
      SPOTIFY_BASE_URI + '/artists/' + artistId
    ).then((data) => parseArtist(data));
  },

  getArtistTopTracks(artistId) {
    const url = URI(
      SPOTIFY_BASE_URI + '/artists/' + artistId + '/top-tracks'
    ).query({ country: 'us' });

    return this._get(url).then((data) => (
      data.tracks.map((t) => parseTrack(t))
    ));
  },

  getArtistAlbums(artistId) {
    const url = (
      SPOTIFY_BASE_URI + '/artists/' + artistId + '/albums?album_type=album'
    );

    return this._get(url).then((data) => (
      data.items.map((a) => parseAlbum(a))
    ));
  },

  getArtistAlbumsDetailed(artistId) {
    return this.getArtistAlbums(artistId)
             .then((albums) => this.getAlbums(
               albums.map((a) => a.id)
             ));
  },

  getArtistDetailed(artistId) {
    return Promise.all([
      this.getArtist(artistId),
      this.getArtistTopTracks(artistId),
      this.getArtistAlbumsDetailed(artistId),
    ]).then(([ artist, topTracks, albums ]) => ({
      artist,
      topTracks,
      albums: filterDupes(albums),
    }));
  },
}

export default SpotifyClient;
