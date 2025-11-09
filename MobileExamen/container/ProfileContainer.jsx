import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PROFILE_DATA } from '../data/Profile';

const ProfileContainer = ({ shinyCount }) => {
  const totalCount = 1025; // ✅ vaste waarde

  return (
    <View style={styles.profileContainer}>
      <MaterialCommunityIcons
        name="pokeball"
        size={80}
        color="#FF0000"
        style={styles.pokeballIcon}
      />

      <Text style={styles.playerNameHeader}>{PROFILE_DATA.playerName}</Text>
      <Text style={styles.subHeader}>Trainer sinds {PROFILE_DATA.trainerSince}</Text>

      <View style={styles.shinyBox}>
        <Text style={styles.label}>Aantal Shinys:</Text>
        <Text style={styles.shinyCount}>
          {shinyCount} / {totalCount}
        </Text>
      </View>

      <Text style={styles.footer}>Pokédex totaal: {totalCount} Pokémon</Text>
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
  pokeballIcon: {
    marginTop: 60,
    marginBottom: 20,
  },
  playerNameHeader: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FF0000',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottomWidth: 4,
    borderBottomColor: '#FFCC00',
    paddingBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    color: '#888',
    marginBottom: 30,
    fontWeight: '600',
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
  footer: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
});

export default ProfileContainer;
