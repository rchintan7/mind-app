import React, { useState } from "react"
import { SafeAreaView, ScrollView, Text, View, useWindowDimensions } from "react-native";
import SizedBox from "../../../components/sizedbox/sizedbox";
import Colors from "../../../constants/colors";
import { Svgs } from "../../../constants/images";
import CustomInput from "../../../components/customInput/customInput";
import CustomButton from "../../../components/customButton/customButton";
import { styles } from "./login.styles";
import { LOGIN_FIELDS_SCHEMA, T_LOGIN_FIELDS } from "./login.types";
import { ASYNC_KEYS, saveValueInAsync } from "../../../config/async";
import { showToast } from "../../../config/utils";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { actionSetUserJWTToken } from "../../../state/slices/user.slice";
import GlobalStyles from "../../../styles/GlobalStyles";
import { useLogin } from "../../../api/apis";
import { getMessaging } from "@react-native-firebase/messaging";

export default function LoginScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const { login, loading: loginLoading } = useLogin();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(LOGIN_FIELDS_SCHEMA),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function getFcmToken() {
        try {
            const token = await getMessaging().getToken();
            console.log('FCM Token:', token);
            return token;
        } catch (error) {
            console.error('Error getting FCM token:', error);
            return ''; // Return empty string on error
        }
    }

    const onLoginClick = async (loginFormData: T_LOGIN_FIELDS) => {
        try {
            const response = await login({
                email: loginFormData.email.trim().toLowerCase(),
                password: loginFormData.password,
            });

            await saveValueInAsync(ASYNC_KEYS.TOKEN, response.accessToken);
            dispatch(actionSetUserJWTToken(response.accessToken));

            showToast('login success');
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <SafeAreaView style={[GlobalStyles.container, GlobalStyles.margin16]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <SizedBox height={height * 0.10} />
                <View style={GlobalStyles.center}>
                    <Svgs.undrawEmail height={150} width={150} style={{ color: Colors.primaryColor }} />
                </View>
                <SizedBox height={20} />
                <Text style={styles.title}>{`Login`}</Text>
                <SizedBox height={10} />
                <Text style={styles.inputTitle}>E-Mail-Adresse</Text>
                <CustomInput
                    name="email"
                    control={control}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="peter@peter.de"
                    placeholderTextColor={Colors.grey}
                    error={errors.email?.message}
                />
                <Text style={styles.inputTitle}>Passwort</Text>
                <CustomInput
                    name="password"
                    control={control}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="••••••••••••"
                    placeholderTextColor={Colors.grey}
                    secureTextEntry
                    error={errors.password?.message}
                />
                <Text style={styles.forgotPassword}>Passwort vergessen?</Text>
                <SizedBox height={height * 0.05} />
                <CustomButton
                    loading={loginLoading}
                    onPress={handleSubmit(onLoginClick)}
                    // onPress={() => navigation.navigate('RootStack')}
                    title={"Anmelden"}
                    buttonStyle={styles.buttonStyle} />
            </ScrollView>
        </SafeAreaView>
    );
}