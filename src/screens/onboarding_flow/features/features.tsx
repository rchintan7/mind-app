import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spacer from '../../../components/spacer/spacer';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../../../components/customButton/customButton';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { styles } from './features.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

export default function FeaturesScreen({ navigation }: any) {
    const features = [
        {
            title: 'Feature 1',
            free: true,
            premium: true,
        },
        {
            title: 'Feature 2',
            free: false,
            premium: true,
        },
        {
            title: 'Feature 3',
            free: false,
            premium: true,
        },
        {
            title: 'Feature 4',
            free: false,
            premium: true,
        },
        {
            title: 'Feature 5',
            free: false,
            premium: true,
        }
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Lorem ipsum dolor sit\namet consectetur.\nOdio non blandit.`}</Text>

            <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>Mind Elevate Premium</Text>
            </TouchableOpacity>
            <SizedBox height={20} />
            <View style={styles.featuresTable}>
                <View style={GlobalStyles.rowContainer}>
                    <Spacer flex={1.5} />
                    <View style={styles.featureHeaderText}>
                        <Text style={styles.headerText}>GRATIS</Text>
                    </View>
                    <View style={styles.featureHeaderButtonContainer}>
                        <TouchableOpacity style={styles.premiumButton}>
                            <Text style={styles.premiumButtonTextSmall}>Mind Elevate Premium</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                        <View style={styles.featureTitleContainer}>
                            <Text style={styles.featureText}>{feature.title}</Text>
                        </View>
                        <View style={styles.featureIconContainer}>
                            {feature.free && <Icon name='check' size={16} color={Colors.primaryColor} />}
                        </View>
                        <View style={[styles.featureIconContainer, { flex: 3 }]}>
                            {feature.premium && <Icon name='check' size={16} color={Colors.primaryColor} />}
                        </View>
                    </View>
                ))}
                <View style={styles.overlayRow}>
                    <Spacer flex={1.5} />
                    <Spacer flex={1.5} />
                    <View style={styles.greenOpacityContainer} />
                </View>
            </View>

            <CustomButton
                onPress={() => navigation.navigate('SubscriptionScreen')}
                title='Kostenlos starten'
                buttonStyle={styles.buttonStyle} />

            <TouchableOpacity style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Überspringen</Text>
            </TouchableOpacity>
        </View>
    );
}