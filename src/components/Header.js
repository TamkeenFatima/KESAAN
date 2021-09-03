import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Header({ title, barColor, locationEnabled=true }) {
    return (
        <View style={[styles.header, {backgroundColor: barColor}]}>
            <View>
                <Text style={styles.heading}>{title}</Text>
            </View>
            {locationEnabled ? (
                <View>
                    <Text style={styles.location}>{UserInfo.block}, {UserInfo.district}, {UserInfo.state}</Text>
                    <Text style={styles.date}>{UserInfo.date}</Text>
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
