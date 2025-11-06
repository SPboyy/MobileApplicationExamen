import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.titleText}>Pokémon Lijst</Text>
    <View style={styles.profileButton}>
      <Text style={styles.profileText}>  P </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  titleText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  profileButton: { padding: 5 },
  profileText: { fontSize: 28, color: '#fff' },
});

export default Header;
