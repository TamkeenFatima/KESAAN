import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AirbnbRating } from 'react-native-ratings';
import { CheckBox } from 'react-native-elements';
import Header from '../components/Header';
import { LocalizationContext } from '../components/LocalisationContext';

export default function FeedbackScreen({navigation}) {

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
            setFeedback({
                ...feedback,
                state_name: response.state_name,
                district_name: response.district_name,
                block_name: response.block_name,
            })
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
        setFeedback({
            ...feedback,
            location_id: info.location_id,
            farmer_name: info.name,
            mobile_num: info.mobile,
        });
        getLocation(info.location_id);
    }, [])

    const { translations } = useContext(LocalizationContext);

    const keys = Object.keys(translations.Feedback.form);

    const [feedback, setFeedback] = useState({
        location_id: userInfo.location_id,
        farmer_name: userInfo.name,	
        state_name: location.state,
        district_name: location.district,
        block_name: location.block,
        mobile_num: userInfo.mobile,
        age: 0,
        gender: '',
        education: '',
        landholding_type: '',
        farming_type: '',
        landholding_area: '',
        wheat_area: '',
        rice_area: '',
        sugarcane_area: '',
        mustard_area: '',
        maize_area: '',
        potato_area: '',
        fodder_area: '',
        vegetable_area: '',
        animal_husbandry: '',
        poultry_farming: '',
        fish_farming: '',
        horticultural_crops: '',
        bulletin_received: '',
        sources: '',
        bulletin_timely_issued: '',	
        feedback_for_bulletin_date: new Date().toISOString().slice(0, 10),
        bulletin_useful: '',	
        bulletin_not_useful: '',
        advice_not_useful: '',
        useful_agri_operations: '',
        other_info_req: '',
        how_much_useful: '',
        shared_w_others: '',
        economic_benefits: '',
        avg_production_lost: '',
        ratings: 0,
    })

    const radioBtn = ( data ) => {
        return (
            <RadioButtonRN
                data={translations.Feedback.form[data].options}
                selectedBtn={(e) => {
                    let value = {...feedback};
                    value[data] = e.label;
                    if (data === 'gender') {
                        value[data] = value[data].charAt(0);
                    }
                    setFeedback({...value});
                    // console.log(feedback);
                }}
                activeColor='#d0b206'
                icon={
                    <Icon
                        name="check-circle"
                        size={25}
                        color="#d0b206"
                    />
                }
            />
        )
    }

    const [checkbox, setCheckbox] = useState({
        animal_husbandry: [],
        horticultural_crops: [],
        sources: [],
        useful_agri_operations: [],
    });

    function handleCheckboxPress (field, value, checked) {
        if(checked) {
            const newValue = checkbox[field].filter(
                (x) => x!==value
            );
            const newCheckbox = { ...checkbox }
            newCheckbox[field] = newValue;
            setCheckbox({ ...newCheckbox })
        }
        else {
            const newValue = [
                ...checkbox[field],
                value
            ]
            const newCheckbox = { ...checkbox }
            newCheckbox[field] = newValue;
            setCheckbox( {...newCheckbox} )
        }
        const newFeedback = { ...feedback };
        for (let key in checkbox) {
            newFeedback[key] = checkbox[key].join('&');
        }
        setFeedback({ ...newFeedback });
    }

    const handleTextInputChange = (val, item) => {
        const newValue = { ...feedback };
        newValue[item] = val;
        setFeedback({...newValue});
    }

    const [isSelected, setSelection] = useState({
        age: false,
        other_info_req: false,
        how_much_useful: false,
        economic_benefits: false,
    });

    const toggleSelection = (data) => {
        const newValue = { ...isSelected };
        newValue[data] = !newValue[data];
        setSelection( {...newValue} );
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date, item) => {
        let newValue = { ...feedback };
        newValue[item] = date.toISOString().slice(0, 10);
        setFeedback({ ...newValue });
        hideDatePicker();
    };

    const [isDateSelected, setDateSelection] = useState({
        feedback_for_bulletin_date: false
    });
    const toggleDateSelection = (data) => {
        const newValue = { ...isDateSelected };
        newValue[data] = !newValue[data];
        setDateSelection( {...newValue} );
    };

    let empty = false;
    const checkEmpty = () => {
        for (let key in feedback) {
            if ( (feedback[key] == null)||(feedback[key] == '') ) {
                empty = true;
                break;
            }
        }
    }

    const updateFeedback = () => {
        let newValue = { ...feedback };
        for (let key in checkbox) {
            newValue[key] = checkbox[key].join('&');
        }
        newValue = {
            ...newValue,
            location_id: userInfo.location_id,
            farmer_name: userInfo.name,	
            state_name: location.state,
            district_name: location.district,
            block_name: location.block,
            mobile_num: userInfo.mobile,
        }
        setFeedback({ ...newValue });
        console.log(newValue);
        handleSubmit(newValue);
    }

    const handleSubmit = (newValue) => {
        setFeedback({ ...newValue });
        checkEmpty();
        if (empty) {
            Alert.alert(translations.Feedback.incomplete);
            empty = false;
        }
        else {
            let FeedbackAPIURL = "http://10.0.2.2:80/api/feedback.php";

            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const Data = { ...newValue };

            fetch (FeedbackAPIURL,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data)
                }
            )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                Alert.alert(response.Message);
            })
            .catch((e) => {
                console.log(e);
                Alert.alert("ERROR " + e);
            })
        }
    }

    return (
        <>
            <Header title={translations.Feedback.feedbackTitle} barColor='#d0b206' />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.centerizedView}>
                            <View style={styles.authBox}>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{translations.Feedback.name}</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={userInfo.name}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{translations.Feedback.state}</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={location.state}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{translations.Feedback.district}</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={location.district}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{translations.Feedback.block}</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={location.block}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{translations.Feedback.mobile}</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={userInfo.mobile}
                                    />
                                </View>

                                {keys.map((item, index) => {
                                    if ( translations.Feedback.form[item].type == 'Radio Button' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{translations.Feedback.form[item].q}</Text>
                                                {radioBtn(item)}
                                            </View>
                                        )
                                    }
                                    else if ( translations.Feedback.form[item].type == 'Checkbox' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{translations.Feedback.form[item].q}</Text>
                                                {translations.Feedback.form[item].options.map((data, loc) => {
                                                    const checked = checkbox[item].includes(data);
                                                    return (
                                                        <CheckBox
                                                            title={data}
                                                            key={loc}
                                                            checked={checked}
                                                            onPress={() => handleCheckboxPress(item, data, checked)}
                                                            checkedColor='#d0b206'
                                                            containerStyle={checked ? ([styles.checkboxContainer, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.checkboxContainer)}
                                                            style={styles.checkbox}
                                                        />
                                                    )
                                                })}
                                            </View>
                                        )
                                    }
                                    else if ( translations.Feedback.form[item].type == 'Text Input' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{translations.Feedback.form[item].q}</Text>
                                                <TextInput
                                                    onFocus={() => {toggleSelection(item)}}
                                                    onBlur={() => {toggleSelection(item)}}
                                                    onChangeText={(val) => {handleTextInputChange(val, item)}}
                                                    style={isSelected[item] ? ([styles.input, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.input)}
                                                    autoCapitalize='none'
                                                    maxLength={translations.Feedback.form[item].max}
                                                    keyboardType={(item === 'age') ? "number-pad" : "default"}
                                                />
                                            </View>
                                        )
                                    }
                                    else if ( translations.Feedback.form[item].type == 'Date' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{translations.Feedback.form[item].q}</Text>
                                                <TouchableWithoutFeedback
                                                    onPress={() => {
                                                        showDatePicker();
                                                        toggleDateSelection(item);
                                                    }}
                                                >
                                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                        <TextInput
                                                            editable={false}
                                                            value={feedback[item]}
                                                            style={isDateSelected[item] ? ([styles.input, {width: '90%', borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : ([styles.input, {width: '90%'}])}
                                                        />
                                                        <TouchableOpacity
                                                            style={{backgroundColor: '#d0b206', alignItems: 'center', padding: 5}}
                                                            onPress={() => {
                                                                showDatePicker();
                                                                toggleDateSelection(item);
                                                            }}
                                                        >
                                                            <Icon2
                                                                name="calendar-sharp"
                                                                size={30}
                                                                color="#fff"
                                                            />
                                                        </TouchableOpacity>
                                                        <DateTimePickerModal
                                                            isVisible={isDatePickerVisible}
                                                            mode="date"
                                                            onConfirm={(date) => {
                                                                handleConfirm(date, item);
                                                                toggleDateSelection(item);
                                                            }}
                                                            onCancel={() => {
                                                                hideDatePicker();
                                                                toggleDateSelection(item);
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                                    }
                                    else if ( translations.Feedback.form[item].type == 'Ratings' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{translations.Feedback.form[item].q}</Text>
                                                <AirbnbRating 
                                                    size={20}
                                                    defaultRating={0}
                                                    onFinishRating={(rating) => {
                                                        let newValue = { ...feedback };
                                                        newValue[item] = rating;
                                                        setFeedback({ ...newValue });
                                                    }}
                                                />
                                            </View>
                                        )
                                    }
                                })}
                                <TouchableOpacity style={styles.submitButton} onPress={() => {updateFeedback()}}>
                                    <Text style={styles.submitButtonText}>{translations.Feedback.submit}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    centerizedView: {
        width: '100%',
        top: '0.5%',
        paddingBottom: '20%',
    },
    authBox: {
        width: '80%',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputBox: {
        padding: 20,
        borderRadius: 10,
        borderColor: '#d0d0d0',
        borderWidth: 0.5,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 40,
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#d0d0d0',
        borderRadius: 4,
        padding: 10,
    },
    checkboxContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
        borderColor: '#d0d0d0',
        borderWidth: 0.5,
    },
    checkbox: {
        alignSelf: "center",
    },
    submitButton: {
        backgroundColor: '#d0b206',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 20,
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
