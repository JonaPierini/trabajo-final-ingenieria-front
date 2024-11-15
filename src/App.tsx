import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './presentation/navigation/appNavigation/AppNavigation';

//Icons => https://oblador.github.io/react-native-vector-icons/

const Mytheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#575759', // Color de fondo
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const App = () => {
  return (
    <NavigationContainer theme={Mytheme}>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
