import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { Svgs } from '../../../constants/images';
import { useNavigation } from '@react-navigation/native';
import { styles } from './upload.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const UploadAudioScreen = (props: any) => {
    const navigation = useNavigation();

    // Navigate away after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            props.navigation.goBack();
            props.navigation.goBack();
            props.navigation.goBack();
        }, 1000);

        // Cleanup the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={GlobalStyles.centeredContainer}>
            <Text style={styles.greetingText}>{`Wird verarbeitet...`}</Text>
            <SizedBox height={50} />
            <Svgs.upload height={140} width={140} />
            <SizedBox height={50} />
            <Text style={styles.greetingText}>{`Abbrechen`}</Text>
        </View>
    );
};

export default UploadAudioScreen;
