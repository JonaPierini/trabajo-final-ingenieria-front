import React, {useState} from 'react';
import {View, Button, TextInput, Alert} from 'react-native';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Client} from '../../../infrastructure/client.response';
import {newClient} from '../../../actions/client/newClient';
import {useNavigation} from '@react-navigation/native';

export const NewClientScreen = () => {
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
          <Button
            title="Confirmar"
            onPress={handleNewClient}
            disabled={
              formState.name.length === 0 ||
              formState.email.length === 0 ||
              formState.address.length === 0 ||
              formState.location.length === 0 ||
              formState.provinces.length === 0
            }></Button>
        </Card>
      </>
    </View>
  );
};
