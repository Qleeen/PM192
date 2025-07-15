import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';

const API_KEY = 'e45c03b61258472e9b5202651250707'; // Tu API Key de WeatherAPI.com

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchWeather = async selectedCity => {
    if (weatherData.length >= 2) {
      Alert.alert('Límite alcanzado', 'Solo puedes agregar un máximo de 2 ciudades. Elimina una para agregar otra.');
      return;
    }

    if (!selectedCity || selectedCity.trim() === '') {
        Alert.alert('Ciudad no válida', 'Por favor, ingresa un nombre.');
        return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}&lang=es`,
      );
      const data = await response.json();
      if (response.ok) {
        
        // 1. VALIDACIÓN DE DUPLICADOS (NOMBRE + PAÍS)
        // Se valida que la combinación de ciudad y país no exista ya en la lista.
        const isDuplicate = weatherData.some(item => 
          item.name.toLowerCase() === data.location.name.toLowerCase() &&
          item.country.toLowerCase() === data.location.country.toLowerCase()
        );

        if (isDuplicate) {
          Alert.alert('Ciudad duplicada', `${data.location.name}, ${data.location.country} ya está en la lista.`);
        } else {
          // Si no es duplicado, se agrega a la lista
          setWeatherData(prevData => [
            {
              name: data.location.name,
              country: data.location.country,
              temp: data.current.temp_c,
              condition: data.current.condition.text,
              icon: `https:${data.current.condition.icon}`,
            },
            ...prevData,
          ]);
        }
      } else {
        Alert.alert('Error', data.error.message || `No se encontró la ciudad: ${selectedCity}`);
      }
    } catch (error) {
      Alert.alert('Error de Conexión', 'No se pudo conectar al servidor.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = text => {
    setCity(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (text.length > 2) {
      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${text}`,
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = location => {
    setCity('');
    setSuggestions([]);
    fetchWeather(location.name);
  };
  
  const handleAddButtonPress = () => {
    if (city.trim()) {
        fetchWeather(city);
        setCity('');
        setSuggestions([]);
    } else {
        Alert.alert('Campo vacío', 'Por favor, escribe el nombre de una ciudad.');
    }
  };


  const removeCity = name => {
    setWeatherData(prevData => prevData.filter(item => item.name.toLowerCase() !== name.toLowerCase()));
  };

  const clearAllCities = () => {
    setWeatherData([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerTitle}>Weather</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar una ciudad..."
          placeholderTextColor="#8E8E93"
          value={city}
          onChangeText={handleTextChange}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
            <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectSuggestion(item)}>
              <Text style={styles.suggestionText}>{`${item.name}, ${item.country}`}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}

      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {weatherData.map(data => (
          // Se usa una clave única combinando nombre y país
          <View key={`${data.name}-${data.country}`} style={styles.weatherCard}>
            <View style={styles.cityInfo}>
              <Text style={styles.cityName}>{data.name}</Text>
              <Text style={styles.countryName}>{data.country}</Text>
              <Text style={styles.condition}>{data.condition}</Text>
              {/* Se ajusta la función de eliminar para que sea más específica */}
              <TouchableOpacity onPress={() => removeCity(`${data.name}-${data.country}`)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tempContainer}>
                <Image style={styles.weatherIcon} source={{ uri: data.icon }}/>
                <Text style={styles.temperature}>{`${Math.round(data.temp)}°`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {weatherData.length > 1 && (
        <TouchableOpacity onPress={clearAllCities} style={styles.clearAllButton}>
          <Text style={styles.clearAllButtonText}>Limpiar todo</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  headerTitle: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#000',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#EFEFF0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 17,
    marginRight: 10,
  },
  addButton: {
      paddingHorizontal: 10,
      height: 44,
      justifyContent: 'center',
  },
  addButtonText: {
      color: '#007AFF',
      fontSize: 17,
      fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  suggestionsContainer: {
    maxHeight: 200,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  suggestionText: {
    fontSize: 16,
  },
  scrollViewContent: {
    padding: 20,
    paddingTop: 10,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  countryName: {
    fontSize: 16,
    color: '#3C3C43',
    marginTop: 2,
  },
  condition: {
    fontSize: 16,
    color: '#3C3C43',
    opacity: 0.8,
    textTransform: 'capitalize',
    marginTop: 8,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 64,
    height: 64,
  },
  temperature: {
    fontSize: 52,
    fontWeight: '200',
    color: '#000',
    textAlign: 'right',
  },
  deleteButton: {
    marginTop: 15,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 15,
  },
  clearAllButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  clearAllButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default App;