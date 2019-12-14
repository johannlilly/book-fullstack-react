// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"  async defer></script>

const Loader = function(opts) {
  opts = opts || {};

  const apiKey = opts.apiKey;
  const libraries = opts.libraries || ['places'];
  const client = opts.client;
  const URL = 'https://maps.googleapis.com/maps/api/js';

  const googleVersion = opts.version || '3';
  const CALLBACK_NAME = '__gapi_api_provider_init__';

  let script = null;
  let google = (window.google = null);
  let loading = false;
  const channel = null;
  const language = null;
  const region = null;

  let callbacks = [];
  const onLoadEvents = [];

  this.load = function(fn) {
    if (google === null) {
      if (loading === true) {
        if (fn && typeof fn === 'function') {
          callbacks.push(fn);
        }
      } else {
        loading = true;
        window[CALLBACK_NAME] = () => this.ready(fn);
        this.createLoader();
      }
    } else if (fn) {
      fn(google);
    }
  };

  this.createLoader = () => {
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.createGoogleUrl();

    document.body.appendChild(script);
  };

  this.ready = fn => {
    loading = false;
    if (google === null) {
      google = window.google;
    }

    onLoadEvents.map(fn => fn(google));

    if (fn) {
      fn(google);
    }

    callbacks.map(fn => fn(google));
    callbacks = [];
  };

  this.createGoogleUrl = () => {
    const url = URL;
    const params = {
      key: apiKey,
      callback: CALLBACK_NAME,
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region
    };

    const paramStr = Object.keys(params)
      .filter(k => !!params[k])
      .map(k => `${k}=${params[k]}`)
      .join('&');

    return `${url}?${paramStr}`;
  };

  this.onLoad = fn => onLoadEvents.push(fn);

  return this;
};

export default Loader;
