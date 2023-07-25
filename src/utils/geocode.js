const request = require('request');
const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoiaml0aGVuZHJhMjMxIiwiYSI6ImNsa2M0cmptYTBmbmYzZXBmYnV5Z2gwbXkifQ.F3qlIemOHB7qDSklVsxbMw&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to location service!', undefined);
    } else if (body.features.length === 0) {
      callback('unable to find the given location', undefined);
    } else {
      const data = body.features[0].center;
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
