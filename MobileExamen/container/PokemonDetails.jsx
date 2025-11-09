import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const getTypeColor = (type) => {
  const colors = {
    grass: '#7AC74C', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    bug: '#A6B91A', poison: '#A33EA1', flying: '#A98FF3', psychic: '#F95587',
    ghost: '#735797', dragon: '#6F35FC', rock: '#B6A136', steel: '#B7B7CE',
    dark: '#705746', fairy: '#D685AD', normal: '#A8A77A', ground: '#E2BF65',
    ice: '#96D9D6', fighting: '#C22E28', none: '#ccc', unknown: '#ccc',
  };
  return colors[type?.toLowerCase()] || '#68A090';
};

const Row = ({ label, value, chipColor }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {chipColor ? (
      <Text style={[styles.valueChip, { backgroundColor: chipColor }]}>
        {String(value).toUpperCase()}
      </Text>
    ) : (
      <Text style={styles.value}>{String(value)}</Text>
    )}
  </View>
);

const PokemonDetails = ({ route }) => {
  const pokemon = route?.params?.pokemonData;

  // 🔹 Lifecycle logging
  useEffect(() => {
    console.log('✅ Mounted PokemonDetails');
    return () => {
      console.log('❌ Unmounted PokemonDetails');
    };
  }, []);

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Geen Pokémon data ontvangen.</Text>
      </View>
    );
  }

  const {
    pokedex_index,
    name,
    image,
    type_1 = 'Unknown',
    type_2 = 'None',
    description = 'Geen beschrijving beschikbaar.',
  } = pokemon;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.title}>#{pokedex_index} {name?.toUpperCase?.()}</Text>

      {!!image && (
        <View style={styles.imageWrap}>
          <Image source={{ uri: image }} style={styles.sprite} resizeMode="contain" />
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.section}>Basis</Text>
        <Row label="Naam" value={name?.toUpperCase?.() || 'ONBEKEND'} />
        <Row label="Index" value={`#${pokedex_index}`} />
        <Row label="Type 1" value={type_1} chipColor={getTypeColor(type_1)} />
        {type_2 !== 'None' && <Row label="Type 2" value={type_2} chipColor={getTypeColor(type_2)} />}
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Beschrijving</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  error: { fontSize: 16, color: '#c00', fontWeight: '600' },

  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 16, marginBottom: 12, color: '#222' },
  imageWrap: { alignItems: 'center', marginBottom: 8 },
  sprite: { width: 140, height: 140 },

  card: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  section: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#FFCC00',
    paddingBottom: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  label: { fontSize: 15, color: '#666' },
  value: { fontSize: 15, fontWeight: '700', color: '#333' },
  valueChip: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  desc: { fontSize: 15, lineHeight: 22, color: '#333' },
});

export default PokemonDetails;
