import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { LocalizationContext } from '../components/LocalisationContext';

export default function LinksScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    return (
        <>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>{translations.linksTitle}</Text>
                </View>
                <View>
                    <Text style={styles.location}>{UserInfo.block}, {UserInfo.district}, {UserInfo.state}</Text>
                    <Text style={styles.date}>{UserInfo.date}</Text>
                </View>
            </View>
            <ImageBackground
                source={require('../../assets/images/useful-links.jpg')}
                style={{
                    flex: 1,
                    }}
            >
            <View style={styles.container}>
                <Hyperlink linkDefault={ true }>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>{translations.aws}:</Text>
                        <Text style={styles.linksText}>http://aws.imd.gov.in:8091</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>{translations.dehradun_met}:</Text>
                        <Text style={styles.linksText}>https://rmcnewdelhi.imd.gov.in/MET_CENTRES/MCDDN</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>{translations.amfu}:</Text>
                        <Text style={styles.linksText}>http://gkms.iitr.ac.in</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>{translations.crowdsource}:</Text>
                        <Text style={styles.linksText}>https://city.imd.gov.in/citywx/crowd/enter_th_datag.php</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>{translations.DAMINI}:</Text>
                        <Text style={styles.linksText}>https://play.google.com/store/apps/details?id=com.lightening.live.damini&hl=en.</Text>
                    </View>
                </Hyperlink>
            </View>
            </ImageBackground>
        </>
    )
}

const styles= StyleSheet.create({
    header: {
        backgroundColor: '#d02860',
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
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,237,244, 0.7)'
    },
    linkBox: {
        padding: 20,
    },
    sourceText: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    linksText: {
        color: 'blue',
        fontSize: 16,
        fontFamily: 'Courier New',
        textDecorationLine: 'underline'
    },
})
