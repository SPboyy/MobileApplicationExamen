// components/Header.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'; 
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Pokémon Lijst</Text>
            <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => {
                    navigation.navigate('Profile'); 
                }}
            >
                <Text style={styles.profileText}>👤</Text> 
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileButton: {
        padding: 5,
    },
    profileText: {
        fontSize: 28, 
    },
});

export default Header;