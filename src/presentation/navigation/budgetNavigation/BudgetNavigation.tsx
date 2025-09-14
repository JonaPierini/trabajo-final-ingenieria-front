import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BudgetScreen} from '../../screen/budget/BudgetScreen';
import {User} from '../../../infrastructure/user.response';
import {Client} from '../../../infrastructure/client.response';
import {Product} from '../../../infrastructure/product.response';
import {BudgetIdScreen} from '../../screen/budget/BudgetIdScreen';
import {NewBudgetScreen} from '../../screen/budget/NewBudgetScreen';

export type BudgetStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  BudgetScreen: undefined;
  //Segunda Pantalla
  BudgetIdScreen: {
    budgetId: string;
    user: User;
    cliente: Client;
    product: Product[];
    state: boolean;
    total: number;
    createdAt?: string; // ISO date string
  };
  //Tercera Pantallas
  NewBudgetScreen: undefined;
};

const Stack = createNativeStackNavigator<BudgetStackParams>();

export const BudgetNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BudgetScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
      <Stack.Screen name="BudgetIdScreen" component={BudgetIdScreen} />
      <Stack.Screen name="NewBudgetScreen" component={NewBudgetScreen} />
    </Stack.Navigator>
  );
};
