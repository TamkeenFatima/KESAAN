import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView,
  Alert
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { AuthContext } from '../components/context';
// import IMEI from 'react-native-imei';

export default function LoginScreen1({navigation}) {

  const os = DeviceInfo.getSystemName();
  const version = DeviceInfo.getSystemVersion();
  const model = DeviceInfo.getModel();
  // const imei = IMEI.getImei();

  const [info, setInfo] = useState({
    location_id: 0,
    sel_lang: '',
    user_name: '',
    user_mobile: '',
    mob_imei_no: '',
    mob_model: model,
    mob_os: os,
    os_version: version,
    registered_on: '',
  })

  useEffect(() => {
    let currentTime = new Date();
    currentTime = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds() + ', ' + currentTime.getDate() + '/' + (currentTime.getMonth()+1) + '/' + currentTime.getFullYear()
    setInfo({
      ...info,
      registered_on: currentTime,
    })
  }, [handleSubmit])

  const { register } = useContext(AuthContext);

  const handleSubmit = () => {
    if ( (info.user_name.length == 0) && (info.user_mobile.length == 0) ) {
      Alert.alert("Name and phone number field cannot be empty")
    }
    else if ( info.user_name.length == 0 ) {
      Alert.alert("Your name is required!")
    }
    else if ( info.user_mobile.length <10 ) {
      Alert.alert("Invalid mobile number. Please enter correct number.")
    }
    else {
      register(info);
    }
  }

  const checkName = (val) => {
    const letters = ['', ' ', 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', 'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ा',' ि', ' ी', ' ु', ' ू', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ', ' ृ', ' ॄ', ' ॢ', ' ॣ', ' े', ' ै', ' ो', ' ौ', ' ँ', ' ं', ' ः', ' ़', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'य', 'र', 'ल', 'ळ', 'व', 'ह', 'श', 'ष', 'स', 'ऱ', 'ऴ', 'ऍ', 'ऑ', 'ऎ', 'ऒ', ' ॅ', ' ॉ', ' ॆ', ' ॊ'];
    letters.forEach(char => {
      if ( char === val.slice(-1) ) {
        setInfo({
          ...info,
          user_name: val,
        })
      }
    });
  }

  const mobileNoCheck = (val) => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    for ( let i=0; i<numbers.length; i++ ) {
      if ( i == val.slice(-1) ) {
        setInfo({
          ...info,
          user_mobile: val,
        })
      }
    }
  }

  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../../assets/images/grass.png')}
        style={{
            flex: 1,
            }}
      >
      <View style={styles.container}>
        <Image
          style={styles.bigCircle}
          source={require('../../assets/images/grass.png')}
        />
        <Image
          style={styles.smallCircle}
          source={require('../../assets/images/grass.png')}
        />
        <ScrollView>
          <View style={styles.centerizedView}>
            <View style={styles.authBox}>
              <View style={styles.logoBox}>
                    <Image
                    style={{ width: 200, height: 50 , justifyContent:'center', alignItems:'center'}}
                    source={require('../../assets/images/Logo.png')}
                   />
              </View>
              <Text style={styles.registerTitleText}>Register</Text>
              <View style={styles.hr}></View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Language</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType='default'
                  textContentType='givenName'
                  onChangeText={(val) => {setInfo({...info, sel_lang: val})}}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="default"
                  textContentType='name'
                  maxLength={40}
                  onChangeText={(val) => {checkName(val)}}
                  value={info.user_name}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Mobile</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="number-pad"
                  textContentType='telephoneNumber'
                  maxLength={10}
                  onChangeText={(val) => {mobileNoCheck(val)}}
                  value={info.user_mobile}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>State</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="default"
                  textContentType='addressState'
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>District</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="default"
                  textContentType='addressState'
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Block</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="default"
                  textContentType='addressState'
                />
              </View>
      
              <TouchableOpacity
                style={styles.registerButton}
                onPress = {() => {handleSubmit()}}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> {
                    navigation.navigate('LogIn')
                }}
              >
                <Text style={styles.loginText}>
                  Already have an account? Login Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '2%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 200,
    height: 120,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  registerTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
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
  registerButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});