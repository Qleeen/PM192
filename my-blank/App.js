/*Zona 1: importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';

const Texto=({style})=>{
  const [contenido, setContenido]=useState('Hola mundo React')
  const actualizarTexto=()=>{
    setContenido('Estado Actualizado')
  }
  return(
    <Text style={[styles.text, style]} onPress={actualizarTexto}>{contenido}</Text>
  )
}

/*Zona 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Texto style={styles.green}> </Texto>
      <Texto style={styles.black}> </Texto>
      <Texto style={styles.red}> </Texto>
      <Button title="Presioname!"> </Button>
      <StatusBar style="auto" />
    </View>
  );
}

/*Zona 3: Estilos  */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'base-line',
    justifyContent: 'center',
    flexDirection: 'column', 
  },
  text:{
    color: 'white',
    fontsize: 25,



  },
  green:{ backgroundColor: 'green'},
  black:{backgroundColor: 'black'},
  red:{ backgroundColor: 'red'},
});