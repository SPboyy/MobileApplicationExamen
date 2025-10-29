// components/PokemonListItem.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const getTypeColor = (type) => {
  const colors = {
    'Grass': '#7AC74C', 'Fire': '#EE8130', 'Water': '#6390F0',
    'Poison': '#A33EA1', 'Electric': '#F7D02C', 'None': '#ccc',
  };
  return colors[type] || '#68A090';
};

const PokemonListItem = ({ pokemon, navigation }) => { // <-- Ontvang 'navigation'
  return (
    <TouchableOpacity 
      style={styles.listItem}
      // Navigeer naar de Stack Screen
      onPress={() => navigation.navigate('PokemonDetails', { pokemonData: pokemon })} 
    >
      <View style={styles.textContainer}>
        <Text style={styles.indexText}>#{pokemon.pokedex_index}</Text>
        <Text style={styles.nameText}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
      </View>

      <View style={styles.tagContainer}>
        <Text style={[styles.typeTag, { backgroundColor: getTypeColor(pokemon.type_1) }]}>
          {pokemon.type_1}
        </Text>
        {pokemon.type_2 !== 'None' && (
          <Text style={[styles.typeTag, { backgroundColor: getTypeColor(pokemon.type_2) }]}>
            {pokemon.type_2}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#FF0000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexShrink: 1,
  },
  indexText: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
    fontWeight: '600'
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333'
  },
  tagContainer: {
    flexDirection: 'row',
    flexShrink: 0,
    marginLeft: 10,
  },
  typeTag: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 5,
    textTransform: 'uppercase'
  },
});

export default PokemonListItem;