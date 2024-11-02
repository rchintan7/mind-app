import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomBottomSheet from '../../../../../components/customBottomSheet/customBottomSheet';
import SizedBox from '../../../../../components/sizedbox/sizedbox';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import Card from '../../../../../components/card/card';
import { styles } from './selectImageModal.styles';

interface SelectImageModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const SelectImageModal: React.FC<SelectImageModalProps> = ({ isVisible, onClose }) => {
    return (
        <CustomBottomSheet isVisible={isVisible} onClose={onClose} containerStyle={{ paddingTop: 12 }}>
            <View style={styles.modalDash} />
            <SizedBox height={30} />
            <View style={GlobalStyles.rowContainer}>
                <View style={styles.optionContainer}>
                    <Card style={styles.cardStyle}>
                        <Icon name="image" color={'rgba(46, 46, 46, 0.75)'} size={28} />
                    </Card>
                    <Text style={styles.modalText}>{`Aus Album\nauswählen`}</Text>
                </View>
                <View style={styles.optionContainer}>
                    <Card style={styles.cardStyle}>
                        <Icon name="camera" color={'rgba(46, 46, 46, 0.75)'} size={28} />
                    </Card>
                    <Text style={styles.modalText}>{`Foto\nmachen`}</Text>
                </View>
                <View style={styles.optionContainer}>
                    <Card style={styles.cardStyle}>
                        <Icon name="folder" color={'rgba(46, 46, 46, 0.75)'} size={28} />
                    </Card>
                    <Text style={styles.modalText}>{`Aus Dateien\nauswählen`}</Text>
                </View>
            </View>
            <SizedBox height={30} />
        </CustomBottomSheet>
    );
};

export default SelectImageModal;

