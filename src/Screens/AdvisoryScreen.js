import React, { useRef, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    useWindowDimensions,
    Animated,
    ScrollView
} from 'react-native';
import Advisory from '../../assets/Advisory';
import UserInfo from '../../assets/UserInfo';
import bgImg from '../components/BgImg';
import Header from '../components/Header';
import { LocalizationContext } from '../components/LocalisationContext';

export default function AdvisoryScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()

    const scrollY = useRef( new Animated.Value(0) ).current;
    let BgImg = '';
    return (
        <>
            <Header title={translations.Advisory.advisoryTitle} barColor='#009387' />
            <ScrollView
                pagingEnabled={true}
                initialPage={0}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scrollY,
                                },
                            },
                        },
                    ],
                    {useNativeDriver: false},
                )}
                scrollEventThrottle={1}
            >
                {Advisory.map((item) => {
                    if ( item.name == 'Weather advisory') {
                        BgImg = bgImg;
                    }
                    if ( item.name == 'Rice') {
                        BgImg = require('../../assets/images/rice.jpg');
                    }
                    else if ( item.name == 'Fodder') {
                        BgImg = require('../../assets/images/fodder.jpg');
                    }
                    else if ( item.name == 'Sugarcane') {
                        BgImg = require('../../assets/images/sugarcane.jpg');
                    }
                    else if ( item.name == 'Vegetables') {
                        BgImg = require('../../assets/images/vegetables.png');
                    }
                    else if ( item.name == 'Cattle') {
                        BgImg = require('../../assets/images/cattle.jpg');
                    }
                    else if ( item.name == 'General Advisory') {
                        BgImg = require('../../assets/images/general.jpg');
                    }

                    return (
                        <View
                            style={{width: windowWidth, height: windowHeight-195.2}}
                            key={item.id}
                        >
                            <ImageBackground
                            source={BgImg}
                            style={{
                                flex: 1,
                                }}
                            >
                                <View
                                    style={styles.container}
                                >
                                    <View>
                                        <Text style={styles.nameText}>{item.name}</Text>
                                    </View>
                                    <View style={styles.advisoryContainer}>
                                        <Text style={styles.advisoryText}>{item.advice}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>  
                    );
                })}
            </ScrollView>

            <View
                style={styles.dotWrapper}>
                {Advisory.map((item, index) => {
                    const width = scrollY.interpolate(
                        {
                            inputRange: [
                                (windowHeight-195.2) * (index-1),
                                (windowHeight-195.2) * index,
                                (windowHeight-195.2) * (index+1)
                            ],
                            outputRange: [
                                5, 12, 5
                            ],
                            extrapolate: 'clamp'
                        }
                    );
                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, {width}]}
                        />
                    )
                })}
            </View>
        </>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 20,
    },
    nameText: {
        color: '#fff',
        fontFamily: 'Courier',
        fontSize: 78,
    },
    advisoryContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderRadius: 20,
        padding: 20,
    },
    advisoryText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    dot: {
        height: 5,
        width: 5,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: '#fff',
    },
    dotWrapper: {
        position: 'absolute',
        top: 80,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
