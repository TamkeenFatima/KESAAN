import React, {useState} from 'react';
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
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default function LoginScreen1() {
  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
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
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="default"
                  textContentType='name'
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Mobile</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="number-pad"
                  textContentType='telephoneNumber'
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
      
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.loginText}>
                  Don't have an account? Login Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#0A5E2AFF',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#0A5E2AFF',
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