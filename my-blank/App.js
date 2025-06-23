
import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

const FondoBienvenida = () => {
  return (
    <ImageBackground
      source={require('./assets/fondoPractica.jpg')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Ejemplo Splash</Text>
      </View>
    </ImageBackground>
  );
};



export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);  
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showSplash ? (
        <FondoBienvenida />
      ) : (
        <View style={styles.mainContent}>
          <Text style={styles.mainText}>Pantalla principal</Text>
        </View>
      )}
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});


































































































// /*Zona 1: importaciones */
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import React, {useState} from 'react';

// const Texto=({style})=>{
//   const [contenido, setContenido]=useState('Hola mundo React')
//   const actualizarTexto=()=>{
//     setContenido('Estado Actualizado')
//   }
//   return(
//     <Text style={[styles.text, style]} onPress={actualizarTexto}>{contenido}</Text>
//   )
// }

// /*Zona 2: Main */
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Texto style={styles.green}> </Texto>
//       <Texto style={styles.black}> </Texto>
//       <Texto style={styles.red}> </Texto>
//       <Button title="Presioname!"> </Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// /*Zona 3: Estilos  */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'base-line',
//     justifyContent: 'center',
//     flexDirection: 'column', 
//   },
//   text:{
//     color: 'white',
//     fontsize: 25,



//   },
//   green:{ backgroundColor: 'green'},
//   black:{backgroundColor: 'black'},
//   red:{ backgroundColor: 'red'},
// });