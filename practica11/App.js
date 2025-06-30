import React, { useState, useEffect } from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [editorial, setEditorial] = useState('');
  const [numero, setNumero] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [comicEditandoId, setComicEditandoId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGuardarComic = () => {
    if (!titulo || !editorial || !numero || !cantidad) {
      Alert.alert('Campos incompletos', 'Por favor, llena todos los campos del cómic.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (modoEdicion) {
        const nuevosComics = comics.map((comic) =>
          comic.id === comicEditandoId
            ? { ...comic, titulo, editorial, numero, cantidad }
            : comic
        );
        setComics(nuevosComics);
        Alert.alert('Cómic actualizado', `${titulo} #${numero}`);
      } else {
        const nuevoComic = {
          id: Date.now().toString(),
          titulo,
          editorial,
          numero,
          cantidad,
        };
        setComics([...comics, nuevoComic]);
        Alert.alert('Cómic agregado', `${titulo} #${numero}`);
      }

      setTitulo('');
      setEditorial('');
      setNumero('');
      setCantidad('');
      setModoEdicion(false);
      setComicEditandoId(null);
      setIsLoading(false);
    }, 1000);
  };

  const editarComic = (comic) => {
    setTitulo(comic.titulo);
    setEditorial(comic.editorial);
    setNumero(comic.numero);
    setCantidad(comic.cantidad);
    setModoEdicion(true);
    setComicEditandoId(comic.id);
  };

  const eliminarComic = (id) => {
    Alert.alert(
      '¿Eliminar cómic?',
      '¿Estás seguro que deseas eliminar este cómic?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setComics(comics.filter((comic) => comic.id !== id));
          },
        },
      ]
    );
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
        <Text style={styles.logo}>{modoEdicion ? 'Editar Cómic' : 'Agregar Cómic'}</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Título del cómic"
            placeholderTextColor="#333"
            value={titulo}
            onChangeText={setTitulo}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Editorial"
            placeholderTextColor="#333"
            value={editorial}
            onChangeText={setEditorial}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor="#333"
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor="#333"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[styles.btnRegistro, isLoading && { opacity: 0.6 }]}
            onPress={handleGuardarComic}
            disabled={isLoading}
          >
            <Text style={styles.btnText}>
              {modoEdicion ? 'Actualizar Cómic' : 'Guardar Cómic'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={comics}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20, width: '90%' }}
          renderItem={({ item }) => (
            <View style={styles.comicItem}>
              <TouchableOpacity onPress={() => editarComic(item)}>
                <Text style={styles.comicText}>
                  {item.titulo} #{item.numero} - {item.editorial}
                </Text>
                <Text style={{ color: '#333' }}>Cantidad: {item.cantidad}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => eliminarComic(item.id)}
                style={styles.eliminarBtn}
              >
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
  btnRegistro: {
    backgroundColor: 'rgba(217, 0, 0, 0.81)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
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
  comicItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  comicText: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  eliminarBtn: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});
