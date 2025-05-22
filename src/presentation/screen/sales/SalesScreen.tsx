import React from 'react';
import {View, Text} from 'react-native';

export const SalesScreen = () => {
  // Lista de Ventas. Al seleccionar una venta en particular vas a navegar a la pantalla de VentasIdScreen.
  // Vas a poder Eliminarlo o Editarlo (Ejemplo cliente y montos)

  //Agregar nuevo vas a navegar a NewSalesScreen y vas a poder crear una nueva venta => la venta tiene que estar asociado a un usuario (quien ingreso al sistema), asignado a un cliente, asignado un producto y que saque el total
  return (
    <View>
      <Text>SalesScreen</Text>
    </View>
  );
};
