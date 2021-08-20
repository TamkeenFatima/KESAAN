import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import UserInfo from '../../assets/UserInfo';

export default function FeedbackScreen({navigation}) {
    return (
        <>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>Feedback</Text>
                </View>
                <View>
                    <Text style={styles.location}>{UserInfo.block}, {UserInfo.district}, {UserInfo.state}</Text>
                    <Text style={styles.date}>{UserInfo.date}</Text>
                </View>
            </View>
        </>
    );
}

const styles=StyleSheet.create({
    header: {
        backgroundColor: '#d0b206',
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