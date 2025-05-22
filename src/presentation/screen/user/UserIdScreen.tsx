import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Switch,
} from 'react-native';
import {UserStackParams} from '../../navigation/userNavigation/UserNavigation';
import {User} from '../../../infrastructure/user.response';
import {getUserById} from '../../../actions/user/getUserById';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const UserIdScreen = () => {
  const navigation = useNavigation();

  const {user} = useAuthStore();

  const params = useRoute<RouteProp<UserStackParams, 'UserIdScreen'>>().params;

  const [userId, setUserId] = useState<User | null>(null);

  const [up, setUp] = useState<Boolean>(false);
  const [formState, setFormState] = useState<User>({
    name: params.name,
    email: params.email,
    rol: params.rol,
    state: params.state,
  });

  const isSelfUser = user?.email === userId?.email;

  useEffect(() => {
    getUserById(params.userId)
      .then(elem => setUserId(elem?.userById ?? null))
      .catch(e => console.log(e));
  }, []);

  const handleDelete = () => {
    console.log('Borrar');
  };

  const handleEdit = () => {
    setUp(prev => !prev);
  };

  const handleConfirm = () => {
    console.log('Confirmar');
  };

  return (
    <>
      <BackButton />
      <Card>
        {up ? (
          <>
            <TextInput
              placeholder={userId?.name}
              style={{color: 'tomato'}}
              value={formState.name}
              onChangeText={name => setFormState({...formState, name})}
            />
            <TextInput
              placeholder={userId?.email}
              style={{color: 'tomato'}}
              value={formState.email}
              onChangeText={email => setFormState({...formState, email})}
            />
            <TextInput
              placeholder={userId?.rol}
              style={{color: 'tomato'}}
              value={formState.rol}
              onChangeText={rol => setFormState({...formState, rol})}
            />
            <Switch
              value={formState.state}
              onValueChange={value =>
                setFormState({...formState, state: value})
              }
            />
            <Text>{formState.state ? 'Activo' : 'Inactivo'}</Text>
            <Button title="Confirmar" onPress={handleConfirm}></Button>
          </>
        ) : (
          <>
            <Text>Nombre: {userId?.name}</Text>
            <Text>Email: {userId?.email}</Text>
            <Text>Rol: {userId?.rol}</Text>
            <Text style={{color: userId?.state ? 'green' : 'red'}}>
              Estado: {userId?.state ? 'Activo' : 'Inactivo'}
            </Text>
          </>
        )}
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={isSelfUser}
          style={[
            styles.btn,
            {backgroundColor: isSelfUser ? '#ccc' : '#f23939'},
          ]}
          onPress={handleDelete}>
          <Text style={styles.text}>Eliminar</Text>
        </Pressable>

        <Pressable
          disabled={isSelfUser}
          style={[
            styles.btn,
            {backgroundColor: isSelfUser ? '#ccc' : '#1476bc'},
          ]}
          onPress={handleEdit}>
          <Text style={styles.text}>Editar</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  btn: {
    alignItems: 'center',
    width: '50%',
    padding: 15,
    marginTop: 30,
    margin: 1,
  },
  text: {
    color: '#fff',
  },
});
