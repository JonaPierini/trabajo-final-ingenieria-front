import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {LoginScreen} from './presentation/screen/login/LoginScreen';

//Icons => https://oblador.github.io/react-native-vector-icons/

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202023',
  },
});
