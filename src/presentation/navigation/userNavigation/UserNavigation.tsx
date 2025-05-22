import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserScreen} from '../../screen/user/UserScreen';
import {UserIdScreen} from '../../screen/user/UserIdScreen';
import {NewUserScreen} from '../../screen/user/NewUserScreen';

export type UserStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  UserScreen: undefined;
  //Segunda Pantalla
  UserIdScreen: {
    userId: string;
    name: string;
    email: string;
    rol: string;
    state: boolean;
  };
  NewUserScreen: undefined;
};

const Stack = createNativeStackNavigator<UserStackParams>();

export const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="UserIdScreen" component={UserIdScreen} />
      <Stack.Screen name="NewUserScreen" component={NewUserScreen} />
    </Stack.Navigator>
  );
};
