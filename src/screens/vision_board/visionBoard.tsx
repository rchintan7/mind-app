import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use any icon library you prefer
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import AppBar from '../../components/appbar/appbar';
import Colors from '../../constants/colors';
import GlobalStyles from '../../styles/GlobalStyles';
import CustomButton from '../../components/customButton/customButton';
import OutlinedButton from '../../components/outlinedButton/outlinedButton';
import {styles} from './visionBoard.styles';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import SizedBox from '../../components/sizedbox/sizedbox';

const VisionBoard = ({navigation}: any) => {
  const [images, setImages] = useState<string[]>(Array(4).fill('')); // Store image paths

  // Handle Image Selection from Gallery
  const pickImage = async (index: number) => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (result.errorMessage) {
        Alert.alert('Error', result.errorMessage);
        return;
      }

      const imageUri = result.assets?.[0]?.uri;
      if (imageUri) {
        await replaceImageAtIndex(imageUri, index);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Replace Image: Delete old image and save new one
  const replaceImageAtIndex = async (uri: string, index: number) => {
    try {
      const storedImages = await AsyncStorage.getItem('visionBoardImages');
      const parsedImages = storedImages
        ? JSON.parse(storedImages)
        : Array(4).fill('');

      // Delete the old image if it exists
      const oldImagePath = parsedImages[index];
      if (oldImagePath) {
        await deleteImageFromLocalDirectory(oldImagePath);
      }

      // Save the new image to the local directory
      await saveImageToLocalDirectory(uri, index);
    } catch (error) {
      console.error('Failed to replace image:', error);
    }
  };

  // Save Image to Local Directory using react-native-fs
  const saveImageToLocalDirectory = async (uri: string, index: number) => {
    try {
      const fileName = uri.split('/').pop(); // Extract file name from URI
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Copy the image to the local app directory
      await RNFS.copyFile(uri, destinationPath);

      console.log('Image saved to:', destinationPath);
      await storeImage(destinationPath, index);
    } catch (error) {
      console.error('Failed to save image locally:', error);
    }
  };

  // Delete Image from Local Directory
  const deleteImageFromLocalDirectory = async (path: string) => {
    try {
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
        console.log(`Deleted old image at: ${path}`);
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  // Store Image Path in AsyncStorage and Update State
  const storeImage = async (path: string, index: number) => {
    try {
      const storedImages = await AsyncStorage.getItem('visionBoardImages');
      const parsedImages = storedImages
        ? JSON.parse(storedImages)
        : Array(4).fill('');

      // Update the image at the specified index
      parsedImages[index] = path;

      await AsyncStorage.setItem(
        'visionBoardImages',
        JSON.stringify(parsedImages),
      );
      setImages(parsedImages); // Update local state
    } catch (error) {
      console.error('Failed to store image:', error);
    }
  };

  // Load Images from AsyncStorage on Component Mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem('visionBoardImages');
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };
    loadImages();
  }, []);

  // add more images
  const addMoreImages = async () => {
    const newImages = [...images, ...Array(4).fill('')];
    setImages(newImages);
    await AsyncStorage.setItem('visionBoardImages', JSON.stringify(newImages));
  };

  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
      <AppBar onBackPress={() => navigation.goBack()} title="Vision Board" />

      <View
        style={[GlobalStyles.paddingHorizontal, GlobalStyles.paddingVertical]}>
        {/* Month and View All */}
        <View style={GlobalStyles.rowSpaceBetween}>
          <Text style={styles.month}>August</Text>
          {/* <TouchableOpacity>
                        <Text style={styles.viewAll}>Alle anzeigen</Text>
                    </TouchableOpacity> */}
        </View>
        <View style={styles.levelLine} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Vision Board Title */}
          <View style={styles.visionTitleSection}>
            <Text style={styles.visionTitle}>“Future Me”</Text>
            {/* <OutlinedButton
                        icon={<FontAwesomeIcon name="pen" size={14} color={Colors.secondaryColor} />}
                        iconStyle={styles.outlinedButtonIconStyle}
                        buttonStyle={styles.iconButtonStyle}
                        onPress={() => { }}
                    /> */}
          </View>

          {/* Content Grid */}
          <View style={styles.grid}>
            {images.map((imageUri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => pickImage(index)}
                activeOpacity={0.7}
                style={styles.gridItem}>
                {imageUri ? (
                  <Image
                    source={{uri: imageUri}}
                    style={{height: '100%', width: '100%', borderRadius: 6}}
                    resizeMode="cover"
                  />
                ) : (
                  <Icon
                    name="add"
                    size={32}
                    color={Colors.grey}
                    style={{position: 'absolute'}}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Add New Entry Button */}
          <CustomButton
            onPress={addMoreImages}
            icon={<Icon name="add" size={20} color={Colors.white} />}
            title={'Neuer Eintrag'}
            buttonStyle={styles.addButton}
          />

          <SizedBox height={160} />
        </ScrollView>
      </View>
    </View>
  );
};

export default VisionBoard;
