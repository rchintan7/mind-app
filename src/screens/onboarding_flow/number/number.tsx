import React, { useState } from "react"
import { SafeAreaView, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Svgs } from "../../../constants/images";
import SizedBox from "../../../components/sizedbox/sizedbox";
import CustomButton from "../../../components/customButton/customButton";
import Colors from "../../../constants/colors";
import CustomInput from "../../../components/customInput/customInput";
import { styles } from "./number.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NUMBER_FIELDS_SCHEMA } from "./number.types";
import GlobalStyles from "../../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { setNumber } from "../../../state/slices/app.slice";

const NumberScreen = ({ navigation }: any) => {
    const { height, width } = useWindowDimensions();
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(NUMBER_FIELDS_SCHEMA),
        defaultValues: {
            number: '',
        },
    });

    const handleNext = (data: { number: string }) => {
        dispatch(setNumber(data.number))
        navigation.navigate('CookiesScreen')
    }

    const handleSkip = () => {
        navigation.navigate('CookiesScreen')
    }

    return (
        <SafeAreaView style={[GlobalStyles.container, GlobalStyles.margin16]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <SizedBox height={height * 0.08} />
                <View style={GlobalStyles.center}>
                    <Svgs.undrawAppInstallation height={150} width={150} style={{ color: Colors.primaryColor }} />
                </View>
                <SizedBox height={20} />
                <Text style={styles.title}>{`Wie lautet deine Nummer?`}</Text>
                <SizedBox height={10} />
                {/* <Text style={styles.description}>{`Wir bestätigen deine Kundenkarte\nmit einer SMS oder einer E-Mail`}</Text> */}
                <SizedBox height={20} />
                <View style={{ marginHorizontal: '8%' }}>
                    <View style={[styles.inputWrapper, isFocused && { borderColor: Colors.black }]}>
                        <Text style={styles.prefixText}>+49</Text>
                        <CustomInput
                            name={'number'}
                            control={control}
                            style={styles.input}
                            innerContainerStyle={styles.input}
                            keyboardType="phone-pad"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                    {errors.number?.message && <Text style={GlobalStyles.controlError}>{errors.number?.message}</Text>}
                    <SizedBox height={20} />
                    <CustomButton
                        title="Weiter"
                        onPress={handleSubmit(handleNext)}
                        buttonStyle={styles.buttonStyle} />
                    <SizedBox height={20} />
                    <Text
                        onPress={handleSkip}
                        style={styles.skipButtonText}>{`Überspringen`}</Text>
                </View>
                <SizedBox height={20} />
            </ScrollView>
        </SafeAreaView>

    );
}

export default NumberScreen;