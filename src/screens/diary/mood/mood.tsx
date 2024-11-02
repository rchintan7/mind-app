import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/customButton/customButton';
import AppBar from '../../../components/appbar/appbar';
import Colors from '../../../constants/colors';
import Card from '../../../components/card/card';
import SizedBox from '../../../components/sizedbox/sizedbox';
import { styles } from './mood.styles';
import GlobalStyles from '../../../styles/GlobalStyles';

const MoodScreen = ({ navigation }: any) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = [
    { icon: '😣', label: 'Schlecht' },
    { icon: '😕', label: 'Geht so' },
    { icon: '🙂', label: 'Normal' },
    { icon: '☺️', label: 'Gut' },
    { icon: '🤩', label: 'Super' },
  ];

  return (
    <View style={GlobalStyles.container}>
      <AppBar onBackPress={() => navigation.goBack()} title='Stimmung' />
      {/* Title */}
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Stimmung</Text>
        <Text style={styles.subtitle}>Wie ist deine Stimmung aktuell?</Text>

        {/* Mood selection */}
        <View style={styles.moodContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedMood(index)}>
              <Card style={styles.moodCard}>
                <Text style={styles.moodIcon}>{mood.icon}</Text>
                <SizedBox height={8} />
                <Text style={styles.moodText}>{mood.label}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Save button */}
      <View style={styles.saveButtonContainer}>
        <CustomButton onPress={() => { }} title={'Speichern'} />
      </View>
    </View>
  );
};

export default MoodScreen;