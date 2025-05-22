import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SalesScreen} from '../../screen/sales/SalesScreen';
import {SalesIdScreen} from '../../screen/sales/SalesIdScreen';
import {NewSalesScreen} from '../../screen/sales/NewSalesScreen';

export type SalesStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  SalesScreen: undefined;
  //Segunda Pantalla
  SalesIdScreen: {};
  NewSalesScreen: undefined;
};

const Stack = createNativeStackNavigator<SalesStackParams>();

export const SalesNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SalesScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SalesScreen" component={SalesScreen} />
      <Stack.Screen name="SalesIdScreen" component={SalesIdScreen} />
      <Stack.Screen name="NewSalesScreen" component={NewSalesScreen} />
    </Stack.Navigator>
  );
};
