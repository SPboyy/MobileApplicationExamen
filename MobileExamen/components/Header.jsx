// components/Header.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants'; 

const Header = () => (
    <View style={styles.header}>
        <Text style={styles.title}>Pokédex Lijst</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FF0000',
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#FFCC00',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default Header;