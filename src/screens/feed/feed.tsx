import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import AppBar from '../../components/appbar/appbar';
import Colors from '../../constants/colors';
import { Images } from '../../constants/images';
import ReadMoreReadLess from '../../components/readMoreReadLess/readMoreReadLess';
import GlobalStyles from '../../styles/GlobalStyles';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import CustomButton from '../../components/customButton/customButton';
import { styles } from './feed.styles';
import { useAddFavourite, useFeeds, useFeedsView, useUpdate } from '../../api/apis';
import SizedBox from '../../components/sizedbox/sizedbox';
import { useIsFocused } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const FeedScreen = ({ navigation }: any) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [paused, setPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const isFocused = useIsFocused();

    const { getFeeds } = useFeeds();
    const [feedData, setFeedData] = useState<any>([]);

    useEffect(() => {
        getFeeds()
            .then(response => {
                console.log(response, 'responseee');
                setFeedData(response);
            })
            .catch(error => {
                console.error('Error fetching feed data:', error);
            });
    }, []);

    useEffect(() => {
        if (!isFocused) {
            setPaused(!paused);
        }
    }, [isFocused]);

    const handleVideoClick = (index: number) => {
        if (index === currentIndex) {
            setPaused(!paused);
        } else {
            setCurrentIndex(index);
            setPaused(false);
        }
    };

    const { addFavourite } = useAddFavourite();

    const handleFavorite = (id: string, currentLikeStatus: boolean) => {
        const updatedData = feedData.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    isLiked: !currentLikeStatus,
                    likes: currentLikeStatus ? item.likes - 1 : item.likes + 1
                };
            }
            return item;
        });
        setFeedData(updatedData);

        const data = {
            liked: !currentLikeStatus
        };
        addFavourite(data, id)
            .then(async (response) => {
                console.log('Favourite => ', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { update } = useUpdate();
    const { getFeedsView } = useFeedsView();

    const handleUpdate = (id: any) => {
        const data = {
            "lastSeenContent": id,
        };
        update(data)
            .then(async (response) => {
                console.log('Update => ', response);
            })
            .catch((error) => {
                console.log(error);
            });
        getFeedsView().then(async (response) => {
            console.log('getFeedsView => ', response);
        }).catch((error) => {
            console.log(error);
        });
    };

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => handleVideoClick(index)} style={styles.videoContainer} activeOpacity={1}>
                {item?.type === 'VIDEO' ? (
                    <Video
                        source={{ uri: item?.videoURL }}
                        style={styles.video}
                        resizeMode="cover"
                        paused={index !== currentIndex || paused}
                        repeat
                    />
                ) : (
                    <Image source={{ uri: item?.imageURL }} style={{ height: '100%', width: '100%' }} resizeMode="contain" />
                )}
                <View style={styles.contentView}>
                    <View style={{ flex: 1 }}>
                        <View style={GlobalStyles.rowContainer}>
                            <Image source={Images.logo} style={styles.logo} />
                            <View>
                                <Text style={styles.nameText}>{item?.title}</Text>
                                <Text style={styles.usernameText}>@mind</Text>
                            </View>
                        </View>
                        <SizedBox height={6} />
                        <ReadMoreReadLess text={item?.description} />
                    </View>
                    <View style={styles.likeView}>
                        <TouchableOpacity onPress={() => handleFavorite(item.id, item.isLiked)}>
                            <FontAwesome name={item.isLiked ? "heart" : "heart-o"} size={24} color={item.isLiked ? Colors.red : Colors.white} />
                        </TouchableOpacity>
                        <SizedBox height={6} />
                        <Text style={{ color: Colors.white }}>{item.likes}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
                handleUpdate(feedData[newIndex].id); // Call handleUpdate with the new item's ID


            }
        }
    };

    const viewConfigRef = useRef({
        viewAreaCoveragePercentThreshold: 50,
    });

    return (
        <View style={styles.mainContainer}>
            <AppBar
                title='Feelgood Feed'
                headerStyle={{ backgroundColor: Colors.transparent }}
                headerTextStyle={{ color: Colors.white }}
                style={styles.appBarStyle} />

            <FlatList
                ref={flatListRef}
                data={feedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfigRef.current}
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                decelerationRate="fast"
            />

            {/* Modals can stay the same */}
        </View>
    );
};

export default FeedScreen;
