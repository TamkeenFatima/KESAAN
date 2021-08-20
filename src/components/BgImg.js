import Weather from '../../assets/Weather';

if ( Weather.weatherType == 'Sunny') {
    bgImg = require('../../assets/images/sunny.png');
}
else if ( Weather.weatherType == 'Rainy') {
    bgImg = require('../../assets/images/rain.png');
}
else if ( Weather.weatherType == 'Cloudy') {
    bgImg = require('../../assets/images/cloudy.png');
}
else if ( Weather.weatherType == 'Night') {
    bgImg = require('../../assets/images/night.jpg');
}

export default bgImg;
