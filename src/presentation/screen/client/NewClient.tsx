import React, {useState} from 'react';
import {View, Button, TextInput, Alert} from 'react-native';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Client} from '../../../infrastructure/client.response';
import {newClient} from '../../../actions/client/newClient';
import {useNavigation} from '@react-navigation/native';

export const NewClient = () => {
  const navigation = useNavigation();
  const [formState, setFormState] = useState<Client>({
    name: '',
    email: '',
    address: '',
    location: '',
    provinces: '',
  });

  const handleNewClient = () => {
    newClient(formState)
      .then(() => setFormState(formState))
      .then(() => {
        Alert.alert(
          'Cliente creado con éxito', // Título del Alert
          '', // Mensaje del Alert (puedes dejarlo vacío)
          [
            {
              text: 'OK', // Texto del botón
              onPress: () => navigation.goBack(), // Acción al presionar OK
            },
          ],
        );
      })
      .catch(e => {
        Alert.alert(`${e.message}`);
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
            placeholder="Dirección"
            value={formState.address}
            onChangeText={address => setFormState({...formState, address})}
          />
          <TextInput
            placeholder="Localidad"
            value={formState.location}
            onChangeText={location => setFormState({...formState, location})}
          />
          <TextInput
            placeholder="Provincia"
            value={formState.provinces}
            onChangeText={provinces => setFormState({...formState, provinces})}
          />
          <Button title="Confirmar" onPress={handleNewClient}></Button>
        </Card>
      </>
    </View>
  );
};
