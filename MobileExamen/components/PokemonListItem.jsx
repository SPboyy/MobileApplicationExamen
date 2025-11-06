import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTypeColor = (type) => {
  const colors = {
    Grass: '#7AC74C', Fire: '#EE8130', Water: '#6390F0',
    Poison: '#A33EA1', Flying: '#A98FF3', Electric: '#F7D02C',
    Bug: '#A6B91A', Ghost: '#735797', Dragon: '#6F35FC',
    Psychic: '#F95587', None: '#ccc'
  };
  return colors[type] || '#68A090';
};

const PokemonListItem = ({ pokemon, navigation, isShiny, toggleShiny }) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('PokemonDetails', { pokemon })}
      style={styles.card}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.index}>#{pokemon.pokedex_index}</Text>
        <Text style={styles.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text style={[styles.type, { color: getTypeColor(pokemon.type_1) }]}>
          {pokemon.type_2 === 'None'
            ? pokemon.type_1
            : `${pokemon.type_1} / ${pokemon.type_2}`}
        </Text>
      </View>

      <Pressable onPress={toggleShiny}>
        <MaterialCommunityIcons
          name={isShiny ? 'star' : 'star-outline'}
          size={28}
          color={isShiny ? '#FFD700' : '#CCC'}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
    elevation: 2,
  },
  index: { color: '#888', fontSize: 12, fontWeight: 'bold' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  type: { fontSize: 12, fontWeight: '600', marginTop: 4 },
});

export default PokemonListItem;
