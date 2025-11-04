import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const PokemonDetailsScreen = ({ route }) => { 
    const pokemon = route.params?.pokemonData; 
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500); 
        return () => clearTimeout(timer);
    }, []); 

    const getTypeColor = (type) => {
        const colors = {
            'Grass': '#7AC74C', 'Fire': '#EE8130', 'Water': '#6390F0',
            'Poison': '#A33EA1', 'Flying': '#A98FF3', 'None': '#ccc', 'Electric': '#F7D02C', 'Bug': '#A6B91A', 'Ghost': '#735797', 'Dragon': '#6F35FC', 'Psychic': '#F95587'
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
                
                <DetailRow label="Naam" value={pokemon.name.toUpperCase()} />
                <DetailRow label="Index" value={`#${pokemon.pokedex_index}`} />
                <DetailRow label="Type 1" value={pokemon.type_1} color={getTypeColor(pokemon.type_1)} />
                <DetailRow label="Type 2" value={pokemon.type_2} color={getTypeColor(pokemon.type_2)} />
                
                <Text style={styles.sectionTitle}>Beschrijving</Text>
                <Text style={styles.descriptionText}>{pokemon.description}</Text>
            </View>
        </ScrollView>
    );
};

const DetailRow = ({ label, value, color }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={[styles.detailValue, color && { backgroundColor: color, paddingHorizontal: 6, borderRadius: 4, color: '#fff' }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    statusContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    text: { fontSize: 18, fontWeight: 'bold' },
    infoBox: { padding: 20, backgroundColor: '#fff', margin: 10, borderRadius: 10, elevation: 2 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#FFCC00', paddingBottom: 5 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
    detailLabel: { fontSize: 16, color: '#666' },
    detailValue: { fontSize: 16, fontWeight: '600', color: '#333' },
    descriptionText: { fontSize: 16, lineHeight: 24, marginTop: 10, color: '#333' }
});

export default PokemonDetailsScreen;