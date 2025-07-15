import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Profile</Text>
      <Button title="Ir a Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Ir a Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  title: {
    fontSize: 24, marginBottom: 20
  }
});
