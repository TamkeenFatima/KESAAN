import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Moon, Rain, Sun, Cloud } from 'svg';
import bgImg from '../components/BgImg';
import Header from '../components/Header';
import { LocalizationContext } from '../components/LocalisationContext';

const weatherIcon = (weatherType) => {
    if (weatherType == 'Sunny') {
        return <Sun width={34} height={34} fill="#fff" />
    }
    if (weatherType == 'Rainy') {
        return <Rain width={34} height={34} fill="#fff" />
    }
    if (weatherType == 'Cloudy') {
        return <Cloud width={34} height={34} fill="#fff" />
    }
    if (weatherType == 'Night') {
        return <Moon width={34} height={34} fill="#fff" />
    }
}

export default function HomeScreen({navigation}) {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()
    const { translations } = useContext(LocalizationContext);

    const [weather, setWeather] = useState({
        cur_temp: null,
        max_temp: null,
        min_temp: null,
        rain: null,
        humidity: null,
        wind: null,
        weather_type: '',
    });

    const [location, setLocation] = useState({
        state: '',
        district: '',
        block: ''
    });

    const getLocation = (id) => {
        let LocationAPIURL = "http://10.0.2.2:80/api/get_location.php";
        
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let Data = {
            location_id: id,
        };

        fetch(
            LocationAPIURL,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(Data)
            }
        )
        .then((response) => response.json())
        .then((response) => {
            setLocation({
                state: response.state_name,
                district: response.district_name,
                block: response.block_name,
            });
        })
        .catch((error) => {
            Alert.alert("Error" + error);
        })
    }

    const[userInfo, setUserInfo] = useState({
        name: '',
        mobile: '',
        location_id: '',
    });

    const getWeather = (id) => {
        let WeatherAPIURL = "http://10.0.2.2:80/api/get_weather.php";
        
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let Data = {
            location_id: id,
            weather_date: new Date().toISOString().slice(0, 10),
        };

        fetch(
            WeatherAPIURL,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(Data)
            }
        )
        .then((response) => response.json())
        .then((response) => {
            setWeather({
                cur_temp: response.cur_temp + '\u2103',
                max_temp: response.max_temp + '\u2103',
                min_temp: response.min_temp + '\u2103',
                rain: response.rain,
                humidity: response.humidity,
                wind: response.wind,
                weather_type: response.weather_type,
            });
        })
        .catch((error) => {
            Alert.alert("Error" + error);
        })
    }

    useEffect(async() => {
        let info;
        try {
            info = await AsyncStorage.getItem('userInfo')
        } catch(e) {
            console.log(e);
        }
        info = JSON.parse(info);
        setUserInfo({...info});
        getLocation(info.location_id);
        getWeather(info.location_id);
    }, [])

    return (
        <>
            <Header title={translations.Home.weatherTitle} barColor='#897396' locationEnabled={false} />
            <ImageBackground
                source={bgImg}
                style={{
                    flex: 1,
                    }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: 20,
                    }}
                >
                    <View style={styles.topContainer}>
                        <View>
                            <Text style={styles.location}>{location.block}, {location.district}, {location.state}</Text>
                            <Text style={styles.time}>{new Date().toDateString()}</Text>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row',}}>
                                <View>
                                    <Text style={styles.temperature}>{weather.cur_temp}</Text>
                                </View>
                                <View style={{paddingLeft: 20, paddingTop: 20}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="caret-up" color='#ee8755' size={40} />
                                        <Text style={[styles.temperature, {fontSize: 30}]}>{weather.max_temp}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="caret-down" color='#55d3ee' size={40} />
                                        <Text style={[styles.temperature, {fontSize: 30}]}>{weather.min_temp}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {weatherIcon(weather.weatherType)}
                                <Text style={styles.weatherType}>   {weather.weatherType}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>{translations.Home.wind}</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{weather.wind}</Text>
                            <Text style={styles.detailsText}>{translations.Home.wind_unit}</Text>
                            <View style={styles.bar}>
                                <View style={{width: weather.wind/2, height: 5, backgroundColor: '#69F0AE'}} />
                            </View>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', marginRight: 20, borderRightWidth: 1}} />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>{translations.Home.rain}</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{weather.rain}</Text>
                            <Text style={styles.detailsText}>%</Text>
                            <View style={styles.bar}>
                                <View style={{width: weather.rain/2, height: 5, backgroundColor: '#F44336'}} />
                            </View>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', marginRight: 20, borderRightWidth: 1}} />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>{translations.Home.humidity}</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{weather.humidity}</Text>
                            <Text style={styles.detailsText}>%</Text>
                            <View style={styles.bar}>
                                <View style={{width: weather.humidity/2, height: 5, backgroundColor: '#F44336'}} />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FeedbackButton: {
        backgroundColor: '#897396',
        height: 50,
        width: 100,
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    FeedbackButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    topContainer: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'space-between'
    },
    location: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    time: {
        color: '#fff',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    temperature: {
        color: '#fff',
        fontFamily: 'Courier',
        fontSize: 85,
    },
    weatherType: {
        color: '#fff',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 34,
    },
    bottomContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderRadius: 20,
        padding: 20,
    },
    detailsText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    bar: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});