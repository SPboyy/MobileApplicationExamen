import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Header from '../components/Header';
import PokemonListItem from '../components/PokemonListItem';

const PAGE_SIZE = 20;

const PokemonContainer = ({ navigation, shinyList, toggleShiny }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('name');
  const [asc, setAsc] = useState(true);

  // 🔹 Functie om volgende 20 Pokémon op te halen
  const fetchPokemonPage = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results.length) {
          setHasMore(false);
          setLoading(false);
          return;
        }

        // 🔹 Gebruik Promise.all om details op te halen
        return Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url)
              .then((res) => res.json())
              .then((details) => ({
                pokedex_index: details.id,
                name: details.name,
                type_1: details.types[0]?.type?.name || 'Unknown',
                type_2: details.types[1]?.type?.name || 'None',
                image: details.sprites.front_default,
                description: `Een ${details.types[0]?.type?.name}-type Pokémon.`,
              }))
          )
        );
      })
      .then((newPokemons) => {
        if (!newPokemons) return;
        setPokemons((prev) => [...prev, ...newPokemons]);
        setOffset((prev) => prev + PAGE_SIZE);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Fout bij ophalen Pokémon:', err);
        setLoading(false);
      });
  }, [offset, loading, hasMore]);

  // 🔹 Laad eerste batch bij opstart
  useEffect(() => {
    fetchPokemonPage();
  }, []);

  // 🔹 Filter & sorteer
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortType === 'name') {
      return asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return asc
        ? a.pokedex_index - b.pokedex_index
        : b.pokedex_index - a.pokedex_index;
    }
  });

  const arrow = asc ? '↑' : '↓';

  return (
    <View style={styles.container}>
      <Header />

      <TextInput
        style={styles.searchInput}
        placeholder="Zoek Pokémon..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 🔹 Sorteerknoppen */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === 'name' && { backgroundColor: '#FFCC00' },
          ]}
          onPress={() => {
            if (sortType === 'name') setAsc(!asc);
            else {
              setSortType('name');
              setAsc(true);
            }
          }}
        >
          <Text style={styles.sortText}>
            Naam {sortType === 'name' ? arrow : '↑↓'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === 'index' && { backgroundColor: '#FFCC00' },
          ]}
          onPress={() => {
            if (sortType === 'index') setAsc(!asc);
            else {
              setSortType('index');
              setAsc(true);
            }
          }}
        >
          <Text style={styles.sortText}>
            Index {sortType === 'index' ? arrow : '↑↓'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 FlashList met infinite scroll */}
      <FlashList
        data={sorted}
        renderItem={({ item }) => (
          <PokemonListItem
            pokemon={item}
            navigation={navigation}
            isShiny={shinyList?.includes(item.pokedex_index)}
            toggleShiny={() => toggleShiny?.(item.pokedex_index)}
          />
        )}
        keyExtractor={(item) => item.pokedex_index.toString()}
        estimatedItemSize={90}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={fetchPokemonPage}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="small" color="#FF0000" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  searchInput: {
    height: 40,
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sortText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
});

export default PokemonContainer;
