import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthNavigation} from '../authNavigation/AuthNavigation';
import {AuthProvider} from '../../providers/AuthoProvider';
import {RouteNavigation} from '../rootNavigation/RouteNavigation';

export type RootStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  AuthNavigation: undefined;
  RouteNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const AppNavigation = () => {
  return (
    <AuthProvider>
      <Stack.Navigator
        initialRouteName="AuthNavigation"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        <Stack.Screen name="RouteNavigation" component={RouteNavigation} />
      </Stack.Navigator>
    </AuthProvider>
  );
};
