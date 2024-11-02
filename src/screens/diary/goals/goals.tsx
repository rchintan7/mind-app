import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../../styles/GlobalStyles'
import AppBar from '../../../components/appbar/appbar'
import { styles } from './goals.styles'
import SizedBox from '../../../components/sizedbox/sizedbox'
import Card from '../../../components/card/card'
import { Svgs } from '../../../constants/images'
import Colors from '../../../constants/colors'
import * as Progress from 'react-native-progress';
import { useAddGoals, useDeleteGoals, useGoals, useUpdateGoals } from '../../../api/apis'
import AddDestinationModal from '../diary/layoutComponents/addDestinationModal/AddDestinationModal'
import Loader from '../../../components/loader/loader'
import DeleteConfirmationModal from '../diary/layoutComponents/deleteConfirmationModal/deleteConfirmationModal'
import { string } from 'yup'

const Goals = ({ navigation }: any) => {

    const [goalsList, setGoalsList] = useState<any>([]);
    const [isAddDestinationVisible, setIsAddDestinationVisible] = useState(false);
    const [editGoalsData, setEditGoalsData] = useState<any>();
    const [isEditGoals, setIsEditGoals] = useState<any>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemId, setItemId] = useState<any>();

    const { getGoals, loading: getGoalsLoading } = useGoals();
    const { addGoals, loading: addGoalsLoading } = useAddGoals();
    const { updateGoals, loading: updateGoalsLoading } = useUpdateGoals();
    const { deleteGoals, loading: deleteGoalsLoading } = useDeleteGoals();

    function handleEditGoals(data: any) {
        setIsAddDestinationVisible(true);
        setIsEditGoals(true);
        setEditGoalsData(data);
        setItemId(data.id);
    }

    function handleOnDelete() {
        setIsAddDestinationVisible(false);
        setTimeout(() => {
            setIsDeleteModalVisible(true);
        }, 400);
    }

    const addNewGoal = (data: any) => {
        addGoals(data)
            .then(response => {
                if (response) {
                    setIsAddDestinationVisible(false);
                    getGoalsList();
                } else {
                    console.log('Response not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const updateGoal = (item: any) => {
        let data: any = {
            completedCount: item.completedCount + 1,
        }
        if (!item.disabled) {
            updateGoals(data, item.id)
                .then(response => {
                    if (response) {
                        setIsAddDestinationVisible(false);
                        setGoalsList(response);
                    } else {
                        console.log('Response not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        };
    }

    const deleteGoal = () => {
        deleteGoals(itemId)
            .then(response => {
                if (response) {
                    setIsDeleteModalVisible(false);
                    getGoalsList();
                } else {
                    console.log('Response not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const getGoalsList = () => {
        getGoals()
            .then(response => {
                if (response) {
                    if (response) {
                        setGoalsList(response);
                    } else {
                        setGoalsList([]);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    useEffect(() => {
        getGoalsList();
    }, [])

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={getGoalsLoading || updateGoalsLoading || deleteGoalsLoading} />
            <AppBar onBackPress={() => navigation.goBack()} title='Deine Ziele' />
            <View style={styles.newEntrySection}>
                <Text style={styles.entry}>{'Deine Ziele'}</Text>
                <Text style={styles.entry} onPress={() => {
                    setIsAddDestinationVisible(true);
                    setIsEditGoals(false);
                }}>{'Ziel hinzufügen'}</Text>
            </View>
            <View style={styles.levelLine} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.goalContainer}>
                    {goalsList.length > 0 ? (
                        goalsList?.map((item: any, index: any) => (
                            <Card
                                // disabled={item.disabled}
                                key={index}
                                style={[styles.goalCard, item.disabled && { backgroundColor: 'rgba(37, 213, 164, 0.25)' }]}
                                onPress={() => {
                                    updateGoal(item)
                                }}
                                onLongPress={() => handleEditGoals(item)}
                            >
                                <Svgs.goal />
                                <SizedBox height={6} />
                                <Text style={styles.goalTitle} numberOfLines={1}>
                                    {item.goal}
                                </Text>
                                <Text style={styles.goalSubtitle}>
                                    {item.completedCount}/{item.goalCount}
                                </Text>
                                <SizedBox height={6} />
                                <Progress.Bar
                                    progress={item.progress}
                                    width={100}
                                    color={Colors.primaryColor}
                                    borderWidth={0}
                                    unfilledColor="rgba(249, 249, 249, 1)"
                                />
                            </Card>
                        ))
                    ) : (
                        !getGoalsLoading && <View style={GlobalStyles.centeredContainer}>
                            <Text style={{ color: '#7e7e7e', fontSize: 12 }}>No Goals</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <AddDestinationModal
                isVisible={isAddDestinationVisible}
                onClose={() => setIsAddDestinationVisible(false)}
                onSubmit={(data: any) => addNewGoal(data)}
                onDelete={(data: any) => handleOnDelete()}
                isEdit={isEditGoals}
                data={isEditGoals ? editGoalsData : []}
                loading={addGoalsLoading}
            />

            <DeleteConfirmationModal
                isVisible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                onConfirmDelete={deleteGoal}
                title='Ziel'
            />
        </View>
    )
}

export default Goals