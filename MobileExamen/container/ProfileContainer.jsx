// container/ProfileContainer.jsx
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileContainer = () => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileText}>
      🧑‍💻 Profielscherm: [Jouw Naam]
      {"\n\n\n"}
      Mobile Application 1 - Examen
    </Text>
  </View>
);

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileText: {
        textAlign: 'center', 
        fontSize: 18, 
        fontWeight: 'bold'
    }
});

export default ProfileContainer;