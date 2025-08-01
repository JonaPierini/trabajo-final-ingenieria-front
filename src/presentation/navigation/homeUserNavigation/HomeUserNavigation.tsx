import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreenUserId} from '../../screen/home/HomeScreenUserId';
import {HomeScreenUser} from '../../screen/home/HomeScreenUser';

export type HomeUserStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  HomeScreenUser: undefined;
  //Segunda Pantalla
  HomeScreenUserId: {
    userId: string;
    name: string;
    email: string;
    rol: string;
    state: boolean;
    password: string;
  };
};

const Stack = createNativeStackNavigator<HomeUserStackParams>();

export const HomeUserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreenUser"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreenUser" component={HomeScreenUser} />
      <Stack.Screen name="HomeScreenUserId" component={HomeScreenUserId} />
    </Stack.Navigator>
  );
};
