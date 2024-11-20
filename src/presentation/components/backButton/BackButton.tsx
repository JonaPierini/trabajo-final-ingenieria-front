import {useNavigation, useNavigationState} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native';

export const BackButton = () => {
  const navigate = useNavigation();
  const currentTabName = useNavigationState(state => {
    const tabState = state.routes[state.index].state; // Estado del Tab Navigator
    if (tabState) {
      const {index, routeNames} = tabState; // Extraer índice y nombres de rutas
      return routeNames && routeNames[index!]; // Obtener el nombre de la pestaña activa
    }
    return state.routes[state.index].name; // Caso para pantallas sin estado anidado
  });

  // Ocultar el botón en la pestaña HomeScreen
  if (currentTabName === 'HomeScreen') {
    return null;
  }

  return <Button title="volver" onPress={() => navigate.goBack()} />;
};
