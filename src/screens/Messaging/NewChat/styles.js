import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_background: {
        flex: 1
    },
    header_container: {
        height: 60,
        backgroundColor: '#2CABE2',
        paddingHorizontal: 20,
        elevation: 3,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    header_text_container: {
        width: '92%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_text: {
        color: '#fff',
        fontFamily: 'Poppins Medium',
        fontSize: 20,
    },
    header_icon: {
        fontSize: 20,
        color: '#fff',
    },
    header_style: {
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 20,
    },
    header_title: {
        fontSize: 16,
        fontFamily: 'Poppins Medium',
        color: '#535353'
    },
    main_title: {
        fontSize: 17,
        fontFamily: 'Poppins Medium',
        color: '#101618'
    },
    sub_title: {
        fontSize: 12,
        fontFamily: 'Poppins Medium',
        color: '#101618'
    },
    contact_container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: '#f5f5f5'
    },
    contact_image: {
        height: 60,
        width: 60,
        borderRadius: 60,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        elevation: 1,
        padding: 5
    },
    contact_info_container: {
        marginLeft: 20
    }, contact_initials_container: {
        height: 60,
        width: 60,
        borderRadius: 60,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#fff',
        elevation: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6a5acd'
    }, contact_initials_text: {
        fontSize: 18,
        fontFamily: 'Poppins Medium',
        color: '#fff'
    },
    shimmerViewPlaceholder: {
        height: 100,
        borderRadius: 6,
        width: 'auto',
        marginHorizontal: 20,
        marginVertical: 10,
    },
});