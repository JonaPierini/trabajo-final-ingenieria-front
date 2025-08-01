import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClientNavigation} from '../clientNavigation/ClientNavigation';
import {BudgetNavigation} from '../budgetNavigation/BudgetNavigation';
import {ProductNavigation} from '../productNavigation/ProductNavigation';
import {UserNavigation} from '../userNavigation/UserNavigation';
import {CategoryNavigation} from '../categoryNavigation/CategoryNavigation';
import {SalesNavigation} from '../salesNavigation/SalesNavigation';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {HomeUserNavigation} from '../homeUserNavigation/HomeUserNavigation';

export type RouteNavigationParams = {
  HomeNavigation: undefined;
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
  const {user} = useAuthStore();
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
          name="HomeNavigation"
          component={HomeUserNavigation}
        />
        {user?.rol === 'ADMIN_ROLE' && (
          <Tab.Screen
            options={{
              title: 'Usuarios',
              tabBarIcon: UserIcon,
            }}
            name="UserNavigation"
            component={UserNavigation}
          />
        )}

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
        {user?.rol === 'ADMIN_ROLE' && (
          <>
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
          </>
        )}

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
const UserIcon = () => <Icon name="users" size={20} />;
const ClientIcon = () => <Icon name="user-plus" size={20} />;
const SalesIcon = () => <Icon name="cart-plus" size={20} />;
const ProductIcon = () => <Icon name="product-hunt" size={20} />;
const CategoryIcon = () => <Icon name="folder" size={20} />;
const BudgetIcon = () => <Icon name="tasks" size={20} />;
