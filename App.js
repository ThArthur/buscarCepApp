import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Keyboard } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from './src/services/api'

export default function App(){
  
  const [cep, setCep] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null);


  function abrirModal(){
    setModalVisible(true)
  }

  function fecharModal(){
    setModalVisible(false)
  }

  function limparCep(){
    setCep('');
    inputRef.current.focus();
  }

  async function buscarCep(){
    if(cep === '' || cep.length < 8){
      alert('Digite um CEP válido');
      setCep('');
      return;
    }

      
    try{
      const response = await api.get(`${cep}/json`);
      Keyboard.dismiss();
      setCepUser(response.data);
      abrirModal();
    }catch(error){

      console.log('ERROR: ' + error)
    }

  }

    return(
    <View style={styles.container}>

      <Text style={styles.tituloPagina}>Buscar CEP</Text>

      <View style={styles.viewInput}>

        <View style={styles.viewCep}>

          <Text style={styles.tituloCep}>CEP:</Text>

          <TextInput
          style={styles.inputCep}
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          maxLength={8}
          keyboardType='numeric'
          ref={inputRef}
          />
        
        </View>
        <View style={styles.viewBotao}>

          <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
            <Text style={styles.botaoBuscarTexto}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoLimpar} onPress={limparCep}>
            <Text style={styles.botaoLimparTexto}>Limpar</Text>
          </TouchableOpacity>

        </View>

      </View>

      { cepUser &&

        <Modal transparent={true} animationType="slide" visible={modalVisible}>

        <View style={styles.modalViewMain}>

          <TouchableOpacity style={styles.voltarModalGrande} onPress={fecharModal}/>

          <View style={styles.viewModal}>

            <TouchableOpacity style={styles.BotaoIconVoltar} onPress={fecharModal} >

              <FontAwesome name="angle-left" size={25} color="#D3D3D3"/>

            </TouchableOpacity>
            
            <Text style={styles.infoCep}>CEP: {cepUser.cep} </Text>
            <Text style={styles.infoCep}>Complemento: {cepUser.complemento} </Text>
            <Text style={styles.infoCep}>Logradouro: {cepUser.logradouro}</Text>
            <Text style={styles.infoCep}>Localidade: {cepUser.localidade}</Text>
            <Text style={styles.infoCep}>Bairro: {cepUser.bairro}</Text>
            <Text style={styles.infoCep}>UF: {cepUser.uf}</Text>

          </View>

        </View>
        
      </Modal>

      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  tituloPagina:{
    textAlign: 'center',
    marginTop: 45,
    marginBottom: 45,
    fontSize: 35,
    color: '#FFF',
    fontWeight: 'bold'
  },
  viewInput:{
    backgroundColor: '#D3D3D3',
    width: '90%',
    height: 150,
    borderRadius: 30,
    shadowColor: '#FFF',
    borderWidth: 1,
    elevation: 12
  },
  viewCep:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 15
  },
  tituloCep:{
    fontSize: 15
  },
  inputCep:{
    borderWidth: 1,
    width: 250,
    height: 40,
    marginLeft: 15,
    paddingLeft: 10
  },
  viewBotao:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  botaoBuscar:{
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: '#008000',
    borderColor: '#121212',
    shadowColor: '#121212',
    borderWidth: 1,
    elevation: 30
  },
  botaoBuscarTexto:{
    color: '#fff',
    fontSize: 15,
  },
  botaoLimpar:{
    borderWidth: 1,
    borderColor: '#121212',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: '#8B0000',
    borderColor: '#121212',
    shadowColor: '#121212',
    borderWidth: 1,
    elevation: 30
  },
  botaoLimparTexto:{
    color: '#fff',
    fontSize: 15,
  },
  modalViewMain:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  viewModal:{
    backgroundColor: '#D3D3D3',
    height: 350,
    width: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  BotaoIconVoltar:{
    backgroundColor: '#8B0000',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10
  },
  infoCep:{
    fontSize: 20,
    marginTop: 15,
    marginLeft: 30
  },
  voltarModalGrande:{
    height: '100%',
    width: '100%'
  }
});