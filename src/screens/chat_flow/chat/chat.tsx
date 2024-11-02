import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    GestureResponderEvent,
    SafeAreaView,
    FlatList
} from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import { Images, Svgs } from '../../../constants/images';
import GlobalStyles from '../../../styles/GlobalStyles';
import SizedBox from '../../../components/sizedbox/sizedbox';
import CustomInput from '../../../components/customInput/customInput';
import { styles } from './chat.styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MESSAGE_FIELDS_SCHEMA } from './chat.types';
import SelectChip from './layoutComponents/selectChip/selectChip';
import SelectImageModal from './layoutComponents/selectImageModal/selectImageModal';
import { useChat, useChatAnswer } from '../../../api/apis';
import Loader from '../../../components/loader/loader';
import CustomButton from '../../../components/customButton/customButton';
import Spacer from '../../../components/spacer/spacer';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../../constants/colors';
import LoaderKit from 'react-native-loader-kit';
import moment from 'moment';
import { getMoodValue } from '../../../utils/enums';

const ChatScreen = (props: any) => {
    const { navigation, route } = props;
    const { getChat, loading: getChatLoading } = useChat();
    const { chatAnswer, loading: chatAnswerLoading } = useChatAnswer();
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [chatData, setChatData] = useState<any>([]);
    const [singleSelectChip, setSingleSelectChip] = useState<string | undefined>();
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(MESSAGE_FIELDS_SCHEMA),
        defaultValues: {
            message: ''
        },
    });

    useEffect(() => {
        getChatData();
    }, [])

    const getChatData = () => {
        const day = moment(route?.params?.date).format('YYYY-MM-DD');
        getChat(day)
            .then(response => {
                if (response.success) {
                    setChatData(response.chatEntry)
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    const handleSingleChipSelect = (diaryId: string, value: string) => {
        setSingleSelectChip(value);
        chatAnswer({ diaryId: diaryId, answer: [value] })
            .then((response) => [getChatData(), setSingleSelectChip(undefined)])
            .catch((error) => console.log(error));
    };

    const handleChipSelect = (value: string) => {
        setSelectedChips((prevSelected) => {
            if (prevSelected.includes(value)) {
                // If already selected, remove it
                return prevSelected.filter((chip) => chip !== value);
            } else {
                // If not selected, add it
                return [...prevSelected, value];
            }
        });
    };

    const handleMultipleChipSelect = () => {
        chatAnswer({ diaryId: chatData[0].diaryId, answer: selectedChips })
            .then((response) => { getChatData(), setSelectedChips([]) })
            .catch((error) => console.log(error));
    };

    const handleSendMessage = (data: any) => {
        const { message } = data;
        chatAnswer({ diaryId: chatData[0].diaryId, answer: [message] })
            .then((response) => { getChatData(), reset(), setSelectedChips([]) })
            .catch((error) => console.log(error));
    };

    const renderChatItem = ({ item }: { item: any }) => (
        <View>
            <View style={GlobalStyles.leftMessage}>
                <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
                <View style={GlobalStyles.chatDefaultContainer}>
                    <Text style={GlobalStyles.chatDefaultText}>{item.message}</Text>
                </View>
            </View>

            {item.messageType === 'TASK' && (
                <CustomButton
                    onPress={() => navigation.navigate('Aufgaben')}
                    title="Zu deinen Trainingsplänen"
                    buttonStyle={styles.trainingPlanButton}
                    textStyle={{ fontSize: 12 }}
                />
            )}

            <View style={GlobalStyles.rightMessage}>
                {item.selctionType === 'SINGLE' && (
                    <View style={GlobalStyles.groupRightMessage}>
                        {item.answerOptions?.map((option: string) => (
                            <SelectChip
                                key={option}
                                text={option}
                                showText={getMoodValue(option)}
                                value={item.isAnswered ? true : singleSelectChip === option}
                                onChangeValue={(v) =>
                                    !item.isAnswered && handleSingleChipSelect(item.diaryId, v)
                                }
                            />
                        ))}
                    </View>
                )}
                {item.selctionType === 'MULTIPLE' && (
                    <View style={GlobalStyles.groupRightMessage}>
                        {item.answerOptions?.map((option: string) => (
                            <SelectChip
                                key={option}
                                text={option}
                                value={item.isAnswered ? true : selectedChips.includes(option)}
                                onChangeValue={() =>
                                    !item.isAnswered && handleChipSelect(option)
                                }
                            />
                        ))}
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={GlobalStyles.container}>
            <View style={GlobalStyles.container}>
                <AppBar onBackPress={() => props.navigation.goBack()} title='Chat' />

                {/* <ScrollView style={GlobalStyles.paddingHorizontal}>
                    {chatData.map((chat: any, index: number) => (
                        <View key={index}>
                            <View key={index} style={GlobalStyles.leftMessage}>
                                <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
                                <View style={GlobalStyles.chatDefaultContainer}>
                                    <Text style={GlobalStyles.chatDefaultText}>
                                        {chat?.message}
                                    </Text>
                                </View>
                            </View>
                            {chat?.messageType === 'TASK' && <View>
                                <CustomButton
                                    onPress={() => navigation.navigate('Aufgaben')}
                                    title={'Go to Trainingplan'}
                                    buttonStyle={styles.trainingPlanButton}
                                    textStyle={{ fontSize: 12 }} />
                            </View>}

                            <View style={GlobalStyles.rightMessage}>
                                {chat?.selctionType === 'SINGLE' && <View style={GlobalStyles.groupRightMessage}>
                                    {chat?.answerOptions?.map((item: string) => {
                                        return (
                                            <SelectChip
                                                text={item}
                                                showText={getMoodValue(item)}
                                                value={chat?.isAnswered ? true : singleSelectChip === item}
                                                onChangeValue={(v) => !chat?.isAnswered && handleSingleChipSelect(chat?.diaryId, v)}
                                            />
                                        )
                                    })}
                                </View>}
                                {chat?.selctionType === 'MULTIPLE' && <View style={GlobalStyles.groupRightMessage}>
                                    {chat?.answerOptions?.map((item: string) => {
                                        return (
                                            <SelectChip
                                                text={item}
                                                value={chat?.isAnswered ? true : selectedChips.includes(item)}
                                                onChangeValue={() => !chat?.isAnswered && handleChipSelect(item)}
                                            />
                                        )
                                    })}
                                </View>}
                            </View>
                        </View>
                    ))} */}

                {/* <View style={GlobalStyles.leftMessage}>
                            <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
                            <View style={GlobalStyles.chatDefaultContainer}>
                                <Text style={GlobalStyles.chatDefaultText}>
                                    Guten Morgen Jens, wie fühlst du dich gerade?
                                </Text>
                            </View>
                        </View>

                        <View style={GlobalStyles.rightMessage}>
                            <View style={GlobalStyles.chatSecondaryContainer}>
                                <Text style={GlobalStyles.chatSecondaryText}>
                                    😒 Geht so
                                </Text>
                            </View>
                        </View>

                        <View style={GlobalStyles.leftMessage}>
                            <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
                            <View style={GlobalStyles.chatDefaultContainer}>
                                <Text style={GlobalStyles.chatDefaultText}>
                                    Welches Thema war heute für dich herausfordernd?
                                </Text>
                            </View>
                        </View>

                        <View style={GlobalStyles.rightMessage}>
                            <View style={GlobalStyles.groupRightMessage}>
                                <SelectChip text={'👩‍❤️‍👨 Beziehung'} onChangeValue={(v: boolean) => { }} />
                                <SelectChip text={'💪 Sport'} onChangeValue={(v: boolean) => { }} />
                                <SelectChip text={'👫 Freunde'} onChangeValue={(v: boolean) => { }} />
                                <SelectChip text={'🎓 Schule/Studium'} onChangeValue={(v: boolean) => { }} />
                                <SelectChip text={'❤️ Familie'} onChangeValue={(v: boolean) => { }} />
                                <SelectChip text={'💼 Arbeit'} onChangeValue={(v: boolean) => { }} />
                            </View>
                        </View>

                        <View style={GlobalStyles.leftMessage}>
                            <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
                            <View style={GlobalStyles.chatDefaultContainer}>
                                <Text style={GlobalStyles.chatDefaultText}>
                                    Möchtest du eine Aufgabe lösen, die dir bei deiner Herausforderung hilft?
                                </Text>
                            </View>
                        </View>

                        <View style={GlobalStyles.rightMessage}>
                            <SelectChip text={'Nein'} onChangeValue={(v: boolean) => { }} />
                            <SelectChip text={'👍 Ja!'} onChangeValue={(v: boolean) => { showModal() }} />
                        </View>
                        <View style={GlobalStyles.rightMessage}>
                            <Image source={Images.like1} style={styles.sendImage} />
                        </View> */}
                {/* </ScrollView> */}

                <FlatList
                    data={chatData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderChatItem}
                    contentContainerStyle={GlobalStyles.paddingHorizontal}
                    inverted
                    ListHeaderComponent={
                        (getChatLoading || chatAnswerLoading) ? (
                            <LoaderKit
                                style={styles.loading}
                                name="BallPulse"
                                color={Colors.grey}
                            />
                        ) : undefined
                    }
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    onEndReachedThreshold={0.1}
                />

                <SizedBox height={6} />

                {chatData?.[0]?.answerType === 'TEXT' && <View style={styles.inputContainer}>
                    <CustomInput
                        name={'message'}
                        control={control}
                        style={{ flex: 1 }}
                        placeholder='Schreibe eine Nachricht..' />
                    <SizedBox width={10} />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSubmit(handleSendMessage)}
                    >
                        <Icon name={'paper-plane'} size={20} color={Colors.secondaryColor} solid />
                    </TouchableOpacity>
                </View>}

                {/* <Svgs.mic height={20} width={20} /> */}
                {selectedChips.length > 0 && <View style={styles.inputContainer}>
                    <Spacer flex={1} />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleMultipleChipSelect}
                    >
                        <Icon name={'paper-plane'} size={20} color={Colors.secondaryColor} solid />
                    </TouchableOpacity>
                </View>}

                <SizedBox height={6} />
                <SafeAreaView />

                <SelectImageModal isVisible={isModalVisible} onClose={hideModal} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;
