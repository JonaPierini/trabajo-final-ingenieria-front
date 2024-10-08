/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import React from 'react';
import {AuthNavigation} from '../AuthNavigation/AuthNavigation';

export type RootStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  AuthNavigation: undefined;
  RouteNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const AppNavigation = () => {
  //USEAMOS el store
  const status = 'unAuthorized';
  console.log(status);

  function RouteNavigation() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>RouteNavigation</Text>
      </View>
    );
  }

  return status === 'unAuthorized' ? (
    <Stack.Navigator
      initialRouteName="AuthNavigation"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RouteNavigation" component={RouteNavigation} />
    </Stack.Navigator>
  );
};
