

//ActivityIndicator

import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import react, {useState} from 'react'

const IndicadorCarga = ({color, size}) => {
  return <ActivityIndicator style = {styles.indicador} color = {color} size= {size}/>
}

export default function App(){
  const[cargando, setCargando] = useState(false);
  const iniciarCarga =() =>{
    setCargando(true);
    setTimeout(() =>{
      setCargando(false);
    }, 3000);
  }
  
  
  
  return (
  <View style={styles.container}>
  <Text style= {styles.textoPrincipal}>Uso de ActivityIndicator</Text>
  {cargando ?(
  <IndicadorCarga color="deepskyblue" size="large" />
) : (
<Text style={styles.textoSecundario}>presiona el boton para comenzar</Text>
)}


    <Button title = "Iniciar carga" onPress ={iniciarCarga} color="#ff6f61"/>
    <StatusBar style='auto'/>
    </View>
);

}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#ccff90',
    alignItems : 'center',
    justifyContent: 'center',
  },
  textoPrincipal:{
    fontSize:24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2e2e2e',
  },

  textoSecundario:{
    fontSize: 16,
    marginVertical : 20,
    color: '#3a3a3a',
  },

  indicador:{
    marginBottom: 20,
  },

});
