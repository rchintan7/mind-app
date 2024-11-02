import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Card from '../../../components/card/card';
import { Swipeable } from 'react-native-gesture-handler';
import GlobalStyles from '../../../styles/GlobalStyles';
import { Svgs } from '../../../constants/images';
import { styles } from './archive_data.styles';
import { useDeleteChat, useDiaryType } from '../../../api/apis';
import Loader from '../../../components/loader/loader';

const ArchiveDataScreen = ({ navigation, route }: any) => {
    const { diaryId, type } = route.params;
    const { getDiaryType, loading: getDiaryTypeLoading } = useDiaryType();
    const { deleteChat, loading: deleteChatLoading } = useDeleteChat();
    const [diaryTypeData, setDiaryTypeData] = useState<any[]>([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getDiaryType({ diaryId: diaryId, type: type })
            .then((response) => {
                console.log(response);
                setDiaryTypeData(response);
            })
            .catch((error) => console.log(error));
    }

    const handleDeleteChat = (id: string) => {
        deleteChat(id)
            .then((response) => {
                console.log(response);
                getData();
            })
            .catch((error) => console.log(error));
    }

    const renderRightActions = (item: any) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteChat(item?.id)}>
            <Svgs.delete height={24} width={24} />
        </TouchableOpacity>
    );

    const renderItem = ({ item }: any) => (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
            <Card style={GlobalStyles.marginHorizontal}>
                <View style={GlobalStyles.rowSpaceBetween}>
                    <View>
                        <Text style={styles.itemText}>{item?.message}</Text>
                        <Text style={styles.itemSubText}>{item.answerOptions?.join(', ')}</Text>
                    </View>
                    <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
            </Card>
        </Swipeable>
    );

    return (
        <View style={GlobalStyles.container}>
            <Loader loading={getDiaryTypeLoading} />

            <AppBar onBackPress={() => navigation.goBack()} title='Archiv' />

            <View style={styles.titleSection}>
                <Text style={styles.title}>{'Deine Ziele'}</Text>
            </View>
            <View style={styles.levelLine} />

            <FlatList
                data={diaryTypeData}
                keyExtractor={(item) => item?.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={GlobalStyles.center}>
                        <Text>Keine Antworten verfügbar</Text>
                    </View>
                }
            />
        </View>
    );
};

export default ArchiveDataScreen;