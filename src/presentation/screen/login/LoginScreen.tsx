import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const LoginScreen = () => {
  const [eyeView, setEyeView] = useState<boolean>(true);

  interface FormInterface {
    email: string;
    password: string;
  }
  const [formState, setFormState] = useState<FormInterface>({
    email: '',
    password: '',
  });

  //store
  const {login} = useAuthStore();

  const handleLogin = async () => {
    const wasSuccessful = await login('test@gmail.com', '12345678');
    // eslint-disable-next-line curly
    if (wasSuccessful) return;
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

  const handleCancel = async () => {
    setFormState({email: '', password: ''});
  };

  const handelViewPassword = () => {
    setEyeView(!eyeView);
  };

  return (
    <View style={styles.container}>
      {/* Correo Electronico */}
      <Text style={styles.text}>Correo electrónico</Text>
      <View style={styles.searchSection}>
        <TextInput
          value={formState.email}
          onChangeText={email => setFormState({...formState, email})}
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
          value={formState.password}
          onChangeText={password => setFormState({...formState, password})}
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
      <View style={styles.btnContainer}>
        <Pressable onPress={handleLogin} style={styles.btn}>
          <Text>Iniciar sesión</Text>
        </Pressable>
        <Pressable onPress={handleCancel} style={styles.btn}>
          <Text>Cancelar</Text>
        </Pressable>
      </View>
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
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#CFE060',
    alignItems: 'center',
    width: '50%',
    padding: 15,
    marginTop: 30,
    marginLeft: 2,
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
