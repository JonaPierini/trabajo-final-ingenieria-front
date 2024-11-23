import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, ScrollView, Pressable, View} from 'react-native';
import {getClient} from '../../../actions/client/getClient';
import {Client} from '../../../infrastructure/client.response';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Card} from '../../components/card/Card';

export type ClientScreenParams = {
  ClientId: {
    clientId?: string;
    name: string;
    email: string;
    address: string;
    location: string;
    provinces: string;
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
          onPress={() =>
            navigation.navigate('ClientId', {
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
});
