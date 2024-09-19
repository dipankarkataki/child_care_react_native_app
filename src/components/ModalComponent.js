import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import React from 'react';
const successImage = require('../assets/images/verified.png');
const infoImage = require('../assets/images/info.png');
const warningImage = require('../assets/images/warning.png');
const errorImage = require('../assets/images/error.png');

const ModalComponent = ({ message, icon, modalVisible, setModalVisible, onClose }) => {
    const handleModalClose = () => {
        setModalVisible(false);
        if (onClose) {
            onClose();
        }
    };

    const renderIcon = () => {
        if (icon === 'success') {
            return <Image source={successImage} style={styles.icon} />;
        } else if (icon === 'error') {
            return <Image source={errorImage} style={styles.icon} />;
        } else if (icon === 'warning') {
            return <Image source={warningImage} style={styles.icon} />;
        } else if (icon === 'info') {
            return <Image source={infoImage} style={styles.icon} />;
        }else {
            return <Text>No Icon Available</Text>;
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleModalClose}
        >
            <View style={styles.backdrop}>
                <View style={styles.modalView}>
                    { renderIcon() }
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleModalClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ModalComponent;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 30,
        textAlign: 'center',
        color:"#000",
        fontWeight:'500'
    },
    icon: {
        marginBottom: 30,
        height:70,
        width:70
    },
});
