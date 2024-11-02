import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './loader.styles';
import Colors from '../../constants/colors';

const isIos = Platform.OS === "ios";

interface LoaderProps {
    loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
    return (
        <Modal
            isVisible={loading}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.4}
            style={styles.modal}
        >
            <View style={styles.modalBackground}>
                <View style={isIos ? styles.activityIndicatorWrapperIos : styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color={Colors.primaryColor}
                        size="large"
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;