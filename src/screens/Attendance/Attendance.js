import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';

const background = require('../../assets/images/background.png');

const Attendance = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' or 'history'
  const [attendanceStatus, setAttendanceStatus] = useState('present'); // 'present' or 'absent'

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const toggleAttendance = (status) => {
    setAttendanceStatus(status);
  };

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

  const attendanceHistory = 
    [
      { "date": "01-12-2024", "inTime": "11:51 AM", "outTime": "06:09 PM", "totalHours": "6 Hrs" },
      { "date": "02-12-2024", "inTime": "10:42 AM", "outTime": "04:00 PM", "totalHours": "5 Hrs" },
      { "date": "03-12-2024", "inTime": "09:29 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs" },
      { "date": "04-12-2024", "inTime": "11:14 AM", "outTime": "05:13 PM", "totalHours": "5 Hrs" },
      { "date": "05-12-2024", "inTime": "10:33 AM", "outTime": "06:44 PM", "totalHours": "8 Hrs" },
      { "date": "06-12-2024", "inTime": "09:00 AM", "outTime": "05:00 PM", "totalHours": "8 Hrs" },
      { "date": "07-12-2024", "inTime": "08:45 AM", "outTime": "04:45 PM", "totalHours": "8 Hrs" },
      { "date": "08-12-2024", "inTime": "10:00 AM", "outTime": "05:30 PM", "totalHours": "7 Hrs 30 Min" },
      { "date": "09-12-2024", "inTime": "09:15 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs 45 Min" },
      { "date": "10-12-2024", "inTime": "10:00 AM", "outTime": "05:00 PM", "totalHours": "7 Hrs" },
      { "date": "11-12-2024", "inTime": "08:30 AM", "outTime": "04:30 PM", "totalHours": "8 Hrs" },
      { "date": "12-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "13-12-2024", "inTime": "10:15 AM", "outTime": "06:00 PM", "totalHours": "7 Hrs 45 Min" },
      { "date": "14-12-2024", "inTime": "09:10 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 20 Min" },
      { "date": "15-12-2024", "inTime": "09:30 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "16-12-2024", "inTime": "10:00 AM", "outTime": "05:45 PM", "totalHours": "7 Hrs 45 Min" },
      { "date": "17-12-2024", "inTime": "08:40 AM", "outTime": "04:50 PM", "totalHours": "8 Hrs 10 Min" },
      { "date": "18-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "19-12-2024", "inTime": "10:15 AM", "outTime": "06:30 PM", "totalHours": "8 Hrs 15 Min" },
      { "date": "20-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "21-12-2024", "inTime": "08:50 AM", "outTime": "05:00 PM", "totalHours": "8 Hrs 10 Min" },
      { "date": "22-12-2024", "inTime": "10:00 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs" },
      { "date": "23-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "24-12-2024", "inTime": "09:10 AM", "outTime": "05:40 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "25-12-2024", "inTime": "10:00 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs" },
      { "date": "26-12-2024", "inTime": "09:30 AM", "outTime": "05:00 PM", "totalHours": "7 Hrs 30 Min" },
      { "date": "27-12-2024", "inTime": "08:30 AM", "outTime": "05:00 PM", "totalHours": "8 Hrs 30 Min" },
      { "date": "28-12-2024", "inTime": "09:15 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 15 Min" },
      { "date": "29-12-2024", "inTime": "10:00 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs" },
      { "date": "30-12-2024", "inTime": "08:45 AM", "outTime": "04:45 PM", "totalHours": "8 Hrs" }
    ];

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
              <TouchableOpacity style={[styles.calendar_btn, activeTab === 'calendar' ? styles.calendar_btn_active : styles.calendar_btn_inactive]} onPress={() => toggleTab('calendar')} activeOpacity={0.8}>
                <IonIcon name="calendar" style={styles.calendar_btn_icon} />
                <Text style={styles.calendar_btn_text}>Calendar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.calendar_btn, activeTab === 'history' ? styles.calendar_btn_active : styles.calendar_btn_inactive]} onPress={() => toggleTab('history')} activeOpacity={0.8}>
                <IonIcon name="timer" style={styles.calendar_btn_icon} />
                <Text style={styles.calendar_btn_text}>History</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.attendance_btn_container}>
              <TouchableOpacity style={[styles.attendance_btn, attendanceStatus === 'present' ? styles.attendance_btn_active : styles.attendance_btn_inactive]} onPress={() => toggleAttendance('present')} activeOpacity={0.8}>
                <Text style={styles.attendance_btn_text}>Present</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.attendance_btn, attendanceStatus === 'absent' ? styles.attendance_btn_active : styles.attendance_btn_inactive]} onPress={() => toggleAttendance('absent')} activeOpacity={0.8}>
                <Text style={styles.attendance_btn_text}>Absent</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            activeTab === 'calendar' && (
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
            )
          }

          {
            activeTab === 'history' && (
              <View style={styles.history_tab_container}>
                <View style={styles.history_card}>
                  <View style={styles.history_card_header}>
                    <Text style={styles.history_header_text}>Date</Text>
                    <Text style={styles.history_header_text}>In Time</Text>
                    <Text style={styles.history_header_text}>Out Time</Text>
                    <Text style={styles.history_header_text}>Total Hrs</Text>
                  </View>
                  <View  style={styles.history_card_body} >
                    <FlatList data={attendanceHistory} keyExtractor={(item) => item.date} renderItem={({item}) => (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.history_card_body_text}>{item.date}</Text>
                        <Text style={styles.history_card_body_text}>{item.inTime}</Text>
                        <Text style={styles.history_card_body_text}>{item.outTime}</Text>
                        <Text style={styles.history_card_body_text}>{item.totalHours}</Text>
                      </View>
                    )} />
                    
                  </View>
                </View>
              </View>
            )
          }
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Attendance;