import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../../screen/login/LoginScreen';
import React from 'react';

export type AuthNavigationParams = {
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthNavigationParams>();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        //cardStyleInterpolator: fadeAnimation
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};
