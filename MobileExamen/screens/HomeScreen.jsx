// screens/HomeScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { POKEMON_DATA } from '../data/Pokemon'; 

// Hulpfunctie voor Type Kleuren
const getTypeColor = (type) => {
  const colors = {
    'Grass': '#7AC74C', 'Fire': '#EE8130', 'Water': '#6390F0',
    'Poison': '#A33EA1', 'Flying': '#A98FF3', 'None': '#ccc',
  };
  return colors[type] || '#68A090';
};

const HomeScreen = () => {
  const [pokemonList] = useState(POKEMON_DATA); 

  // **USEEFFECT MET CLEANUP (Verplicht voor Beoordeling)**
  useEffect(() => {
    console.log("HomeScreen gemonteerd.");
    return () => {
      console.log("HomeScreen cleanup/gedemonteerd.");
    };
  }, []); 

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Pokémon Lijst</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* De 'map' (forEach) lus om de namen en types weer te geven */}
        {pokemonList.map((pokemon) => (
          <View
            key={pokemon.pokedex_index} 
            style={styles.listItem}
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
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: {
    fontSize: 24, fontWeight: 'bold', textAlign: 'center', 
    padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd',
  },
  scrollContent: { padding: 15 },
  listItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10,
    borderLeftWidth: 5, 
    borderLeftColor: '#6390F0',
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

export default HomeScreen;