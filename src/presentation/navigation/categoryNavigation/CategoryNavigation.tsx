import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CategoryScreen} from '../../screen/category/CategoryScreen';
import {CategoryIdScreen} from '../../screen/category/CategoryIdScreen';
import {NewCategoryScreen} from '../../screen/category/NewCategoryScreen';

export type CategoryStackParams = {
  //Los nombres tienen que coicidir con los pasados en el Stack.Screen name
  //Primer Pantallas
  CategoryScreen: undefined;
  //Segunda Pantalla
  CategoryIdScreen: {};
  NewCategoryScreen: undefined;
};

const Stack = createNativeStackNavigator<CategoryStackParams>();

export const CategoryNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="CategoryScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="CategoryIdScreen" component={CategoryIdScreen} />
      <Stack.Screen name="NewCategoryScreen" component={NewCategoryScreen} />
    </Stack.Navigator>
  );
};
