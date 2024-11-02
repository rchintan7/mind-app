import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.container,
        paddingVertical: 8,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 200,
        paddingHorizontal: 16,
    },
    profileSection: {
        ...GlobalStyles.rowSpaceBetween,
        paddingBottom: 10,
        paddingHorizontal: 16,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textColor,
    },
    subText: {
        fontSize: 14,
        color: Colors.grey,
    },
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    progressBarContainer: {
        position: 'absolute',
        right: 0,
        ...GlobalStyles.center,
    },
    circularProgressBar: {
        width: 50,
        height: 50,
        borderRadius: 60,
        ...GlobalStyles.center,
    },
    progressCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#e9fbf6',
        ...GlobalStyles.center,
    },
    progressIndicator: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: Colors.primaryColor,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        position: 'absolute',
        transform: [{ rotate: '0deg' }],
    },
    levelSection: {
        ...GlobalStyles.rowSpaceBetween,
        marginVertical: 20,
    },
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryColor,
    },
    levelLine: {
        height: 2,
        width: 70,
        marginVertical: 4,
        backgroundColor: Colors.primaryColor,
    },
    xpText: {
        fontSize: 10,
        color: Colors.grey,
    },
    circularProgressText: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.primaryColor
    },
    levelIconContainer: {
        height: 40,
        width: 40,
        backgroundColor: Colors.secondaryColor,
        borderRadius: 6,
        ...GlobalStyles.center,
    },
    cardsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewTaskButton: {
        // marginTop: 16,
        borderRadius: 6
    },
    card: {
        width: '23%',
        margin: 0,
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: 'center',
    },
    cardIconContainer: {
        height: 40,
        width: 40,
        backgroundColor: Colors.primaryColor,
        borderRadius: 50,
        ...GlobalStyles.center,
    },
    cardLine: {
        height: 5,
        width: 40,
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        marginVertical: 10,
    },
    cardText: {
        fontSize: 10,
        color: Colors.textColor,
        textAlign: 'center',
    },
    cardStatusIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 12,
        backgroundColor: Colors.primaryColor,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        ...GlobalStyles.center,
    },
    moodSelector: {
        marginVertical: 20,
    },
    moodTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textColor,
    },
    showMore: {
        fontSize: 12,
        color: Colors.grey,
    },
    moodIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    moodCard: {
        width: '18%',
        paddingVertical: 10,
        backgroundColor: Colors.white,
        borderRadius: 6,
        alignItems: 'center',
        ...GlobalStyles.shadowLight
    },
    selectedMoodCard: {
        borderColor: Colors.secondaryColor,
        borderWidth: 2,
    },
    moodEmoji: {
        fontSize: 30,
    },
    moodText: {
        fontSize: 10,
        color: Colors.grey,
        marginTop: 5,
    },
    selectedMoodText: {
        color: Colors.secondaryColor,
        fontWeight: 'bold',
    },
    socialBatteryCard: {
        marginTop: 0,
        marginHorizontal: 0,
        marginBottom: 20
    },
    journalButton: {
        ...GlobalStyles.rowContainer,
        ...GlobalStyles.center,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.secondaryColor,
        borderRadius: 5,
    },
    journalText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.secondaryColor,
        marginLeft: 10,
    },
    buttonContainer: {
        ...GlobalStyles.rowContainer,
        marginTop: 16
    },
    customButtonStyle: {
        flex: 1,
        paddingHorizontal: 0,
        borderRadius: 6
    },
    outlinedButtonStyle: {
        flex: 1,
        paddingHorizontal: 0,
        borderRadius: 6
    },
    trainingSection: {
        padding: 16,
        marginVertical: 20,
        backgroundColor: Colors.secondaryColor,
        borderRadius: 8,
        ...GlobalStyles.shadowLight,
    },
    trainingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 10,
    },
    trainingSubText: {
        fontSize: 14,
        color: Colors.white,
        marginBottom: 10,
    },
    trainingButtonContainer: {
        ...GlobalStyles.rowContainer,
        marginBottom: 20,
    },
    trainingButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        marginRight: 6,
    },
    trainingImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    dailyAffirmation: {
        ...GlobalStyles.rowContainer,
        margin: 0,
        marginTop: 12,
        paddingLeft: 12,
        paddingRight: 8,
        paddingVertical: 8,
    },
    checked: {
        height: 30,
        width: 30,
        backgroundColor: Colors.primaryColor,
        borderRadius: 4,
        ...GlobalStyles.center,
    },
    uncheck: {
        height: 30,
        width: 30,
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 4,
        ...GlobalStyles.center,
    },
    dailyAffirmationText: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
        fontSize: 14,
        color: Colors.textColor
    },
    moodMapSection: {
        ...GlobalStyles.rowSpaceBetween,
        marginTop: 20,
    },
    moodMapContainer: {
        marginTop: 10,
        padding: 12,
        borderRadius: 6,
        backgroundColor: Colors.white,
        ...GlobalStyles.rowContainer,
        ...GlobalStyles.shadowLight
    },
    emojiContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 40,
    },
    personalGrowthWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16
    },
    personalGrowthContainer: {
        padding: 16,
        width: (Dimensions.get('window').width / 2) - 24,
        borderRadius: 6,
        backgroundColor: Colors.white,
        ...GlobalStyles.shadowLight
    },
    personalGrowthText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.textColor,
        marginTop: 12,
        marginBottom: 4
    },
    personalGrowthSubText: {
        fontSize: 12,
        color: Colors.grey
    },
    quoteSection: {
        ...GlobalStyles.rowContainer,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: Colors.primaryColor,
        borderRadius: 6,
        ...GlobalStyles.rowContainer,
        ...GlobalStyles.shadowLight,
    },
    quoteText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: Colors.white,
        marginRight: 16
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: Colors.grey,
    },
});