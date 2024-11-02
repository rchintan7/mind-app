import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import GlobalStyles from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 120
  },
  header: {
    ...GlobalStyles.rowSpaceBetween,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    color: Colors.textColor
  },
  entriesCardStyle: {
    ...GlobalStyles.rowCenter,
    marginHorizontal: 16,
  },
  entriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryColor,
  },
  xpText: {
    fontSize: 18,
    color: Colors.secondaryColor,
    fontWeight: '700'
  },
  calendarCard: {
    marginTop: 0,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayOfWeekText: {
    textAlign: 'center',
    color: Colors.grey
  },
  daysCalendarContainer: {
    ...GlobalStyles.rowContainer,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCalendarContainer: {
    ...GlobalStyles.center,
    marginBottom: 8,
  },
  calendarDate: {
    ...GlobalStyles.center,
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 50
  },
  selectedCalendarDate: {
    backgroundColor: Colors.textColor,
  },
  dayCalendarText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.textColor
  },
  selectedDayText: {
    color: Colors.white
  },
  legendColor: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: Colors.white
  },
  navigationContainer: {
    ...GlobalStyles.rowSpaceBetween,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  arrowButton: {
    padding: 10,
  },
  weekLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textColor
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
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
  emojiContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  titleSection: {
    ...GlobalStyles.rowSpaceBetween,
    marginTop: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textColor
  },
  cardStyle: {
    marginHorizontal: 16
  },
  moodMapSection: {
    ...GlobalStyles.rowSpaceBetween,
    ...GlobalStyles.marginHorizontal,
  },
  moodMapText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textColor,
  },
  levelLine: {
    height: 2,
    width: 70,
    marginVertical: 4,
    backgroundColor: Colors.primaryColor,
    marginLeft: 16
  },
  moodMapAnalyseContainer: {
    ...GlobalStyles.rowContainer,
    ...GlobalStyles.center,
    flexWrap: 'wrap',
    marginTop: 12,
    marginHorizontal: 16,
  },
  moodMapAnalyseCard: {
    alignSelf: 'flex-start',
    margin: 6,
    padding: 8,
  },
  moodMapAnalyseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textColor,
  },
  filterText: {
    fontSize: 12,
    color: Colors.grey,
  },
  valueText: {
    fontSize: 12,
    color: Colors.textColor
  },
  socialBattery: {
    marginHorizontal: 16
  },
  trendsCard: {
    alignSelf: 'flex-start',
    margin: 8,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  smileContainer: {
    backgroundColor: '#F9F9F9',
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 6
  },
  trendsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textColor,
  },
  trendsSubtitle: {
    fontSize: 10,
    color: Colors.grey300,
  },
  entryCard: {
    flex: 1,
    marginHorizontal: 0,
    // alignSelf: 'center',
    padding: 8,
  },
  smallLevelline: {
    height: 2,
    width: 40,
    marginVertical: 4,
    backgroundColor: Colors.primaryColor,
    marginLeft: 0,
  },
  entryNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryColor,
    textAlign: 'center'
  },
  entryLabel: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: 'center'
  }
});