import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout, user} = useAuthStore();

  return (
    <View>
      <Text>
        Home - Bienvenido {user?.name} - SU ROL ES: {user?.rol}
      </Text>
      <Pressable onPress={logout}>
        <Text>Cerrar sesion</Text>
      </Pressable>
    </View>
  );
};
