import React, { useState } from "react"
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import SizedBox from "../../../components/sizedbox/sizedbox";
import Colors from "../../../constants/colors";
import { Images, Svgs } from "../../../constants/images";
import CustomInput from "../../../components/customInput/customInput";
import { styles } from "./register.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_FIELDS_SCHEMA } from "./register.types";
import GlobalStyles from "../../../styles/GlobalStyles";
import { useCheckMail } from "../../../api/apis";
import Loader from "../../../components/loader/loader";
import { showToast } from "../../../config/utils";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../state/slices/app.slice";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import appleAuth from "@invertase/react-native-apple-authentication";
import auth from '@react-native-firebase/auth';

const RegisterScreen = ({ navigation }: any) => {
    const { height, width } = useWindowDimensions();
    const { checkMail, loading: checkMailLoading } = useCheckMail();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(REGISTER_FIELDS_SCHEMA),
        defaultValues: {
            email: '',
        },
    });

    const onSubmitEditing = async (event: any) => {
        checkMail({ email: event.email }).then((value) => {
            if (!value?.isRegistered) {
                dispatch(setEmail(event.email))
                navigation.navigate('RegisterDetailsScreen');
            } else {
                showToast('E-Mail ist bereits vorhanden', "error");
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    const onGoogleButtonPress = async () => {
        // try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     const { idToken } = await GoogleSignin.getTokens();

        //     console.log('User Info --> ', userInfo);
        //     console.log('ID Token --> ', idToken);

        //     if (idToken) {
        //         // Create a Firebase credential with the token
        //         // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        //         // // Sign in with the credential
        //         // const firebaseUserCredential = await auth().signInWithCredential(googleCredential);

        //         // console.log('Firebase user:', firebaseUserCredential.user);

        //         // // Handle the next steps after authentication
        //         // await handleNext(userInfo.user.email, "3", idToken)
        //     } else {
        //         console.error('Failed to obtain ID token from Google Sign-In');
        //     }
        // } catch (error: any) {
        //     console.error('Google Sign-In error:', error);

        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //         // User cancelled the login flow
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //         // Operation (e.g. sign in) is in progress already
        //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //         // Play services not available or outdated
        //     } else {
        //         // Some other error happened
        //     }
        // }
    };

    const onAppleButtonPress = async () => {
        // try {
        //     // Perform the Apple Sign-In request
        //     const appleAuthRequestResponse = await appleAuth.performRequest({
        //         requestedOperation: appleAuth.Operation.LOGIN,
        //         requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        //     });

        //     // Get the identity token and nonce
        //     const { identityToken, nonce } = appleAuthRequestResponse;

        //     if (identityToken) {
        //         // Create a Firebase credential with the token
        //         // const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        //         // // Sign in with the credential
        //         // const firebaseUserCredential = await auth().signInWithCredential(appleCredential);

        //         // if (appleAuthRequestResponse.fullName?.givenName) {
        //         //     await auth().currentUser?.updateProfile({ displayName: `${appleAuthRequestResponse.fullName?.givenName || ''} ${appleAuthRequestResponse.fullName?.familyName || ''}` })
        //         // }

        //         // const displayName = auth().currentUser?.displayName || '';
        //         // const [firstName, ...rest] = displayName.split(' ');
        //         // const lastName = rest.length ? rest.join(' ') : '';

        //         // console.log('Firebase user:', firebaseUserCredential.user);
        //         // console.log('Apple user:', appleAuthRequestResponse);

        //         // // Handle the next steps after authentication
        //         // handleAppleNext(
        //         //     firebaseUserCredential.user.email || '',
        //         //     "1",
        //         //     appleAuthRequestResponse.user,
        //         //     appleAuthRequestResponse.fullName?.givenName || firstName || '',
        //         //     appleAuthRequestResponse.fullName?.familyName || lastName || '',
        //         // )
        //     } else {
        //         // No identity token was returned
        //         console.error('Failed to obtain identity token from Apple Sign-In');
        //     }
        // } catch (error) {
        //     console.error('Apple Sign-In error:', error);
        // }
    };

    const onFacebookButtonPress = async () => {
        // navigation.navigate('RegisterDetailsScreen');
    };

    return (
        <SafeAreaView style={[GlobalStyles.container, GlobalStyles.margin16]}>
            <Loader loading={checkMailLoading} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <SizedBox height={height * 0.10} />
                <View style={GlobalStyles.center}>
                    <Svgs.undrawEmail height={150} width={150} style={{ color: Colors.primaryColor }} />
                </View>
                <SizedBox height={20} />
                <Text style={styles.title}>{`Wie lautet deine\nE-Mail-Adresse?`}</Text>
                <SizedBox height={30} />
                <CustomInput
                    name={'email'}
                    control={control}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onSubmitEditing={handleSubmit(onSubmitEditing)}
                    error={errors.email?.message}
                />
                <SizedBox height={height * 0.05} />
                <View style={styles.dividerWrapper}>
                    <View style={[styles.divider, { marginRight: 10 }]} />
                    <Text style={{ color: Colors.grey }}>oder</Text>
                    <View style={[styles.divider, { marginLeft: 10 }]} />
                </View>
                <SizedBox height={height * 0.05} />
                <TouchableOpacity
                    onPress={onGoogleButtonPress}
                    style={styles.socialButton}>
                    <Image
                        source={Images.google}
                        style={styles.imageIcon} />
                    <Text style={styles.socialButtonText}>{'Mit Google anmelden'}</Text>
                </TouchableOpacity>
                {appleAuth.isSupported && <TouchableOpacity
                    onPress={onAppleButtonPress}
                    style={styles.socialButton}>
                    <Image
                        source={Images.apple}
                        style={styles.imageIcon} />
                    <Text style={styles.socialButtonText}>{'Mit Apple anmelden'}</Text>
                </TouchableOpacity>}
                <TouchableOpacity
                    onPress={onFacebookButtonPress}
                    style={[styles.socialButton, { backgroundColor: '#3B5998' }]}>
                    <Image
                        source={Images.facebook}
                        style={styles.imageIcon} />
                    <Text style={styles.socialButtonText}>{'Mit Facebook anmelden'}</Text>
                </TouchableOpacity>
                <SizedBox height={20} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterScreen;