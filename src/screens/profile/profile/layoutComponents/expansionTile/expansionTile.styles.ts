import { StyleSheet } from 'react-native';
import Colors from '../../../../../constants/colors';
import GlobalStyles from '../../../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    cardStyle: {
        ...GlobalStyles.rowSpaceBetween,
        alignSelf: 'center',
        width: '95%',
        marginVertical: 5,
        paddingVertical: 14,
        paddingRight: 8
    },
    tileTitle: {
        fontSize: 16,
        fontWeight: '400',
        flex: 1,
        marginLeft: 10,
    },
    expandedText: {
        color: Colors.white,
    },
    collapsedText: {
        color: Colors.grey,
    },
    tileBody: {
        paddingVertical: 10,
    },
});

export default styles;