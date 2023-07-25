const request = require('request');
const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=e24d299ade5e9431273a3f29216880e7&query=' +
    latitude +
    ',' +
    longitude +
    '&units=m#';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to forecast service', undefined);
    } else if (body.error) {
      callback('unable to find the forecast of the given location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
