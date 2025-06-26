import React, { useState, useEffect } from 'react';
import {Alert,ImageBackground,SafeAreaView,StyleSheet,Switch,Text,TextInput,TouchableOpacity,View,Image,} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegistro = () => {
    if (nombre.trim() === '' || correo.trim() === '') {
      Alert.alert('Error', 'Llena los campos de favor.');
      return;
    }

    if (!aceptaTerminos) {
      Alert.alert('Términos no aceptados', 'Aceptalos pli');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Registro completado', `Nombre: ${nombre}\nEmail: ${correo}`);
    }, 2000);
  };

  if (isSplashVisible) {
    return (
      <View style={styles.modalCarga}>
        <ImageBackground
          source={require('./assets/fondo1.jpg')}
          style={styles.imageBackgroundSplash}
          resizeMode="cover"
        >
          <View style={styles.cuadroCarga}>
            <Image
              source={require('./assets/logo.jpg')}
              style={styles.logoSplash}
              resizeMode="contain"
            />
            <Text style={styles.procesandoText}>Bienvenido...</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/fondo1.jpg')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <Text style={styles.logo}>Registrese de favor</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#333"
            value={nombre}
            onChangeText={setNombre}
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#333"
            keyboardType="email-address"
            value={correo}
            onChangeText={setCorreo}
            editable={!isLoading}
          />

          <View style={styles.terminosContainer}>
            <Text style={styles.terminosText}>Aceptar términos y condiciones</Text>
            <Switch
              value={aceptaTerminos}
              onValueChange={setAceptaTerminos}
              trackColor={{ false: '#ccc', true: '#e2e800' }}
              thumbColor={aceptaTerminos ? '#d90000' : '#999'}
              disabled={isLoading}
            />
          </View>

          <TouchableOpacity
            style={[styles.btnRegistro, isLoading && { opacity: 0.6 }]}
            onPress={handleRegistro}
            disabled={isLoading}
          >
            <Text style={styles.btnText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  card: {
    width: '85%',
    maxWidth: 420,
    backgroundColor: 'rgba(247, 130, 235, 0.74)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: 'rgba(18, 153, 250, 0.41)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 45,
    marginBottom: 12,
    color: '#000000',
    borderWidth: 2,
    borderColor: '#e2e800',
  },
  terminosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  terminosText: {
    color: '#000000',
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  btnRegistro: {
    backgroundColor: 'rgba(217, 0, 0, 0.81)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundSplash: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cuadroCarga: {
    width: 220,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  logoSplash: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  procesandoText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
