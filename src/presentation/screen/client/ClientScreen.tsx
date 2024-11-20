import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {getClient} from '../../../actions/client/getClient';
import {Client} from '../../../infrastructure/client.response';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export type ClientScreenParams = {
  ClientId: {
    clientId: string;
    name: string;
  };
};

export const ClientScreen = () => {
  const [client, setClient] = useState<Client[]>([]);

  const navigation = useNavigation<NavigationProp<ClientScreenParams>>();

  useEffect(() => {
    getClient()
      .then(elem => setClient(elem?.allClient || []))
      .catch(e => console.log(e));
  }, [client]);

  return (
    <ScrollView style={styles.scrollView}>
      {client.map(item => (
        <Pressable
          key={item._id}
          style={styles.mainView}
          onPress={() =>
            navigation.navigate('ClientId', {
              clientId: item._id,
              name: item.name,
            })
          }>
          <Text>Nombre: {item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Dirección: {item.address}</Text>
          <Text>Localidad: {item.location}</Text>
          <Text>Provincia: {item.provinces}</Text>
          <Text>
            Creado el: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <Text>--------------------</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
  mainView: {
    marginBottom: 20, // Espaciado entre los elementos
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Solo en Android
  },
});
