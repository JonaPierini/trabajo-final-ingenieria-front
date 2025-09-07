import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ProductScreen} from '../../screen/product/ProductScreen';
import {ProductIdScreen} from '../../screen/product/ProductIdScreen';
import {NewProductScreen} from '../../screen/product/NewProductScreen';

export type ProductStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  ProductScreen: undefined;
  //Segunda Pantalla
  ProductIdScreen: {
    productId: string;
    name: string;
    description: string;
    category: {
      _id: string;
      name: string;
    };
    user: {
      _id: string;
      name: string;
    };
    value: number;
    stock: number;
    state: boolean;
  };
  NewProductScreen: undefined;
};

const Stack = createNativeStackNavigator<ProductStackParams>();

export const ProductNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="ProductIdScreen" component={ProductIdScreen} />
      <Stack.Screen name="NewProductScreen" component={NewProductScreen} />
    </Stack.Navigator>
  );
};
