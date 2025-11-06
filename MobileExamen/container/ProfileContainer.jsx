import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { POKEMON_DATA } from '../data/Pokemon';

const ProfileContainer = ({ shinyCount }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="pokeball" size={80} color="#FF0000" />
      <Text style={styles.name}>SPboyy</Text>
      <Text style={styles.subtitle}>Trainer sinds 2023</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Aantal Shiny Pokémon:</Text>
        <Text style={styles.count}>
          {shinyCount} / {POKEMON_DATA.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80,
  },
  name: { fontSize: 28, fontWeight: '900', color: '#FF0000', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 40 },
  box: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  count: { fontSize: 36, fontWeight: 'bold', color: '#FFD700', marginTop: 5 },
});

export default ProfileContainer;
