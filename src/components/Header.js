import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ title, barColor, locationEnabled=true }) {

    
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

    useEffect(async() => {
        let info;
        try {
            info = await AsyncStorage.getItem('userInfo')
        } catch(e) {
            console.log(e);
        }
        info = JSON.parse(info);
        getLocation(info.location_id);
    }, [])

    return (
        <View style={[styles.header, {backgroundColor: barColor}]}>
            <View>
                <Text style={styles.heading}>{title}</Text>
            </View>
            {locationEnabled ? (
                <View>
                    <Text style={styles.location}>{location.block}, {location.district}, {location.state}</Text>
                    <Text style={styles.date}>{new Date().toDateString()}</Text>
                </View>
             ) : null}
        </View>
    )
}

const styles=StyleSheet.create({
    header: {
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    heading: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    location: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    date: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
})
