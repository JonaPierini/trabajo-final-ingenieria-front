import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import {ClientStackParams} from '../../navigation/clientNavigation/clientNavigation';
import {getClientById} from '../../../actions/client/getClientById';
import {Client} from '../../../infrastructure/client.response';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {deleteClientById} from '../../../actions/client/deleteClientById';
import {updateClientById} from '../../../actions/client/updateClientById';

interface FormInterface {
  name: string;
  email: string;
  address: string;
  location: string;
  provinces: string;
}

export const ClientId = () => {
  const navigation = useNavigation();

  const params = useRoute<RouteProp<ClientStackParams, 'ClientId'>>().params;

  const [clientId, setClientId] = useState<Client | null>(null);

  const [up, setUp] = useState<Boolean>(false);
  const [formState, setFormState] = useState<Client>({
    name: params.name,
    email: params.email,
    address: params.address,
    location: params.location,
    provinces: params.provinces,
  });

  useEffect(() => {
    getClientById(params.clientId)
      .then(elem => setClientId(elem?.clientById ?? null))
      .catch(e => console.log(e));
  }, []);

  const handleDelete = () => {
    deleteClientById(params.clientId)
      .then(() => setClientId(null))
      .then(() => {
        Alert.alert(
          'Cliente borrado con éxito', // Título del Alert
          '', // Mensaje del Alert (puedes dejarlo vacío)
          [
            {
              text: 'OK', // Texto del botón
              onPress: () => navigation.goBack(), // Acción al presionar OK
            },
          ],
        );
      })
      .catch(e => console.log(e));
  };

  const handleEdit = () => {
    setUp(prev => !prev);
  };

  const handleConfirm = () => {
    updateClientById(params.clientId, formState) // Envía el ID y los datos actualizados
      .then(() => {
        {
          setClientId(formState); // Actualiza el estado local con los nuevos valores
          Alert.alert('Cliente actualizado con existo', '', [
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
    <>
      <BackButton />
      <Card>
        {up ? (
          <>
            <TextInput
              placeholder={clientId?.name}
              style={{color: 'tomato'}}
              value={formState.name}
              onChangeText={name => setFormState({...formState, name})}
            />
            <TextInput
              placeholder={clientId?.email}
              style={{color: 'tomato'}}
              value={formState.email}
              onChangeText={email => setFormState({...formState, email})}
            />
            <TextInput
              placeholder={clientId?.address}
              style={{color: 'tomato'}}
              value={formState.address}
              onChangeText={address => setFormState({...formState, address})}
            />
            <TextInput
              placeholder={clientId?.location}
              style={{color: 'tomato'}}
              value={formState.location}
              onChangeText={location => setFormState({...formState, location})}
            />
            <TextInput
              placeholder={clientId?.provinces}
              style={{color: 'tomato'}}
              value={formState.provinces}
              onChangeText={provinces =>
                setFormState({...formState, provinces})
              }
            />
            <Button title="Confirmar" onPress={handleConfirm}></Button>
          </>
        ) : (
          <>
            <Text>Nombre: {clientId?.name}</Text>
            <Text>Email: {clientId?.email}</Text>
            <Text>Dirección: {clientId?.address}</Text>
            <Text>Localidad: {clientId?.location}</Text>
            <Text>Provincia: {clientId?.provinces}</Text>
          </>
        )}
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, {backgroundColor: '#f23939'}]}
          onPress={handleDelete}>
          <Text style={styles.text}>Eliminar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, {backgroundColor: '#1476bc'}]}
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
  },
  text: {
    color: '#fff',
  },
});
