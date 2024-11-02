import React, { useRef, useState } from "react"
import { Image, SafeAreaView, Text, View, useWindowDimensions } from "react-native";
import Colors from "../../../constants/colors";
import SizedBox from "../../../components/sizedbox/sizedbox";
import CustomButton from "../../../components/customButton/customButton";
import Swiper from "react-native-swiper";
import { Images } from "../../../constants/images";
import { styles } from "./welcomeSlide.styles";
import GlobalStyles from "../../../styles/GlobalStyles";
import { useSignup } from "../../../api/apis";
import Loader from "../../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { ASYNC_KEYS, saveValueInAsync } from "../../../config/async";
import { actionSetUserJWTToken } from "../../../state/slices/user.slice";
import { showToast } from "../../../config/utils";
import { CommonActions } from "@react-navigation/native";
import { getMessaging } from "@react-native-firebase/messaging";

const WelcomeSlideScreen = ({ navigation }: any) => {
    const { height, width } = useWindowDimensions();
    const swiperRef = useRef(null);
    const [swiperIndex, setSwiperIndex] = useState(0)
    const { email, password, loginType, firstName, lastName, gender, number, quiz } = useSelector((state: RootState) => state.appSlice);
    const { signup, loading: signupLoading } = useSignup();
    const dispatch = useDispatch();

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

    const handleStart = () => {
        const data = {
            "email": email,
            "loginMethod": loginType === '1' ? "EMAIL" : "GOOGLE",
            "firstname": firstName,
            "lastname": lastName,
            "password": password,
            "gender": gender,
            "contactNumber": number,
            "quiz": quiz,
            "userRole": "FREE_USER"
        }
        console.log(data);

        signup(data)
            .then(async (response) => {
                console.log(response);

                setTimeout(async () => {
                    await saveValueInAsync(ASYNC_KEYS.TOKEN, response.accessToken);
                    dispatch(actionSetUserJWTToken(response.accessToken));
                    
                    showToast('login success');
                    handleNavigateToFeatures();
                }, 300)

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleNavigateToFeatures = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'FeaturesScreen' }],
            })
        );
    }

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <Loader loading={signupLoading} />
            <Swiper
                ref={swiperRef}
                activeDotColor={Colors.white}
                index={0}
                loop={false}
                horizontal={true}
                autoplay={false}
                dotStyle={styles.dot}
                onIndexChanged={(index) => setSwiperIndex(index)}
                activeDotStyle={[styles.dot, { backgroundColor: Colors.primaryColor }]}
            >
                <View style={GlobalStyles.centeredContainer}>
                    <Image source={Images.logo} style={styles.logoImage} />
                    <SizedBox height={30} />
                    <Text style={styles.title}>{`Herzlich Willkommen bei\n`}
                        <Text style={{ color: Colors.primaryColor }}>{`Mind Elevate`}</Text>
                    </Text>
                </View>
                <View style={GlobalStyles.centeredContainer}>
                    <Image source={Images.plan} style={styles.logoImage} resizeMode="contain" />
                    <SizedBox height={30} />
                    <Text style={styles.title}>{`Feature 1`}</Text>
                    <SizedBox height={20} />
                    <Text style={styles.description}>{`Lorem ipsum dolor sit amet consectetur. Ipsum morbi ac nunc sapien in scelerisque volutpat. Nullam sit justo est feugiat sit ac.`}</Text>
                </View>
                <View style={GlobalStyles.centeredContainer}>
                    <Image source={Images.plan} style={styles.logoImage} resizeMode="contain" />
                    <SizedBox height={30} />
                    <Text style={styles.title}>{`Feature 2`}</Text>
                    <SizedBox height={20} />
                    <Text style={styles.description}>{`Lorem ipsum dolor sit amet consectetur. Pulvinar eget pretium turpis augue. Eget auctor sed integer consectetur justo elit.`}</Text>
                </View>
            </Swiper>
            <SizedBox height={height * 0.08} />
            <View style={{ height: 60 }}>
                {swiperIndex === 2
                    && <CustomButton
                        onPress={handleStart}
                        title="Kostenlos starten"
                        buttonStyle={styles.buttonStyle} />}
            </View>
            <SizedBox height={20} />
        </SafeAreaView>
    );
}

export default WelcomeSlideScreen;