import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout, user} = useAuthStore();

  return (
    <View>
      <Text>HomeScreen - Bienvenido {user?.name}</Text>
      <Pressable onPress={logout}>
        <Text>Cerrar sesion</Text>
      </Pressable>
    </View>
  );
};
