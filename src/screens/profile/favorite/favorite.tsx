import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import Card from '../../../components/card/card';
import { Images, Svgs } from '../../../constants/images';
import Colors from '../../../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './favorite.styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import { useAddFavourite, usefetchFavourite } from '../../../api/apis';
import { createThumbnail } from 'react-native-create-thumbnail';
import Loader from '../../../components/loader/loader';

const FavoriteScreen = ({ navigation }: any) => {
    const [favorite, setFavourite] = useState<any>([]);
    const [thumbnails, setThumbnails] = useState<any>({});
    const { fetchFavourite, loading: fetchFavouriteLoading } = usefetchFavourite();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetchFavourite()
            .then((response: any) => {
                setFavourite(response.data);
                generateThumbnails(response.data);
            })
            .catch((error: any) => {
                console.error('Error fetching user data:', error);
            });
    };

    // Date format helper
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}.${month}.${year}.`;
    };

    const generateThumbnails = async (items: any[]) => {
        const thumbMap: any = {};
        for (const item of items) {
            const thumbnail = await createThumbnail({ url: item.videoURL });
            thumbMap[item.id] = { uri: thumbnail.path };
        }
        setThumbnails(thumbMap);
    };

    const { addFavourite } = useAddFavourite();

    const handleFavorite = (id: string) => {
        const data = {
            liked: false
        };
        addFavourite(data, id)
            .then(async (response) => {
                fetchData();
                console.log('Favourite => ', response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={GlobalStyles.container}>
            {/* Header */}
            <AppBar
                onBackPress={() => navigation.goBack()}
                title={'Favoriten'}
                actions={<View style={styles.headerLikeContainer}>
                    <FontAwesomeIcon name="heart" size={22} color={Colors.textColor} solid />
                </View>} />

            {/* Content */}
            <Loader loading={fetchFavouriteLoading} />
            <ScrollView>
                {favorite.map((item: any, index: any) => (
                    <Card key={index} style={GlobalStyles.rowContainer}>
                        <View style={styles.imageWrapper}>
                            {/* Media (Video Thumbnail or Photo) */}
                            {item.imageURL === null ? <Image source={thumbnails[item.id]} style={styles.image} /> : <Image source={{ uri: item.imageURL }} style={styles.image} />}
                            {item.imageURL === null && (
                                <TouchableOpacity style={styles.playButton}>
                                    <Svgs.replayAudio height={35} width={35} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.date}>{formatDate(item.updatedAt)}</Text>
                        </View>
                        <TouchableOpacity style={styles.likeContainer}>
                            <FontAwesomeIcon onPress={() => { handleFavorite(item.id) }} name="heart" size={22} color={Colors.secondaryColor} solid />
                        </TouchableOpacity>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

export default FavoriteScreen;
