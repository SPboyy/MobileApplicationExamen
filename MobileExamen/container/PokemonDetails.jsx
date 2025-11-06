import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PokemonDetails = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        #{pokemon.pokedex_index} {pokemon.name.toUpperCase()}
      </Text>

      <View style={styles.box}>
        <Text style={styles.label}>Type 1:</Text>
        <Text style={styles.value}>{pokemon.type_1}</Text>
      </View>

      {pokemon.type_2 !== 'None' && (
        <View style={styles.box}>
          <Text style={styles.label}>Type 2:</Text>
          <Text style={styles.value}>{pokemon.type_2}</Text>
        </View>
      )}

      <Text style={styles.desc}>
        {pokemon.description || 'Geen beschrijving beschikbaar.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  box: { flexDirection: 'row', marginBottom: 10 },
  label: { fontWeight: 'bold', color: '#555', marginRight: 5 },
  value: { color: '#333' },
  desc: { marginTop: 20, fontSize: 16, color: '#666' },
});

export default PokemonDetails;
