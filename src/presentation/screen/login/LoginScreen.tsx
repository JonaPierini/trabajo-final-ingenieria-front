import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const LoginScreen = () => {
  const [eyeView, setEyeView] = useState<boolean>(true);

  const handleLogin = () => {};

  const handelViewPassword = () => {
    setEyeView(!eyeView);
  };

  return (
    <View style={styles.container}>
      {/* Correo Electronico */}
      <Text style={styles.text}>Correo electrónico</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          autoCapitalize="none"
        />
        <Icon style={styles.searchIcon} name="envelope" size={20} />
      </View>

      {/* Contraseña */}
      <Text style={styles.text}>Contraseña</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          autoCapitalize="none"
          secureTextEntry={eyeView}
        />
        <Icon
          style={styles.searchIcon}
          name={eyeView ? 'eye-slash' : 'eye'}
          size={20}
          onPress={handelViewPassword}
        />
      </View>

      {/* Ingresar */}
      <Pressable onPress={handleLogin} style={styles.btn}>
        <Text>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  text: {
    alignSelf: 'flex-start',
    color: '#FFF',
    marginBottom: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#CFE060',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginTop: 30,
  },

  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
