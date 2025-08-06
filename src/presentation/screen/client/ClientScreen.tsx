import React, {useCallback, useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, Pressable, View} from 'react-native';
import {getClient} from '../../../actions/client/getClient';
import {Client} from '../../../infrastructure/client.response';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Card} from '../../components/card/Card';
import {Loading} from '../../components/loading/Loading';

export type ClientScreenParams = {
  ClientIdScreen: {
    clientId?: string;
    name: string;
    email: string;
    address: string;
    location: string;
    provinces: string;
  };
  NewClientScreen: undefined;
};

export const ClientScreen = () => {
  const [client, setClient] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<ClientScreenParams>>();

  // Cargar datos cuando la pantalla se enfoca
  // useFocusEffect:  Este hook se ejecuta cada vez que la pantalla ClientScreen se enfoca (es decir, cuando regresas a ella desde NewClientScreen).
  // useCallback: Se utiliza para evitar que la función proporcionada a useFocusEffect se cree en cada renderizado.
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getClient()
        .then(elem => setClient(elem?.allClient || []))
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={styles.newClient}
        onPress={() => navigation.navigate('NewClientScreen')}>
        <Text>Agregar nuevo</Text>
      </Pressable>
      {client.map(item => (
        <Pressable
          key={item._id}
          onPress={() =>
            navigation.navigate('ClientIdScreen', {
              clientId: item._id,
              name: item.name,
              email: item.email,
              address: item.address,
              location: item.location,
              provinces: item.provinces,
            })
          }>
          <Card>
            <Text>Nombre: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Dirección: {item.address}</Text>
            <Text>Localidad: {item.location}</Text>
            <Text>Provincia: {item.provinces}</Text>
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
  newClient: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
