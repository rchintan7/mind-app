import React from 'react';
import { View, Text } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import CustomButton from '../../../components/customButton/customButton';
import { styles } from './welcomeQuiz.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const WelcomeQuizScreen = ({ navigation, route }: any) => {

    return (
        <View style={GlobalStyles.centeredContainer}>
            <AppBar onBackPress={() => navigation.goBack()} title={'Fragebogen'} />
            <View style={styles.modal}>
                <View style={GlobalStyles.centeredContainer}>
                    <Text style={styles.questionText}>{route?.params?.data?.title}</Text>
                    <View style={styles.dash} />
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.statsContainer}>
                        <View style={styles.rowEnd}>
                            <Text style={styles.largeText}>{route?.params?.data?.tasks?.length ?? 0}</Text>
                            <Text style={styles.smallText}>{`schnelle\nFragen`}</Text>
                        </View>
                        <View style={styles.rowEnd}>
                            <Text style={styles.largeText}>{route?.params?.data?.requiredTimeForTaskFlow ?? 0}</Text>
                            <Text style={styles.smallText}>{`Sekunden\nDauer`}</Text>
                        </View>
                    </View>
                    <CustomButton
                        onPress={() => navigation.navigate('QuizSelectionScreen', { data: route.params.data })}
                        title={'Jetzt starten'}
                        buttonStyle={styles.buttonStyle}
                        textStyle={styles.buttonText} />
                </View>
            </View>
        </View>
    );
};

export default WelcomeQuizScreen;