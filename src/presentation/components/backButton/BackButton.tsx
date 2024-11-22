import {useNavigation, useNavigationState} from '@react-navigation/native';
import {Button} from 'react-native';

export const BackButton = () => {
  const navigation = useNavigation();

  // Obtener el historial del stack actual
  const canGoBack = useNavigationState(state => state.routes.length > 1);

  if (!canGoBack) {
    // No mostrar el botón si estamos en el nivel raíz
    return null;
  }

  return (
    <Button
      color={'white'}
      title="Volver"
      onPress={() => {
        if (canGoBack) {
          navigation.goBack(); // Navegar al nivel anterior
        }
      }}
    />
  );
};
