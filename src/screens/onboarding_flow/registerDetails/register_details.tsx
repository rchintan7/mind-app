import React, { useState } from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from "react-native";
import GlobalStyles from "../../../styles/GlobalStyles";
import Colors from "../../../constants/colors";
import CustomButton from "../../../components/customButton/customButton";
import SizedBox from "../../../components/sizedbox/sizedbox";
import { Svgs } from "../../../constants/images";
import CustomInput from "../../../components/customInput/customInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_DETAILS_FIELDS_SCHEMA, UserDataFields } from "./register_details.types";
import RadioButton from "../../../components/radioButton/radioButton";
import { styles } from "./register_details.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setFirstName, setGender, setLastName, setPassword } from "../../../state/slices/app.slice";

const RegisterDetailsScreen = ({ navigation, route }: any) => {
    const { height, width } = useWindowDimensions();
    const [showEmailField, setShowEmailField] = useState(true);
    const [genderFromScreen, setGenderFromScreen] = useState('');
    const { email, loginType } = useSelector((state: RootState) => state.appSlice);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(REGISTER_DETAILS_FIELDS_SCHEMA),
        defaultValues: {
            email: email || '',
            password: '',
            firstName: '',
            lastName: '',
        },
    });

    const handleNext = (data: UserDataFields) => {
        dispatch(setPassword(data.password))
        dispatch(setFirstName(data.firstName))
        dispatch(setLastName(data.lastName || ''))
        dispatch(setGender(genderFromScreen))
        navigation.navigate('NumberScreen')
    }

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <KeyboardAvoidingView
                style={GlobalStyles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 40}
            >
                <ScrollView style={GlobalStyles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">
                    <SizedBox height={height * 0.05} />
                    <View style={GlobalStyles.center}>
                        <Svgs.undrawEmail height={150} width={150} style={{ color: Colors.primaryColor }} />
                    </View>
                    <SizedBox height={40} />

                    <View style={styles.fieldMargin}>
                        {showEmailField && <View style={{ width: '100%' }}>
                            {loginType === '1'
                                ? <Text style={[styles.inputTitle, { color: Colors.secondaryColor }]}>E-Mail-Adresse</Text>
                                : <Text style={[styles.inputTitle, { color: Colors.secondaryColor }]}>E-Mail-Adresse*</Text>}
                            <SizedBox height={5} />
                            <CustomInput
                                name={'email'}
                                control={control}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onSubmitEditing={(v) => { }}
                                editable={false}
                                placeholder="Hier Mail-Adresse eingeben"
                                placeholderTextColor={Colors.grey}
                                error={errors.email?.message}
                            />
                        </View>}

                        <View style={styles.fieldSpace}>
                            <View style={GlobalStyles.rowSpaceBetween}>
                                <Text style={styles.inputTitle}>Passwort*</Text>
                                <Text style={styles.inputSubtitle}>min. 8 Zeichen</Text>
                            </View>
                            <SizedBox height={5} />
                            <CustomInput
                                name="password"
                                control={control}
                                autoCapitalize="none"
                                placeholder="Hier Passwort eingeben"
                                placeholderTextColor={Colors.grey}
                                secureTextEntry
                                error={errors.password?.message}
                            />
                        </View>

                        <View style={styles.fieldSpace}>
                            <Text style={styles.inputTitle}>Wie dürfen wir dich nennen?</Text>
                            <SizedBox height={5} />
                            <CustomInput
                                name="firstName"
                                control={control}
                                placeholder="Vornamen eingeben"
                                placeholderTextColor={Colors.grey}
                                error={errors.firstName?.message}
                            />
                            <SizedBox height={5} />
                            <CustomInput
                                name="lastName"
                                control={control}
                                placeholder="Nachnamen eingeben (Optional)"
                                placeholderTextColor={Colors.grey}
                                error={errors.lastName?.message}
                            />
                        </View>

                        <View style={styles.fieldSpace}>
                            <Text style={styles.inputTitle}>Bitte wähle dein Geschlecht:</Text>
                            <SizedBox height={5} />
                            <RadioButton selected={genderFromScreen === "MALE"} text="Mann" onPress={() => setGenderFromScreen("MALE")} />
                            <RadioButton selected={genderFromScreen === "FEMALE"} text="Frau" onPress={() => setGenderFromScreen("FEMALE")} />
                            <RadioButton selected={genderFromScreen === "OTHERS"} text="Divers" onPress={() => setGenderFromScreen("OTHERS")} />
                        </View>

                        <SizedBox height={20} />
                        <CustomButton
                            title="Weiter"
                            onPress={handleSubmit(handleNext)}
                        />
                    </View>
                    <SizedBox height={20} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterDetailsScreen;
