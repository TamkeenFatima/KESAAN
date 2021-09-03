import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image,Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LocalizationContext } from '../components/LocalisationContext';

const B = (props) => <Text style={{fontWeight: 'bold', fontSize: 30}}>{props.children}</Text>
const I = (props) => <Text style={{fontStyle: 'italic'}}>{props.children}</Text>

export default function Welcome ({navigation}) {
    const { translations } = useContext(LocalizationContext)
    return(
            <ImageBackground
                source={require('../../assets/images/grass.png')}
                style={{
                    flex: 1,
                    }}
            >
                <View style = { [styles.container, {flexDirection :'column'}] }>
                    <View style = {[styles.header, {flex : 3,}]}>
                        <Text style = {styles.headerText}><B>{translations.Welcome.welcomeText}</B></Text>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/Logo.png')}
                        />
                        <Text style = {{
                            fontSize : 25,
                            marginTop : 30,
                            fontFamily : 'times new roman',
                            color:'white',
                        }}>
                            <I>{translations.Welcome.app}</I>
                        </Text>
                        <Text style ={styles.logodescription}>
                            {translations.Welcome.appDescription}
                        </Text>
                    </View>
                    <Animatable.View style = { styles.card} animation = 'fadeInUpBig'>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> {
                                    navigation.navigate('Register')
                            }}>
                                <Text style={styles.buttonText}>{translations.Welcome.registerButton}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> {
                                    navigation.navigate('LogIn')
                            }}>
                                <Text style={styles.buttonText}>{translations.Welcome.loginButton}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottom}>
                                <Text style ={styles.bottomText}>
                                {translations.Welcome.termsConditions}
                                </Text>
                        </View>
                    </Animatable.View>
                    </View>
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    header : {
        alignItems : 'center',
        color:'#FFE77AFF',
    },
    headerText : {
        fontSize : 30,
        marginTop : 60,
        fontFamily : 'times new roman',
        color:'white',
    },
    logo: {
        width: 400,
        height: 100,
        marginTop : 20,
        alignItems:'center',
        justifyContent: 'center'
    },
    card : {
        fontSize : 60,
        marginTop : 20,
        flex: 2,
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 50,
        borderTopRightRadius :50,
    },
    logodescription : {
        fontSize : 24,
        marginTop : 55,
        fontFamily : 'times new roman' ,
        textAlign : 'center',
        paddingHorizontal : 5,
        lineHeight : 35,
        color:'white',
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: "space-around"
    },
    button : {
        display : 'flex',
        alignItems : 'center',
        backgroundColor :'#B33771',
        borderRadius : 1000,
        elevation :  2,
        shadowColor : '#000',
        shadowOffset : {width :2, height : 2},
        shadowOpacity : 0.25,
        shadowRadius : 3.5,
        paddingHorizontal: 80,
        paddingVertical : 18,
        marginHorizontal : 60,
        marginTop : 70,
    },
    buttonText : {
        color: '#fff',
        fontWeight : 'bold',
        fontFamily : 'times new roman' ,
        fontSize:20 ,
    },
    bottomText : {
        fontSize :20,
        fontWeight : 'bold',
        position :'absolute',
        bottom :20,
        fontFamily : 'times new roman' ,
    },
    bottom:{
        alignItems:'center',
        flex: 1,
    }

});
