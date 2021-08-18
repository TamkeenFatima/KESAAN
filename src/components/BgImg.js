import Weather from '../../assets/Weather';

if ( Weather.weatherType == 'Sunny') {
    bgImg = require('../../assets/png/sunny.png');
}
else if ( Weather.weatherType == 'Rainy') {
    bgImg = require('../../assets/png/rain.png');
}
else if ( Weather.weatherType == 'Cloudy') {
    bgImg = require('../../assets/png/cloudy.png');
}
else if ( Weather.weatherType == 'Night') {
    bgImg = require('../../assets/png/night.jpg');
}

export default bgImg;
