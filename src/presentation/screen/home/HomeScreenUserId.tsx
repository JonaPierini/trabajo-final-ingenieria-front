import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import {HomeUserStackParams} from '../../navigation/homeUserNavigation/HomeUserNavigation';
import {User} from '../../../infrastructure/user.response';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {updateSelfUserById} from '../../../actions/user/updateUserById';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const HomeScreenUserId = () => {
  const navigation = useNavigation();
  const {setUser} = useAuthStore();

  const params =
    useRoute<RouteProp<HomeUserStackParams, 'HomeScreenUserId'>>().params;

  const [up, setUp] = useState<Boolean>(false);

  const [formState, setFormState] = useState<User>({
    name: params?.name,
    email: params.email,
    rol: params.rol,
    state: params.state,
    password: '',
  });

  const handleEdit = () => {
    setUp(prev => !prev);
  };

  const handleConfirm = () => {
    const cleanFormState = {
      ...formState,
      password: formState.password.replace(/\s/g, ''), // ✅ elimina espacios al inicio y al final
    };
    updateSelfUserById(params.userId, cleanFormState) // Envía el ID y los datos actualizados
      .then(() => {
        {
          setFormState(cleanFormState); // Actualiza el estado local con los nuevos valores
          setUser(cleanFormState); // 🔁 actualiza el nombre en el store
          Alert.alert('Usuario actualizado con exito', '', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
          setUp(false); // Sale del modo edición
        }
      })
      .catch(e => {
        Alert.alert(`${e.message}`);
      });
  };

  return (
    <View>
      <BackButton />
      <Card>
        {up ? (
          <>
            <TextInput
              placeholder={'Nuevo nombre' + formState.name}
              style={{color: 'tomato'}}
              value={formState.name}
              onChangeText={name => setFormState({...formState, name})}
            />

            <TextInput
              placeholder="Nueva contraseña"
              // secureTextEntry
              style={{color: 'tomato'}}
              value={formState.password}
              onChangeText={password => setFormState({...formState, password})}
            />

            <Button
              disabled={
                formState.name.length === 0 || formState.password.length !== 8
              }
              title="Confirmar"
              onPress={handleConfirm}></Button>
          </>
        ) : (
          <>
            <Text>Nombre: {formState?.name}</Text>
            <Text>Email: {formState?.email}</Text>
            <Text>Rol: {formState?.rol}</Text>
            <Text style={{color: formState?.state ? 'green' : 'red'}}>
              Estado: {formState?.state ? 'Activo' : 'Inactivo'}
            </Text>
          </>
        )}
      </Card>
      <View style={styles.btnContainer}>
        <Pressable onPress={handleEdit} style={styles.btn}>
          <Text style={styles.text}>Editar</Text>
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
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: '#1476bc',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginTop: 30,
    margin: 1,
  },
  text: {
    color: '#fff',
  },
});
