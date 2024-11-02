import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import GlobalStyles from '../../../styles/GlobalStyles';

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    newEntrySection: {
        ...GlobalStyles.rowSpaceBetween,
        ...GlobalStyles.marginHorizontal,
        marginTop: 15,
    },
    entry: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    goalContainer: {
        ...GlobalStyles.rowCenter,
        marginTop: 20,
        flexWrap: 'wrap',
    },
    goalCard: {
        alignSelf: 'flex-start',
        margin: 8,
        width: 140,
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textColor,
    },
    goalSubtitle: {
        fontSize: 10,
        color: Colors.grey300,
    },
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
        marginLeft: 16,
    },

});
