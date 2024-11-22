import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, Pressable, StyleSheet, Alert} from 'react-native';
import {ClientStackParams} from '../../navigation/clientNavigation/clientNavigation';
import {getClientById} from '../../../actions/client/getClientById';
import {Client} from '../../../infrastructure/client.response';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {deleteClientById} from '../../../actions/client/deleteClientById';

export const ClientId = () => {
  const navigation = useNavigation();

  const params = useRoute<RouteProp<ClientStackParams, 'ClientId'>>().params;

  const [clientId, setClientId] = useState<Client | null>(null);

  useEffect(() => {
    getClientById(params.clientId)
      .then(elem => setClientId(elem?.clientById ?? null))
      .catch(e => console.log(e));
  }, []);

  const handleDelete = () => {
    Alert.alert('Cliente borrado con exito');
    deleteClientById(params.clientId)
      .then(() => setClientId(null))
      .catch(e => console.log(e))
      .finally(() => navigation.goBack());
  };

  return (
    <>
      <BackButton />
      <Card>
        <Text>Nombre: {clientId?.name}</Text>
        <Text>Email: {clientId?.email}</Text>
        <Text>Dirección: {clientId?.address}</Text>
        <Text>Localidad: {clientId?.location}</Text>
        <Text>Provincia: {clientId?.provinces}</Text>
        <Text>
          Creado el:{' '}
          {clientId?.createdAt
            ? new Date(clientId.createdAt).toLocaleDateString()
            : 'Fecha no disponible'}
        </Text>
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, {backgroundColor: '#f23939'}]}
          onPress={handleDelete}>
          <Text style={styles.text}>Eliminar</Text>
        </Pressable>
        <Pressable style={[styles.btn, {backgroundColor: '#1476bc'}]}>
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
  },
  text: {
    color: '#fff',
  },
});
