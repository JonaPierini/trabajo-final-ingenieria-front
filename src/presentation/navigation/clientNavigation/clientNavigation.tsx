import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ClientScreen} from '../../screen/client/ClientScreen';
import {ClientIdScreen} from '../../screen/client/ClientIdScreen';
import {NewClientScreen} from '../../screen/client/NewClientScreen';

export type ClientStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  ClientScreen: undefined;
  //Segunda Pantalla
  ClientIdScreen: {
    clientId: string;
    name: string;
    email: string;
    address: string;
    location: string;
    provinces: string;
  };
  NewClientScreen: undefined;
};

const Stack = createNativeStackNavigator<ClientStackParams>();

export const ClientNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientScreen" component={ClientScreen} />
      <Stack.Screen name="ClientIdScreen" component={ClientIdScreen} />
      <Stack.Screen name="NewClientScreen" component={NewClientScreen} />
    </Stack.Navigator>
  );
};
