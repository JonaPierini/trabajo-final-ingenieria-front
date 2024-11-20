import React from 'react';
import {HomeScreen} from '../../screen/home/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductScreen} from '../../screen/product/ProductScreen';
import {BudgetScreen} from '../../screen/budget/BudgetScreen';
import {SearchScreen} from '../../screen/search/SearchScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ClientNavigation} from '../clientNavigation/clientNavigation';
import {BackButton} from '../../components/backButton/BackButton';

export type RouteNavigationParams = {
  HomeScreen: undefined;
  ClientNavigation: undefined;
  ProductScreen: undefined;
  BudgetScreen: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<RouteNavigationParams>();

export const RouteNavigation = () => {
  return (
    <>
      <BackButton />
      <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}>
        <Tab.Screen
          options={{
            title: 'Home',
            tabBarIcon: HomeIcon,
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{title: 'Clientes', tabBarIcon: ClientIcon}}
          name="ClientNavigation"
          component={ClientNavigation}
        />
        <Tab.Screen
          options={{title: 'Productos', tabBarIcon: ProductIcon}}
          name="ProductScreen"
          component={ProductScreen}
        />
        <Tab.Screen
          options={{title: 'Presupesto', tabBarIcon: BudgetIcon}}
          name="BudgetScreen"
          component={BudgetScreen}
        />
        <Tab.Screen
          options={{
            title: 'Buscar',
            tabBarIcon: SearchIcon,
          }}
          name="SearchScreen"
          component={SearchScreen}
        />
      </Tab.Navigator>
    </>
  );
};

const HomeIcon = () => <Icon name="home" size={20} />;
const ClientIcon = () => <Icon name="user-circle" size={20} />;
const ProductIcon = () => <Icon name="product-hunt" size={20} />;
const BudgetIcon = () => <Icon name="tasks" size={20} />;
const SearchIcon = () => <Icon name="search" size={20} />;
