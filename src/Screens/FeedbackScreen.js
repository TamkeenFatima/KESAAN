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
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AirbnbRating } from 'react-native-ratings';
import { CheckBox } from 'react-native-elements';
import UserInfo from '../../assets/UserInfo';
import { LocalizationContext } from '../components/LocalisationContext';
import Feedback from '../../assets/Feedback';

export default function FeedbackScreen({navigation}) {

    const keys = Object.keys(Feedback);

    const [feedback, setFeedback] = useState({
        location_id: 655,
        farmer_name: UserInfo.name,	
        state_name: UserInfo.state,
        district_name: UserInfo.district,
        block_name: UserInfo.block,
        mobile_num: UserInfo.mobile,
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
        feedback_for_bulletin_date: new Date().toString().slice(4,15),
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
                data={Feedback[data].options}
                selectedBtn={(e) => {
                    let value = {...feedback};
                    value[data] = e.label;
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
            newFeedback[key] = checkbox[key].join(';');
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
    const [date, setDate] = useState({
        feedback_for_bulletin_date: new Date()
    });

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date, item) => {
        let newValue = { ...feedback };
        newValue[item] = date.toString().slice(4,15);
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
    useEffect(() => {
        for (let key in feedback) {
            if ( (feedback[key] == null)||(feedback[key] == '') ) {
                empty = true;
                break;
            }
        }
    }, [feedback])

    const updateFeedback = () => {
        const newValue = { ...feedback };
        for (let key in checkbox) {
            newValue[key] = checkbox[key].join(';');
        }
        setFeedback({ ...newValue });
        
        handleSubmit();
    }

    const handleSubmit = () => {
        const newValue = { ...feedback };
        for (let key in checkbox) {
            newValue[key] = checkbox[key].join(';');
        }
        setFeedback({ ...newValue });
        
        if (empty) {
            Alert.alert("All questions are mandatory. Please answer them and then submit the form.");
        }
        else {
            console.log(feedback);
        }
    }

    const { translations } = useContext(LocalizationContext);

    return (
        <>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>{translations.feedbackTitle}</Text>
                </View>
                <View>
                    <Text style={styles.location}>{UserInfo.block}, {UserInfo.district}, {UserInfo.state}</Text>
                    <Text style={styles.date}>{UserInfo.date}</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.centerizedView}>
                            <View style={styles.authBox}>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>Name</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={feedback.farmer_name}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>State</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={feedback.state_name}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>District</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={feedback.district_name}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>Block</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={feedback.block_name}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>Mobile / Whatsapp number</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={feedback.mobile_num}
                                    />
                                </View>

                                {keys.map((item, index) => {
                                    if ( Feedback[item].type == 'Radio Button' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{Feedback[item].q}</Text>
                                                {radioBtn(item)}
                                            </View>
                                        )
                                    }
                                    else if ( Feedback[item].type == 'Checkbox' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{Feedback[item].q}</Text>
                                                {Feedback[item].options.map((data, loc) => {
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
                                    else if ( Feedback[item].type == 'Text Input' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{Feedback[item].q}</Text>
                                                <TextInput
                                                    onFocus={() => {toggleSelection(item)}}
                                                    onBlur={() => {toggleSelection(item)}}
                                                    onChangeText={(val) => {handleTextInputChange(val, item)}}
                                                    style={isSelected[item] ? ([styles.input, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.input)}
                                                    autoCapitalize='none'
                                                    keyboardType={(item === 'age') ? "number-pad" : "default"}
                                                />
                                            </View>
                                        )
                                    }
                                    else if ( Feedback[item].type == 'Date' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{Feedback[item].q}</Text>
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
                                    else if ( Feedback[item].type == 'Ratings' ) {
                                        return (
                                            <View style={styles.inputBox} key={index}>
                                                <Text style={styles.inputLabel}>{Feedback[item].q}</Text>
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
                                    <Text style={styles.submitButtonText}>Submit</Text>
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
        borderRadius: 4,
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})