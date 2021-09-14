import AsyncStorage from '@react-native-async-storage/async-storage';

(async() => {
    let weatherType;
    let BgImg;
    try {
        weatherType = await AsyncStorage.getItem('weatherType');
        if ( weatherType == 'Sunny') {
            BgImg = require('../../assets/images/sunny.png');
        }
        else if ( weatherType == 'Rainy') {
            BgImg = require('../../assets/images/rain.png');
        }
        else if ( weatherType == 'Cloudy') {
            BgImg = require('../../assets/images/cloudy.png');
        }
        else if ( weatherType == 'Night') {
            BgImg = require('../../assets/images/night.jpg');
        }
    } catch(e) {
        console.log(e);
    }
    global.BgImg = BgImg;
})()


let bgImg = global.BgImg;

export default bgImg;
