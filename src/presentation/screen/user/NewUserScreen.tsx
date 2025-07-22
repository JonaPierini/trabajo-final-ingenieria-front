import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Button, Alert, TextInput} from 'react-native';
import {User} from '../../../infrastructure/user.response';
import {newUser} from '../../../actions/user/newUser';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';

export const NewUserScreen = () => {
  // Creacion de Usuarios con asignacion de Rol
  const navigation = useNavigation();
  const [formState, setFormState] = useState<User>({
    name: '',
    email: '',
    password: '',
    rol: '',
    state: true,
  });

  const handleNewUser = () => {
    newUser(formState)
      .then(() => {
        Alert.alert('Cliente creado con éxito', '', [
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
            placeholder="Rol"
            value={formState.rol}
            onChangeText={rol => setFormState({...formState, rol})}
          />
          <Button
            title="Confirmar"
            onPress={handleNewUser}
            disabled={
              formState.name.length === 0 ||
              formState.email.length === 0 ||
              formState.rol.length === 0
            }></Button>
        </Card>
      </>
    </View>
  );
};
