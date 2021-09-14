import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-elements";
import { LocalizationContext } from '../components/LocalisationContext';

export default function ProfileScreen({ navigation }) {

    const { translations } = useContext(LocalizationContext);

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
    }, []);

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
                <Avatar
                    size="large"
                    rounded
                    title={userInfo.name.slice(0, 1)}
                    titleStyle={{color: 'white', fontWeight: 'bold'}}
                    activeOpacity={0.7}
                    avatarStyle={{backgroundColor: 'rgba(0, 87, 87, 0.2)'}}
                />
                <Text style={styles.heading}>{userInfo.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.bottom}>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.name}</Text>
                        <Text style={styles.field}>{userInfo.name}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.mobile}</Text>
                        <Text style={styles.field}>{userInfo.mobile}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.state}</Text>
                        <Text style={styles.field}>{location.state}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.district}</Text>
                        <Text style={styles.field}>{location.district}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.block}</Text>
                        <Text style={styles.field}>{location.block}</Text>
                    </View>
                </View>
            </ScrollView>
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
        paddingTop: 10,
        paddingBottom: 20,
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#005757',
    },
    bottom: {
        padding: 10,
    },
    component: {
        padding: 20,
        margin: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#5c5e5d',
        backgroundColor: '#f0f3e2',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fieldName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    field: {
        fontSize: 15,
        color: 'gray',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: '85%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#dfe4ea',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#00a8a8',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
