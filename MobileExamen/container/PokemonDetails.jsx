// container/PokemonDetails.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const PokemonDetailsScreen = ({ route }) => {
    const pokemon = route.params?.pokemonData; 
    
    // Statusafhandeling simulatie (Verplicht)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []); 

    const getTypeColor = (type) => {
        const colors = {
            'Grass': '#7AC74C', 'Fire': '#EE8130', 'Water': '#6390F0',
            'Poison': '#A33EA1', 'Electric': '#F7D02C', 'None': '#ccc',
        };
        return colors[type] || '#68A090';
    };

    if (isLoading) {
        return (
            <View style={styles.statusContainer}>
                <ActivityIndicator size="large" color="#FF0000" />
                <Text style={styles.text}>Details worden geladen...</Text>
            </View>
        );
    }
    
    if (!pokemon) {
        return (
            <View style={styles.statusContainer}>
                <Text style={styles.text}>❌ Fout: Pokémon data niet gevonden.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.header}>#{pokemon.pokedex_index} {pokemon.name.toUpperCase()}</Text>
                
                <Text style={styles.sectionTitle}>Basis Informatie (Min. 4 velden)</Text>
                
                <DetailRow label="Beschrijving" value={pokemon.description} large={true}/>
                <DetailRow label="Type 1" value={pokemon.type_1} color={getTypeColor(pokemon.type_1)} />
                <DetailRow label="Type 2" value={pokemon.type_2} color={getTypeColor(pokemon.type_2)} />
                <DetailRow label="Pokedex Index" value={pokemon.pokedex_index} />
                
            </View>
        </ScrollView>
    );
};

const DetailRow = ({ label, value, color, large }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={[styles.detailValue, color && { backgroundColor: color, paddingHorizontal: 6, borderRadius: 4, color: '#fff' }, large && { flex: 1, textAlign: 'right' }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    statusContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    text: { fontSize: 18, fontWeight: 'bold' },
    infoBox: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#FFCC00', paddingBottom: 5 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
    detailLabel: { fontSize: 16, color: '#666' },
    detailValue: { fontSize: 16, fontWeight: '600', color: '#333' },
});

export default PokemonDetailsScreen;