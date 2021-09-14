import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SupportScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Icon 
                    name="chevron-back" 
                    color='gray'
                    size={50}
                    onPress={() => {navigation.goBack()}}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.heading}>Support</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    header: {
        alignItems: 'center',
        paddingTop: 10
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#5c5e5d'
    },
})
