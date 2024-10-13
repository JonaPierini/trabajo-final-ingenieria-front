import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../../screen/home/HomeScreen';

export type RouteNavigationParams = {
  HomeScreen: undefined;
  AboutScreen: undefined;
  ProductSreen: undefined;
  BudgetScreen: undefined;
};

const Stack = createNativeStackNavigator<RouteNavigationParams>();

export const RouteNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
