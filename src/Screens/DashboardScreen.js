import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function DashboardScreen({navigation}) {
    return (
        <View>
            <Button
                align="right"
                labelStyle={{fontSize: 20}}
                onPress={() => navigation.navigate("Feedback")}>
                Feedback</Button>
            <Text>Weather Today</Text>
        </View>
    )
}
