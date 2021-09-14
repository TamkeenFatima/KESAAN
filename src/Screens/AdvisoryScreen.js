import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    useWindowDimensions,
    ScrollView,
    Alert,
} from 'react-native';
import bgImg from '../components/BgImg';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from '../components/LocalisationContext';

export default function AdvisoryScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()

    const [advisory, setAdvisory] = useState({
            adv_weather: {
                en: "",
                hi: "",
            },
            adv_rice: {
                en: "",
                hi: "",
            },
            adv_fodder: {
                en: "",
                hi: "",
            },
            adv_sugarcane: {
                en: "",
                hi: "",
            },
            adv_vegetables: {
                en: "",
                hi: "",
            },
            adv_cattle: {
                en: "",
                hi: "",
            },
            adv_gen: {
                en: "",
                hi: "",
            },
    });

    const [lang, setLang] = useState('');
    useEffect(async() => {
        let info;
        try {
            info = await AsyncStorage.getItem('userInfo')
        } catch(e) {
            console.log(e);
        }
        info = JSON.parse(info);

        let language;
        try {
            language = await AsyncStorage.getItem('appLanguage');
        } catch(e) {
            console.log(e);
        }
        setLang(language);

        getAdvisory(info.location_id)
    }, []);
    const lang2 = (lang === 'en') ? 'hi' : 'en';

    const getAdvisory = (id) => {
        let AdvisoryAPIURL = "http://10.0.2.2:80/api/get_advisory.php";
        
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let Data = {
            location_id: id,
            adv_date: new Date().toISOString().slice(0, 10),
        };

        fetch(
            AdvisoryAPIURL,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(Data)
            }
        )
        .then((response) => response.json())
        .then((response) => {
            setAdvisory({
                adv_weather: {
                    en: response.adv_weather_en,
                    hi: response.adv_weather_hi,
                },
                adv_rice: {
                    en: response.adv_rice_en,
                    hi: response.adv_rice_hi,
                },
                adv_fodder: {
                    en: response.adv_fodder_en,
                    hi: response.adv_fodder_hi,
                },
                adv_sugarcane: {
                    en: response.adv_sugarcane_en,
                    hi: response.adv_sugarcane_hi,
                },
                adv_vegetables: {
                    en: response.adv_vegetables_en,
                    hi: response.adv_vegetables_hi,
                },
                adv_cattle: {
                    en: response.adv_cattle_en,
                    hi: response.adv_cattle_hi,
                },
                adv_gen: {
                    en: response.adv_gen_en,
                    hi: response.adv_gen_hi,
                },
            });
        })
        .catch((error) => {
            Alert.alert("Error" + error);
        })
    }

    const keys = Object.keys(advisory);

    let BgImg = '';
    return (
        <>
            <Header title={translations.Advisory.advisoryTitle} barColor='#009387' />
            <ScrollView
                pagingEnabled={true}
                initialPage={0}
            >
                {keys.map((item, index) => {
                    if ( item === 'adv_weather') {
                        BgImg = bgImg;
                    }
                    if ( item === 'adv_rice') {
                        BgImg = require('../../assets/images/rice.jpg');
                    }
                    else if ( item === 'adv_fodder') {
                        BgImg = require('../../assets/images/fodder.jpg');
                    }
                    else if ( item === 'adv_sugarcane') {
                        BgImg = require('../../assets/images/sugarcane.jpg');
                    }
                    else if ( item === 'adv_vegetables') {
                        BgImg = require('../../assets/images/vegetables.png');
                    }
                    else if ( item === 'adv_cattle') {
                        BgImg = require('../../assets/images/cattle.jpg');
                    }
                    else if ( item === 'adv_gen') {
                        BgImg = require('../../assets/images/general.jpg');
                    }
                    let availLang;
                    advisory[item][lang] !== '' ? (availLang = lang) : (advisory[item][lang2] !== '' ? availLang = lang2 : availLang = '');

                    return (
                        availLang !== '' ? (
                            <View
                                style={{width: windowWidth, height: windowHeight-195.2}}
                                key={index}
                            >
                                <ImageBackground
                                source={img}
                                style={{
                                    flex: 1,
                                    }}
                                >
                                    <View
                                        style={styles.container}
                                    >
                                        <View>
                                            <Text style={styles.nameText}>{translations.Advisory[item]}</Text>
                                        </View>
                                        <View style={styles.advisoryContainer}>
                                            <Text style={styles.advisoryText}>{advisory[item][availLang]}</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        ) : null
                    );
                })}
            </ScrollView>
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
