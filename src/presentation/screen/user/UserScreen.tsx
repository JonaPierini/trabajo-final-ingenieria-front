import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {User} from '../../../infrastructure/user.response';
import {getUser} from '../../../actions/user/getUser';
import {Card} from '../../components/card/Card';
import {Loading} from '../../components/loading/Loading';

export type UserScreenParams = {
  UserIdScreen: {
    userId?: string;
    name: string;
    email: string;
    rol: string;
    state?: boolean;
  };
  NewUserScreen: undefined;
};

export const UserScreen = () => {
  // Lista de Usuarios.
  // Al seleccionar un usuario en particular vas a navegar a la pantalla de UserIdScreen.
  // Vas a poder Eliminarlo o Editarlo (cambiarle datos y su rol)

  //Agregar nuevo vas a navegar a NewUserScreen y vas a poder crear un nuevo usuario con un rol determinado
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<UserScreenParams>>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getUser()
        .then(elem => setUser(elem?.allUser || []))
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={styles.newUser}
        onPress={() => navigation.navigate('NewUserScreen')}>
        <Text>Agregar nuevo</Text>
      </Pressable>
      {user.map(item => (
        <Pressable
          key={item._id}
          onPress={() =>
            navigation.navigate('UserIdScreen', {
              userId: item._id,
              name: item.name,
              email: item.email,
              rol: item.rol,
              state: item.state,
            })
          }>
          <Card>
            <Text>Nombre: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Rol: {item.rol}</Text>
            <Text style={{color: item.state ? 'green' : 'red'}}>
              Estado: {item.state ? 'Activo' : 'Inactivo'}
            </Text>
            <Text>
              Creado el: {new Date(item.createdAt!).toLocaleDateString()}
            </Text>
            <Text>--------------------</Text>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
  },
  newUser: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
