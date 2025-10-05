import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SalesScreen} from '../../screen/sales/SalesScreen';
import {SalesIdScreen} from '../../screen/sales/SalesIdScreen';
import {NewSalesScreen} from '../../screen/sales/NewSalesScreen';
import {User} from '../../../infrastructure/user.response';
import {Client} from '../../../infrastructure/client.response';
import {Product} from '../../../infrastructure/product.response';

export type SaleStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  SaleScreen: undefined;
  //Segunda Pantalla
  SaleIdScreen: {
    saleId: string;
    user: User;
    cliente: Client;
    product: Product[];
    state: boolean;
    total: number;
    createdAt?: string; // ISO date string
  };
  NewSaleScreen: undefined;
};

const Stack = createNativeStackNavigator<SaleStackParams>();

export const SalesNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SaleScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SaleScreen" component={SalesScreen} />
      <Stack.Screen name="SaleIdScreen" component={SalesIdScreen} />
      <Stack.Screen name="NewSaleScreen" component={NewSalesScreen} />
    </Stack.Navigator>
  );
};
