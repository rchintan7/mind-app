import React from 'react';
import { View, Text, Image } from 'react-native';
import { Images } from '../../../constants/images';
import CustomButton from '../../../components/customButton/customButton';
import Spacer from '../../../components/spacer/spacer';
import { styles } from './personalize.styles';

export default function PersonalizeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Spacer flex={1.5} />
      <Image source={Images.plan} style={styles.image} resizeMode='contain' />
      <Spacer flex={1} />
      <Text style={styles.title}>Personalisierte Erfahrung</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur. Laoreet felis laoreet lectus tellus.
      </Text>
      <Spacer flex={1} />
      <CustomButton title="Weiter" onPress={() => navigation.navigate('Quiz')} buttonStyle={styles.buttonStyle} />
      <Text
        onPress={() => navigation.navigate('Quiz')}
        style={styles.skipButtonText}>Überspringen</Text>
      <Spacer flex={0.8} />
    </View>
  );
}