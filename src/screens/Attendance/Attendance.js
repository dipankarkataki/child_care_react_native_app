import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Constants from '../../Navigation/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import StudentApi from '../../api/FamilyApi/StudentApi';
import GetAttendanceApi from '../../api/AttendanceApi/GetAttendanceApi';
import moment from 'moment';
import { moderateVerticalScale, scale } from 'react-native-size-matters';


const background = require('../../assets/images/background.png');

const Attendance = ({ navigation }) => {

  const userProfileData = useSelector((state) => state.userProfileData);

  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' or 'history'
  const [attendanceStatus, setAttendanceStatus] = useState('present'); // 'present' or 'absent'
  const [markedDates, setMarkedDates] = useState({});
  const [dropdownValue, setDropdownValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [selectedCurrentYear, setSelectedCurrentYear] = useState();
  const [selectedCurrentMonth, setSelectedCurrentMonth] = useState();
  const [disableRightArrow, setDisableRightArrow] = useState(false);
  const [disableLeftArrow, setDisableLeftArrow] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const updateMarkedDates = () => {
    if (selectedCurrentMonth == null) {
      setSelectedCurrentMonth(currentMonth)
    }
    const daysInMonth = new Date(currentYear, selectedCurrentMonth, 0).getDate(); // Last day of the month
    const allDates = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${currentYear}-${String(selectedCurrentMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      allDates.push(date);
    }

    const newMarkedDates = {};

    allDates.forEach((date) => {
      if (attendanceData.includes(date)) {
        newMarkedDates[date] = { color: 'rgba(68,196,94,100)', textColor: 'white' }; // Present
      } else {
        newMarkedDates[date] = { color: 'rgba(255,40,40,100)', textColor: 'white' }; // Absent
      }
    });

    setMarkedDates(newMarkedDates);
  };

  // Function to check and update arrow states
  const checkArrowState = (year, month) => {
    const minYear = currentYear; // Allow up to 3 years back

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
    const fetchStudentData = async () => {
      try {
        const result = await StudentApi(userProfileData.family_id);

        if (result.status === 200 && result.data.data) {
          const studentDropdownData = result.data.data.map((student) => ({
            label: `${student.firstname} ${student.lastname}`,
            value: student.id,
          }));
          setStudents(studentDropdownData);
        }
      } catch (err) {
        console.error('Error', err);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const result = await GetAttendanceApi(dropdownValue);
        if (result.status === 200 && result.data.data) {
          const attendanceDates = result.data.data.map((student) => student.attend_date)
          // console.log('Attendance Dates', attendanceDates)
          setAttendanceData(attendanceDates);

          const historyData = result.data.data.map((student) => {
            // Parse the check-in and check-out times using moment
            const checkin = moment(student.checkin_datetime, "HH:mm:ss");
            const checkout = moment(student.checkout_datetime, "HH:mm:ss");

            // Calculate the total hours and format it
            const totalHours = moment
              .duration(checkout.diff(checkin))
              .asHours()
              .toFixed(2); // Keep 2 decimal places
            
            const formattedDate = moment(student.attend_date, "YYYY-MM-DD").format("MM-DD-YYYY");
            const formattedCheckin = checkin.format("hh:mm A"); // Example: 03:41 PM
            const formattedCheckout = checkout.format("hh:mm A"); // Example: 06:41 PM
          
            return {
              id: student.id,
              date: formattedDate,
              inTime: formattedCheckin,
              outTime: formattedCheckout,
              totalHours: `${totalHours} Hrs`, // Dynamically calculated
            };
          });
          setAttendanceHistory(historyData);
        }

      } catch (err) {
        console.error('Failed to fetch Attendance', err);
      }
    }
    fetchAttendance();
    checkArrowState(currentYear, currentMonth);
    updateMarkedDates();
  }, [dropdownValue]);

  useEffect(() => {
    updateMarkedDates();
  }, [attendanceData, selectedCurrentMonth, currentMonth]);

  const handleMonthChange = (data) => {
    const { year, month } = data;
    setSelectedCurrentYear(year);
    setSelectedCurrentMonth(month);
    checkArrowState(year, month);
  };

  // const attendanceHistory = [
  //   { "date": "01-12-2024", "inTime": "11:51 AM", "outTime": "06:09 PM", "totalHours": "6 Hrs" },
  //   { "date": "02-12-2024", "inTime": "10:42 AM", "outTime": "04:00 PM", "totalHours": "5 Hrs" },
  //   { "date": "03-12-2024", "inTime": "09:29 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs" },
  //   { "date": "04-12-2024", "inTime": "11:14 AM", "outTime": "05:13 PM", "totalHours": "5 Hrs" },
  //   { "date": "05-12-2024", "inTime": "10:33 AM", "outTime": "06:44 PM", "totalHours": "8 Hrs" },
  //   { "date": "06-12-2024", "inTime": "09:00 AM", "outTime": "05:00 PM", "totalHours": "8 Hrs" },
  //   { "date": "07-12-2024", "inTime": "08:45 AM", "outTime": "04:45 PM", "totalHours": "8 Hrs" },
  //   { "date": "08-12-2024", "inTime": "10:00 AM", "outTime": "05:30 PM", "totalHours": "7 Hrs 30 Min" },
  //   { "date": "09-12-2024", "inTime": "09:15 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs 45 Min" },
  //   { "date": "10-12-2024", "inTime": "10:00 AM", "outTime": "05:00 PM", "totalHours": "7 Hrs" },
  //   { "date": "11-12-2024", "inTime": "08:30 AM", "outTime": "04:30 PM", "totalHours": "8 Hrs" },
  //   { "date": "12-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "13-12-2024", "inTime": "10:15 AM", "outTime": "06:00 PM", "totalHours": "7 Hrs 45 Min" },
  //   { "date": "14-12-2024", "inTime": "09:10 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 20 Min" },
  //   { "date": "15-12-2024", "inTime": "09:30 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "16-12-2024", "inTime": "10:00 AM", "outTime": "05:45 PM", "totalHours": "7 Hrs 45 Min" },
  //   { "date": "17-12-2024", "inTime": "08:40 AM", "outTime": "04:50 PM", "totalHours": "8 Hrs 10 Min" },
  //   { "date": "18-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "19-12-2024", "inTime": "10:15 AM", "outTime": "06:30 PM", "totalHours": "8 Hrs 15 Min" },
  //   { "date": "20-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "21-12-2024", "inTime": "08:50 AM", "outTime": "05:00 PM", "totalHours": "8 Hrs 10 Min" },
  //   { "date": "22-12-2024", "inTime": "10:00 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs" },
  //   { "date": "23-12-2024", "inTime": "09:00 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "24-12-2024", "inTime": "09:10 AM", "outTime": "05:40 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "25-12-2024", "inTime": "10:00 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs" },
  //   { "date": "26-12-2024", "inTime": "09:30 AM", "outTime": "05:00 PM", "totalHours": "7 Hrs 30 Min" },
  //   { "date": "27-12-2024", "inTime": "08:30 AM", "outTime": "05:00 PM", "totalHours": "8 Hrs 30 Min" },
  //   { "date": "28-12-2024", "inTime": "09:15 AM", "outTime": "05:30 PM", "totalHours": "8 Hrs 15 Min" },
  //   { "date": "29-12-2024", "inTime": "10:00 AM", "outTime": "06:00 PM", "totalHours": "8 Hrs" },
  //   { "date": "30-12-2024", "inTime": "08:45 AM", "outTime": "04:45 PM", "totalHours": "8 Hrs" }
  // ];

  const renderLabel = () => {
    if (dropdownValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Students
        </Text>
      );
    }
    return null;
  };

  const handleDropdownValue = (item) => {
    setDropdownValue(item.value);
    setIsFocus(false);
  }

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
            {
              activeTab === 'calendar' && (
                <View style={styles.attendance_btn_container}>
                  <TouchableOpacity style={styles.attendance_btn} activeOpacity={1}>
                    <View style={[styles.indicator, {backgroundColor:'rgba(68,196,94,100)'}]}></View>
                    <Text style={styles.attendance_btn_text}>Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.attendance_btn} activeOpacity={1}>
                    <View style={[styles.indicator, {backgroundColor: 'rgba(255,40,40,100)'}]}></View>
                    <Text style={styles.attendance_btn_text}>Absent</Text>
                  </TouchableOpacity>
                </View>
              )
            }

          </View>

          <View style={styles.dropdown_container}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={students}
              itemTextStyle={{ color: 'rgba(0,0,0,0.8)' }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Student' : '...'}
              searchPlaceholder="Search..."
              value={dropdownValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => handleDropdownValue(item)}
            />
          </View>
          {
            activeTab === 'calendar' && (
              attendanceData.length > 0 ? (
                <View style={styles.calendar_with_dates_container}>
                  <Calendar
                    disableMonthChange={true} // Works only when hideExtraDays={false}
                    style={styles.calendar_list}
                    current={`${currentYear}-${(currentMonth).toString().padStart(2, '0')}-01`} // Set to the first day of the current month
                    onMonthChange={(data) => handleMonthChange(data)}
                    disableArrowLeft={disableLeftArrow}
                    disableArrowRight={disableRightArrow}
                    markingType="period"
                    markedDates={markedDates}
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
                      textDayHeaderFontSize: 12,
                    }}
                  />
                </View>
              ) : (
                <Text
                  style={[
                    styles.history_note_text,
                    {
                      color: 'crimson',
                      textAlign: 'center',
                      marginTop: moderateVerticalScale(20),
                      fontSize: scale(16),
                    },
                  ]}
                >
                  Oops! No attendance data available.
                </Text>
              )
            )
          }


          {
            activeTab === 'history' && (

              attendanceHistory.length > 0 ? (
                <View>
                  <Text style={styles.history_note_text}>Note: Last 30 days attendance history.</Text>
                  <View style={styles.history_tab_container}>
                    <View style={styles.history_card}>
                      <View style={styles.history_card_header}>
                        <Text style={styles.history_header_text}>Date</Text>
                        <Text style={styles.history_header_text}>In Time</Text>
                        <Text style={styles.history_header_text}>Out Time</Text>
                        <Text style={styles.history_header_text}>Total Hrs</Text>
                      </View>
                      <View style={styles.history_card_body} >
                        <FlatList data={attendanceHistory} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.history_card_body_text}>{item.date}</Text>
                            <Text style={styles.history_card_body_text}>{item.inTime}</Text>
                            <Text style={styles.history_card_body_text}>{item.outTime}</Text>
                            <Text style={styles.history_card_body_text}>{item.totalHours}</Text>
                          </View>
                        )} />
                      </View>
                    </View>
                  </View>
                </View>
              ) :
                (<Text style={[styles.history_note_text, { color: 'crimson', textAlign: 'center', marginTop: moderateVerticalScale(20), fontSize: scale(16) }]}>Oops! No history available.</Text>)
            )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Attendance;