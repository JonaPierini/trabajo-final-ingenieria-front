import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeScreen} from '../../screen/home/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClientNavigation} from '../clientNavigation/ClientNavigation';
import {BudgetNavigation} from '../budgetNavigation/BudgetNavigation';
import {ProductNavigation} from '../productNavigation/ProductNavigation';
import {UserNavigation} from '../userNavigation/UserNavigation';
import {CategoryNavigation} from '../categoryNavigation/CategoryNavigation';
import {SalesNavigation} from '../salesNavigation/SalesNavigation';

export type RouteNavigationParams = {
  HomeScreen: undefined;
  UserNavigation: undefined;
  ClientNavigation: undefined;
  SalesNavigation: undefined;
  ProductNavigation: undefined;
  CategoryNavigation: undefined;
  BudgetNavigation: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<RouteNavigationParams>();

export const RouteNavigation = () => {
  return (
    <>
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
          options={{
            title: 'Usuarios',
            tabBarIcon: UserIcon,
          }}
          name="UserNavigation"
          component={UserNavigation}
        />
        <Tab.Screen
          options={{title: 'Clientes', tabBarIcon: ClientIcon}}
          name="ClientNavigation"
          component={ClientNavigation}
        />
        <Tab.Screen
          options={{title: 'Ventas', tabBarIcon: SalesIcon}}
          name="SalesNavigation"
          component={SalesNavigation}
        />
        <Tab.Screen
          options={{title: 'Productos', tabBarIcon: ProductIcon}}
          name="ProductNavigation"
          component={ProductNavigation}
        />
        <Tab.Screen
          options={{title: 'Categoria', tabBarIcon: CategoryIcon}}
          name="CategoryNavigation"
          component={CategoryNavigation}
        />
        <Tab.Screen
          options={{title: 'Presupesto', tabBarIcon: BudgetIcon}}
          name="BudgetNavigation"
          component={BudgetNavigation}
        />
      </Tab.Navigator>
    </>
  );
};

const HomeIcon = () => <Icon name="home" size={20} />;
const UserIcon = () => <Icon name="user" size={20} />;
const ClientIcon = () => <Icon name="user-circle" size={20} />;
const SalesIcon = () => <Icon name="cart-plus" size={20} />;
const ProductIcon = () => <Icon name="product-hunt" size={20} />;
const CategoryIcon = () => <Icon name="folder" size={20} />;
const BudgetIcon = () => <Icon name="tasks" size={20} />;
