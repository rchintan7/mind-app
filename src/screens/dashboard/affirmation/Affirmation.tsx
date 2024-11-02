import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Card from '../../../components/card/card';
import GlobalStyles from '../../../styles/GlobalStyles';
import { styles } from './affirmation.styles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Colors from '../../../constants/colors';
import { useAffirmations, useAffirmationsDelete, useAffirmationsStatus } from '../../../api/apis';
import { useFocusEffect } from '@react-navigation/native';

const Affirmation = ({ navigation }: any) => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [affirmation, setAffirmation] = useState<any>([]);
    const { getAffirmations, loading: affirmationLoading } = useAffirmations();
    const { updateAffirmations, loading: isChangeAffirmationLoading } = useAffirmationsStatus();
    const { deleteAffirmations, loading: deleteAffirmationLoading } = useAffirmationsDelete();

    const toggleCheckbox = (index: number, id: string) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(item => item !== index));
            updateAffirmationStatus(id);
        } else {
            setCheckedItems([...checkedItems, index]);
            updateAffirmationStatus(id);
        }
    };

    const getAffirmationData = () => {
        affirmationLoading
        getAffirmations()
            .then(response => {
                setAffirmation(response);
                console.log(response, 'get');
            }).catch(error => {
                console.error('Error fetching affirmation data:', error);
            })
    }

    const updateAffirmationStatus = (id: any) => {
        updateAffirmations(id)
            .then(response => {
                if (response) {
                    getAffirmationData();
                } else {
                    console.log('Response not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const deleteAffirmationStatus = (id: any) => {
        deleteAffirmations(id)
            .then(response => {
                if (response) {
                    getAffirmationData();
                } else {
                    console.log('Response not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            getAffirmationData();
        }, [])
    );

    return (
        <View style={GlobalStyles.container}>
            <AppBar onBackPress={() => navigation.goBack()} title='Affirmation' />
            <View style={styles.titleSection}>
                <Text style={styles.title}>{'Tägliche Affirmation'}</Text>
            </View>
            <View style={styles.levelLine} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {affirmation.length === 0 ? (
                    <Text style={styles.noDataText}>No data found</Text>
                ) : (
                    affirmation.map((item: any, index: any) => (
                        <Card
                            key={index}
                            style={styles.dailyAffirmation}
                        >
                            {item.isChecked
                                ? <TouchableOpacity onPress={() => toggleCheckbox(index, item.id)} style={styles.checked}>
                                    <Icon name={'check'} size={20} color={Colors.white} />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => toggleCheckbox(index, item.id)} style={styles.uncheck} />}
                            <Text style={styles.dailyAffirmationText}>{item.affirmation}</Text>
                            <TouchableOpacity onPress={() => deleteAffirmationStatus(item.id)}>
                                <EntypoIcon name={'trash'} size={22} color={Colors.red} />
                            </TouchableOpacity>
                        </Card>
                    ))
                )}
            </ScrollView>
        </View>
    )
}

export default Affirmation