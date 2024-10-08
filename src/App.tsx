import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './presentation/navigation/AppNavigation/AppNavigation';

//Icons => https://oblador.github.io/react-native-vector-icons/

export const App = () => {
  return (
    // <SafeAreaView style={styles.container}>
    //   <LoginScreen />
    // </SafeAreaView>
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: '#ffffff', // Color principal, puedes ajustarlo según sea necesario
          background: '#202023', // Color de fondo
          card: '#1f1f1f', // Color de las tarjetas (navegación, headers, etc.)
          text: '#ffffff', // Color del texto
          border: '#272727', // Color de los bordes
          notification: '#ff453a', // Color de las notificaciones
        },
      }}>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202023',
  },
});
