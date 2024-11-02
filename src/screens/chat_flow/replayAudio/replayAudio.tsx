import React from 'react';
import { View, Text } from 'react-native';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { Svgs } from '../../../constants/images';
import CustomButton from '../../../components/customButton/customButton';
import OutlinedButton from '../../../components/outlinedButton/outlinedButton';
import { styles } from './replayAudio.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const ReplayAudioScreen = (props: any) => {

    return (
        <View style={GlobalStyles.centeredContainer}>
            <Text style={styles.greetingText}>{`00:00`}</Text>
            <SizedBox height={20} />
            <Svgs.replayAudio height={100} width={100} />
            <SizedBox height={50} />
            <CustomButton title='Abschicken' onPress={() => { props.navigation.navigate('UploadAudioScreen'); }} buttonStyle={styles.buttonStyle} />
            <SizedBox height={20} />
            <OutlinedButton icon={<Svgs.mic height={20} width={20} />} title='Wiederholen' onPress={() => { }} buttonStyle={styles.buttonStyle} />
        </View>
    );
};

export default ReplayAudioScreen;
