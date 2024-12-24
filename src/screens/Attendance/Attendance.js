import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Calendar } from 'react-native-calendars';
import { moderateScale } from 'react-native-size-matters';

const background = require('../../assets/images/background.png');

const Attendance = ({ navigation }) => {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Get 1-based month

  const [disableRightArrow, setDisableRightArrow] = useState(false);
  const [disableLeftArrow, setDisableLeftArrow] = useState(false);

  // Function to check and update arrow states
  const checkArrowState = (year, month) => {
    const minYear = currentYear - 3; // Allow up to 3 years back

    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      setDisableRightArrow(true);
      setDisableLeftArrow(false); // Allow going back
    } else if (year < minYear) {
      setDisableLeftArrow(true);
      setDisableRightArrow(false); // Allow going forward
    } else {
      // Within the allowed range, enable/disable arrows based on the month
      setDisableRightArrow(year === currentYear && month === currentMonth);
      setDisableLeftArrow(year === minYear && month === 1);
    }
  };

  useEffect(() => {
    checkArrowState(currentYear, currentMonth);
  }, []);

  const handleMonthChange = (data) => {
    const { year, month } = data;
    checkArrowState(year, month);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.image_background}>
        <View style={styles.header_container}>
          <TouchableOpacity onPress={() => navigation.navigate(Constants.DASHBOARD)} activeOpacity={0.8}>
            <Icon name="long-arrow-alt-left" style={styles.header_icon} />
          </TouchableOpacity>
          <View style={styles.header_text_container}>
            <Text style={styles.header_text}>Attendance</Text>
          </View>
        </View>
        <View style={styles.background_style}></View>
        <View style={styles.attendance_content_container}>
          <View style={styles.calendar_btn_container}>
            <View style={styles.calendar_btn_group_1}>
              <TouchableOpacity style={styles.calendar_btn}>
                <Text style={styles.calendar_btn_text}>Calendar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.calendar_btn}>
                <Text style={styles.calendar_btn_text}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.calendar_with_dates_container}>
            <Calendar
              disableMonthChange={true} //Works only when hideExtraDays={false}
              style={styles.calendar_list}
              current={`${currentYear}-${(currentMonth).toString().padStart(2, '0')}-01`} // Set to the first day of the current month
              onMonthChange={(data) => handleMonthChange(data)}
              disableArrowLeft={disableLeftArrow}
              disableArrowRight={disableRightArrow}
              markingType="period"
              markedDates={{
                '2024-11-05': { startingDay: true, color: 'rgba(255,40,40,100)', textColor: 'white' },
                '2024-11-06': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-07': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-08': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-09': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-10': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-11': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-12': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-13': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-14': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-15': { color: 'rgba(255,40,40,0.4)', textColor: 'white' },
                '2024-11-16': { endingDay: true, color: 'rgba(255,40,40,100)', textColor: 'white' },
                '2024-12-05': { startingDay: true, color: 'rgba(68,196,94,100)', textColor: 'white' },
                '2024-12-06': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-07': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-08': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-09': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-10': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-11': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-12': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-13': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-14': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-15': { color: 'rgba(68,196,94,0.4)', textColor: 'white' },
                '2024-12-16': { endingDay: true, color: 'rgba(68,196,94,100)', textColor: 'white' },
              }}
              horizontal={true} // Enable horizontal scrolling
              showScrollIndicator={true}
              calendarWidth={380}
              theme={{
                monthTextColor: 'rgba(0,0,0,0.8)',
                textDayFontFamily: 'Poppins Medium',
                textMonthFontFamily: 'Poppins Medium',
                textDayHeaderFontFamily: 'Poppins Medium',
                textDayFontWeight: '500',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '500',
                textDayFontSize: 12,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Attendance;