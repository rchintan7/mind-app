import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
import GlobalStyles from '../../../styles/GlobalStyles';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  navigationContainer: {
    ...GlobalStyles.rowSpaceBetween,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  arrowButton: {
    padding: 10,
  },
  weekLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textColor,
  },
  weekContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    width: 30,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectedDayContainer: {
    backgroundColor: 'black',
  },
  dayName: {
    color: Colors.textColor,
  },
  selectedDayName: {
    color: Colors.white,
  },
  dayDate: {
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  selectedDate: {
    color: Colors.white,
  },
  greenBackgroundWrapper: {
    height: 120,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  greenBackground: {
    height: 120,
    width: '100%',
    borderRadius: 6,
  },
  greenBackgroundContent: {
    flexDirection: 'row',
    position: 'absolute',
    padding: 16,
  },
  greenBackgroundTextContainer: {
    flex: 1,
  },
  challengeText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  challengeDescription: {
    color: Colors.white,
  },
  circularProgressText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
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
  destination: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textColor,
    textAlign: 'right',
  },
  showMore: {
    fontSize: 12,
    color: Colors.grey,
  },
  buttonContainer: {
    ...GlobalStyles.rowContainer,
    ...GlobalStyles.margin16,
  },
  customButtonStyle: {
    flex: 1,
    paddingHorizontal: 0,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textColor,
  },
  iconButtonStyle: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
  },
  outlinedButtonIconStyle: {
    marginRight: 0,
  },
  chipContainer: {
    flexWrap: 'wrap',
    marginVertical: 6,
  },
  emoji: {
    fontSize: 18,
    marginRight: 4,
  },
  bodyText: {
    color: Colors.textColor,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textColor,
  },
  startGoal: {
    ...GlobalStyles.rowContainer,
    ...GlobalStyles.marginHorizontal,
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 8,
  },
  startGoalText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    fontSize: 14,
    color: Colors.textColor,
  },
  playIcon: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderRadius: 4,
    ...GlobalStyles.center,
  },
  goalContainer: {
    ...GlobalStyles.rowCenter,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  goalCard: {
    alignSelf: 'flex-start',
    margin: 8, // You can adjust the margin for spacing between cards
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
  valueText: {
    fontSize: 12,
    color: Colors.textColor,
  },
  levelLine: {
    height: 2,
    width: 70,
    marginVertical: 4,
    backgroundColor: Colors.primaryColor,
    marginLeft: 16,
  },
  header: {
    ...GlobalStyles.rowSpaceBetween,
    width: '100%',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayOfWeekText: {
    textAlign: 'center',
    color: Colors.grey,
  },
  daysContainer: {
    ...GlobalStyles.rowContainer,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayContainer1: {
    ...GlobalStyles.center,
    height: 30,
    marginBottom: 8,
  },
  calendarDate: {
    ...GlobalStyles.center,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  selectedCalendarDate: {
    backgroundColor: Colors.textColor,
  },
  dayText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    position: 'absolute',
    color: Colors.textColor,
  },
  selectedDayText: {
    color: Colors.white,
  },
  cardStyle: {
    alignSelf: 'flex-start',
    marginHorizontal: 0,
    marginRight: 12,
  },
  noShadowCardStyle: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 0,
    ...GlobalStyles.noShadow,
  },
});
