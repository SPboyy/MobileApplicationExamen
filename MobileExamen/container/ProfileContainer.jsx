// container/ProfileContainer.jsx

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PROFILE_DATA } from '../data/Profile'; 
import { POKEMON_DATA } from '../data/Pokemon'; 

const ProfileContainer = ({ shinyCount }) => { 
    
    const totalPokemon = POKEMON_DATA.length;
    
    return (
        <View style={styles.profileContainer}>
            
            <Text style={styles.playerNameHeader}>{PROFILE_DATA.playerName}</Text>
            
            <View style={styles.shinyBox}>
                <Text style={styles.label}>Aantal Shinys:</Text>
                
                <Text style={styles.shinyCount}>
                    {shinyCount} / {totalPokemon}
                </Text>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    playerNameHeader: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FF0000',
        marginBottom: 40,
        marginTop: 50,
        textTransform: 'uppercase',
        borderBottomWidth: 4,
        borderBottomColor: '#FFCC00',
        paddingBottom: 5,
    },
    shinyBox: {
        width: '80%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    shinyCount: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFD700',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default ProfileContainer;