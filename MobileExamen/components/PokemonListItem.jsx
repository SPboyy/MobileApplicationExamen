import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getTypeColor = (type) => {
  const colors = {
    grass: '#7AC74C',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    bug: '#A6B91A',
    poison: '#A33EA1',
    flying: '#A98FF3',
    psychic: '#F95587',
    ghost: '#735797',
    dragon: '#6F35FC',
    rock: '#B6A136',
    steel: '#B7B7CE',
    dark: '#705746',
    fairy: '#D685AD',
    normal: '#A8A77A',
    ground: '#E2BF65',
    ice: '#96D9D6',
    fighting: '#C22E28',
    none: '#ccc',
    unknown: '#ccc',
  };
  return colors[type?.toLowerCase()] || '#68A090';
};

const PokemonListItem = ({ pokemon, navigation, isShiny, toggleShiny }) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() => navigation.navigate('PokemonDetails', { pokemonData: pokemon })}
  >
    {pokemon.image && <Image source={{ uri: pokemon.image }} style={styles.sprite} />}

    <View style={styles.infoArea}>
      <View style={styles.textContainer}>
        <Text style={styles.indexText}>#{pokemon.pokedex_index}</Text>
        <Text style={styles.nameText}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
      </View>

      <View style={styles.tagContainer}>
        <Text style={[styles.typeTag, { backgroundColor: getTypeColor(pokemon.type_1) }]}>
          {pokemon.type_1.toUpperCase()}
        </Text>
        {pokemon.type_2 !== 'None' && (
          <Text style={[styles.typeTag, { backgroundColor: getTypeColor(pokemon.type_2) }]}>
            {pokemon.type_2.toUpperCase()}
          </Text>
        )}
      </View>
    </View>

    <TouchableOpacity onPress={toggleShiny} style={styles.favoriteButton}>
      <MaterialCommunityIcons
        name={isShiny ? 'star' : 'star-outline'}
        size={24}
        color={isShiny ? '#FFD700' : '#A98FF3'}
      />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#FF0000',
  },
  sprite: { width: 55, height: 55, marginRight: 10 },
  infoArea: { flex: 1 },
  textContainer: { flexDirection: 'row', alignItems: 'baseline' },
  indexText: { fontSize: 13, color: '#777', marginRight: 8, fontWeight: '600' },
  nameText: { fontSize: 18, fontWeight: '700', color: '#333' },
  tagContainer: { flexDirection: 'row', marginTop: 4 },
  typeTag: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
    textTransform: 'uppercase',
  },
  favoriteButton: { paddingLeft: 10 },
});

export default PokemonListItem;
