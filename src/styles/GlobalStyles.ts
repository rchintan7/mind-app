import { StyleSheet } from 'react-native';
import Colors from '../constants/colors'; // Import your color constants

const GlobalStyles = StyleSheet.create({
    // Spacing
    paddingHorizontal: {
        paddingHorizontal: 16,
    },
    paddingVertical: {
        paddingVertical: 16,
    },
    margin8: {
        margin: 16,
    },
    margin16: {
        margin: 16,
    },
    marginHorizontal: {
        marginHorizontal: 16,
    },
    marginVertical: {
        marginVertical: 16,
    },
    paddingTop: {
        paddingTop: 16,
    },
    paddingBottom: {
        paddingBottom: 16,
    },
    marginTop: {
        marginTop: 16,
    },
    marginBottom: {
        marginBottom: 16,
    },

    // Containers
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Buttons
    buttonPrimary: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonTextPrimary: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSecondary: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonTextSecondary: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Input fields
    inputField: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: Colors.textColor,
    },

    // Shadows
    shadowLight: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    shadowDefault: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    noShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },

    // Error
    controlError: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
        color: Colors.danger,
    },

    // Chat
    avatar: {
        height: 40,
        width: 40,
        marginRight: 8,
    },
    leftMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        maxWidth: '70%',
        marginBottom: 16,
    },
    chatDefaultContainer: {
        backgroundColor: '#F1F3F6',
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    chatDefaultText: {
        fontSize: 14,
        color: Colors.textColor,
    },
    rightMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        maxWidth: '80%',
        marginBottom: 16,
    },
    groupRightMessage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    chatSecondaryContainer: {
        backgroundColor: Colors.secondaryColor,
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    chatSecondaryText: {
        fontSize: 16,
        color: Colors.white,
    },
});

export default GlobalStyles;