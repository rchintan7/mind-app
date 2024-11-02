import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Colors from '../../../constants/colors';
import CustomButton from '../../../components/customButton/customButton';
import { Images } from '../../../constants/images';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './congrats.styles';

const CongratsScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();

    const renderCard = (iconName: string, title: string) => (
        <View style={styles.card}>
            <View style={styles.cardIconContainer}>
                <Icon name={iconName} size={20} color={Colors.white} />
            </View>
            <View style={styles.cardLine} />
            <Text style={styles.cardText}>{title}</Text>
            <View style={styles.cardStatusIcon}>
                <Icon name="check" size={12} color={Colors.white} />
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <Image style={styles.avatar} source={Images.avatar} />
            <Text style={styles.congratText}>{`Herzlichen\nGlückwunsch!`}</Text>

            <View style={styles.cardsSection}>
                {renderCard('sun', 'Lebensfreude')}
                {renderCard('mountain', 'Persönliches Wachstum')}
                {renderCard('heart', 'Emotionale Stärke')}
                {renderCard('hand-holding-heart', 'Beziehungen')}
            </View>

            <Text style={styles.levelText}>LEVEL 3</Text>
            <Text style={styles.subText}>Erfolgreich absolviert</Text>

            <CustomButton onPress={() => navigation.navigate('BottomTabs')} title='Weiter' />
            <CustomButton onPress={() => navigation.navigate('BottomTabs')} title='Teilen' buttonStyle={styles.secondaryButton}
                textStyle={styles.buttonText} />
            <TouchableOpacity>
                <Text style={styles.linkText}>Herunterladen</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CongratsScreen;