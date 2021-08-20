import React from 'react';
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Weather from '../../assets/Weather';
import UserInfo from '../../assets/UserInfo';
import { Moon, Rain, Sun, Cloud } from 'svg';
import bgImg from '../components/BgImg';

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

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.heading}>Weather Today</Text>
            </View>
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
                            <Text style={styles.location}>{UserInfo.block}, {UserInfo.district}, {UserInfo.state}</Text>
                            <Text style={styles.time}>{UserInfo.date}</Text>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row',}}>
                                <View>
                                    <Text style={styles.temperature}>{Weather.temperature}</Text>
                                </View>
                                <View style={{paddingLeft: 20, paddingTop: 20}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="caret-up" color='#ee8755' size={40} />
                                        <Text style={[styles.temperature, {fontSize: 30}]}>{Weather.maxTemperature}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="caret-down" color='#55d3ee' size={40} />
                                        <Text style={[styles.temperature, {fontSize: 30}]}>{Weather.minTemperature}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {weatherIcon(Weather.weatherType)}
                                <Text style={styles.weatherType}>   {Weather.weatherType}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>Wind</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{Weather.wind}</Text>
                            <Text style={styles.detailsText}>Km/hr</Text>
                            <View style={styles.bar}>
                                <View style={{width: Weather.wind/2, height: 5, backgroundColor: '#69F0AE'}} />
                            </View>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', marginRight: 20, borderRightWidth: 1}} />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>Rain</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{Weather.rain}</Text>
                            <Text style={styles.detailsText}>%</Text>
                            <View style={styles.bar}>
                                <View style={{width: Weather.rain/2, height: 5, backgroundColor: '#F44336'}} />
                            </View>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', marginRight: 20, borderRightWidth: 1}} />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>Humidity</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{Weather.humidity}</Text>
                            <Text style={styles.detailsText}>%</Text>
                            <View style={styles.bar}>
                                <View style={{width: Weather.humidity/2, height: 5, backgroundColor: '#F44336'}} />
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
    header: {
        backgroundColor: '#897396',
        padding: 15,
    },
    heading: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
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