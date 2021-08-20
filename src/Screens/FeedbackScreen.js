import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AirbnbRating } from 'react-native-ratings';
import { CheckBox } from 'react-native-elements';
import UserInfo from '../../assets/UserInfo';
import Feedback from '../../assets/Feedback';

const radioBtn = ( data ) => {
    return (
        <RadioButtonRN
            data={data}
            selectedBtn={(e) => console.log(e)}
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

function handleCheckboxPress (field, value, setValue, checked) {
    if(checked) {
        const newValue = field.filter(
            (x) => x!==value
        );
        setValue(newValue)
    }
    else {
        setValue(
            [
                ...field,
                value
            ]
        )
    }
}

export default function FeedbackScreen({navigation}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    const [animal_husbandry, set_animal_husbandry] = useState([]);
    const [horticultural_crops, set_horticultural_crops] = useState([]);
    const [sources, setSources] = useState([]);
    const [useful_agri_operations, set_useful_agri_operations] = useState([]);

    const [isAgeSelected, setAgeSelection] = useState(false);
    const toggleAgeSelection = () => setAgeSelection(value => !value);

    const [isDateSelected, setDateSelection] = useState(false);
    const toggleDateSelection = () => setDateSelection(value => !value);

    const [isEcoSelected, setEcoSelection] = useState(false);
    const toggleEcoSelection = () => setEcoSelection(value => !value);

    const [isInfoSelected, setInfoSelection] = useState(false);
    const toggleInfoSelection = () => setInfoSelection(value => !value);

    const [isUsefulSelected, setUsefulSelection] = useState(false);
    const toggleUsefulSelection = () => setUsefulSelection(value => !value);

    return (
        <>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>Feedback</Text>
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
                                        value={UserInfo.name}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>State</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={UserInfo.state}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>District</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={UserInfo.district}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>Block</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={UserInfo.block}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>Mobile / Whatsapp number</Text>
                                    <TextInput
                                        style={[styles.input, {backgroundColor: '#dfe4ea'}]}
                                        editable={false}
                                        value={UserInfo.mobile}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>Age</Text>
                                    <TextInput
                                        onFocus={toggleAgeSelection}
                                        onBlur={toggleAgeSelection}
                                        style={isAgeSelected ? ([styles.input, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.input)}
                                        keyboardType='number-pad'
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.gender.q}</Text>
                                    {radioBtn(Feedback.gender.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.education.q}</Text>
                                    {radioBtn(Feedback.education.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.landHoldingType.q}</Text>
                                    {radioBtn(Feedback.landHoldingType.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.farmingType.q}</Text>
                                    {radioBtn(Feedback.farmingType.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.landHoldingArea.q}</Text>
                                    {radioBtn(Feedback.landHoldingArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.wheatArea.q}</Text>
                                    {radioBtn(Feedback.wheatArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.riceArea.q}</Text>
                                    {radioBtn(Feedback.riceArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.sugarcaneArea.q}</Text>
                                    {radioBtn(Feedback.sugarcaneArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.mustardArea.q}</Text>
                                    {radioBtn(Feedback.mustardArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.maizeArea.q}</Text>
                                    {radioBtn(Feedback.maizeArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.potatoArea.q}</Text>
                                    {radioBtn(Feedback.potatoArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.fodderArea.q}</Text>
                                    {radioBtn(Feedback.fodderArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.vegetableArea.q}</Text>
                                    {radioBtn(Feedback.vegetableArea.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.animalHusbandry.q}</Text>
                                    {Feedback.animalHusbandry.options.map((item, index) => {
                                        const checked = animal_husbandry.includes(item);
                                        return (
                                            <CheckBox
                                                title={item}
                                                key={index}
                                                checked={checked}
                                                onPress={() => handleCheckboxPress(animal_husbandry, item, set_animal_husbandry, checked)}
                                                checkedColor='#d0b206'
                                                containerStyle={checked ? ([styles.checkboxContainer, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.checkboxContainer)}
                                                style={styles.checkbox}
                                            />
                                        )
                                    })}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.poultryFarming.q}</Text>
                                    {radioBtn(Feedback.poultryFarming.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.fishFarming.q}</Text>
                                    {radioBtn(Feedback.fishFarming.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.horticulturalCrops.q}</Text>
                                    {Feedback.horticulturalCrops.options.map((item, index) => {
                                        const checked = horticultural_crops.includes(item);
                                        return (
                                            <CheckBox
                                                title={item}
                                                key={index}
                                                checked={checked}
                                                onPress={() => handleCheckboxPress(horticultural_crops, item, set_horticultural_crops, checked)}
                                                checkedColor='#d0b206'
                                                containerStyle={checked ? ([styles.checkboxContainer, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.checkboxContainer)}
                                                style={styles.checkbox}
                                            />
                                        )
                                    })}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.bulletins_received.q}</Text>
                                    {radioBtn(Feedback.bulletins_received.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.source.q}</Text>
                                    {Feedback.source.options.map((item, index) => {
                                        const checked = sources.includes(item);
                                        return (
                                            <CheckBox
                                                title={item}
                                                key={index}
                                                checked={checked}
                                                onPress={() => handleCheckboxPress(sources, item, setSources, checked)}
                                                checkedColor='#d0b206'
                                                containerStyle={checked ? ([styles.checkboxContainer, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.checkboxContainer)}
                                                style={styles.checkbox}
                                            />
                                        )
                                    })}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.issue_date.q}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <TextInput
                                            onFocus={toggleDateSelection}
                                            onBlur={toggleDateSelection}
                                            style={isDateSelected ? ([styles.input, {width: '90%', borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : ([styles.input, {width: '90%'}])}
                                            keyboardType="number-pad"
                                        />
                                        <TouchableOpacity style={{backgroundColor: '#d0b206', alignItems: 'center', padding: 5}} onPress={showDatePicker}>
                                            <Icon2
                                                name="calendar-sharp"
                                                size={30}
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                        />
                                    </View>
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.bulletin_useful.q}</Text>
                                    {radioBtn(Feedback.bulletin_useful.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.reason_bulletin.q}</Text>
                                    {radioBtn(Feedback.reason_bulletin.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.reason_advice.q}</Text>
                                    {radioBtn(Feedback.reason_advice.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.agriculture_operation.q}</Text>
                                    {Feedback.agriculture_operation.options.map((item, index) => {
                                        const checked = useful_agri_operations.includes(item);
                                        return (
                                            <CheckBox
                                                title={item}
                                                key={index}
                                                checked={checked}
                                                onPress={() => handleCheckboxPress(useful_agri_operations, item, set_useful_agri_operations, checked)}
                                                checkedColor='#d0b206'
                                                containerStyle={checked ? ([styles.checkboxContainer, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.checkboxContainer)}
                                                style={styles.checkbox}
                                            />
                                        )
                                    })}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.other_info.q}</Text>
                                    <TextInput
                                        onFocus={toggleInfoSelection}
                                        onBlur={toggleInfoSelection}
                                        style={isInfoSelected ? ([styles.input, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.input)}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        textContentType='name'
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.how_much_useful.q}</Text>
                                    <TextInput
                                        onFocus={toggleUsefulSelection}
                                        onBlur={toggleUsefulSelection}
                                        style={isUsefulSelected ? ([styles.input, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.input)}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        textContentType='name'
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.share.q}</Text>
                                    {radioBtn(Feedback.share.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.economic_benefit.q}</Text>
                                    <TextInput
                                        onFocus={toggleEcoSelection}
                                        onBlur={toggleEcoSelection}
                                        style={isEcoSelected ? ([styles.input, {borderWidth: 1, borderColor: '#d0b206', backgroundColor: '#f8f9f8'}]) : (styles.input)}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        textContentType='name'
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.production_lost.q}</Text>
                                    {radioBtn(Feedback.production_lost.options)}
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.inputLabel}>{Feedback.ratings.q}</Text>
                                    <AirbnbRating 
                                        size={20}
                                    />
                                </View>
                                <TouchableOpacity style={styles.submitButton}>
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