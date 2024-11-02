import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '../../../components/customButton/customButton';
import { Images } from '../../../constants/images';
import SizedBox from '../../../components/sizedbox/sizedbox';
import Spacer from '../../../components/spacer/spacer';
import { styles } from './welcome.styles';

export default function WelcomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Spacer flex={2} />
            <Text style={styles.title}>{`Herzlich\nWillkommen\nbei `}
                <Text style={styles.logoText}>{'mind'}</Text>
            </Text>
            <Text style={styles.subtitle}>
                Starte deine Reise zu mehr Selbstliebe und innerer Stärke. Entdecke dein wahres Potenzial und finde das Glück in dir selbst.
            </Text>
            <SizedBox height={40} />
            <Image source={Images.logo} style={styles.logoImage} />
            <Spacer flex={1} />
            <CustomButton title="Jetzt starten" onPress={() => navigation.navigate('Personalize')} buttonStyle={styles.buttonStyle} />
            <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.loginText}>Ich habe bereits ein Konto</Text>
            <Spacer flex={1} />
        </View>
    );
}