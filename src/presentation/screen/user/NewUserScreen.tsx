import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Button, Alert, TextInput, Text, StyleSheet} from 'react-native';
import {User} from '../../../infrastructure/user.response';
import {newUser} from '../../../actions/user/newUser';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Picker} from '@react-native-picker/picker';

export const NewUserScreen = () => {
  // Creacion de Usuarios con asignacion de Rol
  const navigation = useNavigation();
  const [formState, setFormState] = useState<User>({
    name: '',
    email: '',
    password: '',
    rol: 'USER_ROLE',
    state: true,
  });

  const handleNewUser = () => {
    newUser(formState)
      .then(() => {
        Alert.alert('Usuario creado con éxito', '', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      });
  };
  return (
    <View>
      <BackButton />
      <>
        <Card>
          <TextInput
            placeholder="Nombre"
            value={formState.name}
            onChangeText={name => setFormState({...formState, name})}
          />
          <TextInput
            placeholder="Email"
            autoCapitalize={'none'}
            value={formState.email}
            onChangeText={email => setFormState({...formState, email})}
          />
          <TextInput
            placeholder="Contraseña"
            value={formState.password}
            onChangeText={password => setFormState({...formState, password})}
          />
          <Text style={{marginTop: 1, color: '#ccc'}}>Rol:</Text>
          <Picker
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 5,
            }}
            selectedValue={formState.rol}
            onValueChange={itemValue =>
              setFormState({...formState, rol: itemValue})
            }
            dropdownIconColor="#000">
            <Picker.Item label="Admin" value="ADMIN_ROLE" />
            <Picker.Item label="User" value="USER_ROLE" />
          </Picker>

          <Button
            title="Confirmar"
            onPress={handleNewUser}
            disabled={
              formState.name.length === 0 || formState.email.length === 0
            }></Button>
        </Card>
      </>
    </View>
  );
};
