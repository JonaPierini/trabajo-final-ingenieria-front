import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ClientScreen} from '../../screen/client/ClientScreen';
import {ClientId} from '../../screen/client/ClientId';

export type ClientStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  ClientScreen: undefined;
  //Segunda Pantalla
  ClientId: {
    clientId: string;
    name: string;
  };
};

const Stack = createNativeStackNavigator<ClientStackParams>();

export const ClientNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientScreen" component={ClientScreen} />
      <Stack.Screen name="ClientId" component={ClientId} />
    </Stack.Navigator>
  );
};
