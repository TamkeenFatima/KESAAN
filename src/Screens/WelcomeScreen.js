import { styles } from 'ansi-colors';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Alert} from 'react-native';
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

class Welcome extends Component {
    render()
    {
        return(
                <View style = { [welcome.container, {flexDirection :'column'}] }>
                    <View style = {[welcome.header, {flex : 3,}]}>
                        <Text style = {welcome.headerText}>
                        Welcome to
                        </Text>
                        <Image
                        style={{ width: 200, height: 50 ,marginTop : 20,alignItems:'center'}}
                        source={require('../../assets/images/Logo.png')}
                         />
                        <Text style ={welcome.logodescription}>
                        <B>K</B>esaan <B>E</B>mpowerment through <B>S</B>atellite-based <B>A</B>gricultural <B>A</B>dvisory and <B>N</B>owcast
                        </Text>
                    </View>
                    <View style = { welcome.logbut}>
                    <TouchableOpacity style={welcome.registerButton}
                        onPress={()=> {
                            Alert.alert(
                            'Please REgister'
                        );
                    }}>
                        <Text style={welcome.registerText}>REGISTER</Text>
                    </TouchableOpacity>
                        <View style={welcome.bottom}>
                             <Text style ={welcome.bottomText}>
                                Terms & Conditions | Privacy Policy
                             </Text>
                        </View>
                    </View>
                </View>
        );
    }
}

const welcome = StyleSheet.create({
    container : {
        flex :1,
        backgroundColor : '#0A5E2AFF',
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
    logbut : {
        fontSize : 60,
        marginTop : 20,
        flex :2,
        backgroundColor : 'white',
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
    registerButton : {
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
      registerText : {
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

export default Welcome;