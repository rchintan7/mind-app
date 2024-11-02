import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { Svgs } from '../../../constants/images';
import { styles } from './audio.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const AudioScreen = (props: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);

    // Timer functionality
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (isPlaying) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isPlaying && time !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isPlaying]);

    // Format time as mm:ss
    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Play button click handler
    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setTime(0);

        // Add a 0.5 second delay before navigating
        setTimeout(() => {
            props.navigation.navigate('ReplayAudioScreen');
        }, 500);
    };


    return (
        <View style={GlobalStyles.centeredContainer}>
            <Text style={styles.greetingText}>{formatTime(time)}</Text>
            <SizedBox height={20} />
            <View style={styles.microphoneContainer}>
                <Svgs.microphone height={40} width={40} />
            </View>
            <SizedBox height={20} />
            <Text style={styles.greetingText}>Aufnahme starten</Text>
            <SizedBox height={20} />
            <View style={styles.buttonsContainer}>
                {isPlaying ? (
                    <Svgs.pushAudio height={60} width={60} />
                ) : (
                    <TouchableOpacity onPress={handlePlay}>
                        <Svgs.playAudio height={60} width={60} />
                    </TouchableOpacity>
                )}
                <SizedBox width={30} />
                {isPlaying ? (
                    <TouchableOpacity onPress={handleStop}>
                        <Svgs.fullStopAudio height={60} width={60} />
                    </TouchableOpacity>
                ) : (
                    <Svgs.stopAudio height={60} width={60} />
                )}
            </View>
        </View>
    );
};

export default AudioScreen;
