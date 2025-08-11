import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Alert, TextInput, Button} from 'react-native';
import {CategoryCreatePayload} from '../../../infrastructure/category.response';
import {newCategory} from '../../../actions/category/newCategory';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';

export const NewCategoryScreen = () => {
  // Creacion de Usuarios con asignacion de Rol
  const navigation = useNavigation();
  const [formState, setFormState] = useState<CategoryCreatePayload>({
    name: '',
    state: true,
  });

  const handleNewCategory = () => {
    newCategory(formState)
      .then(() => {
        Alert.alert('Categoría creada con éxito', '', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      });
  };

  return (
    <View>
      <BackButton />
      <>
        <Card>
          <TextInput
            placeholder="Nombre"
            value={formState.name}
            onChangeText={name => setFormState({...formState, name})}
          />
          <Button
            title="Confirmar"
            onPress={handleNewCategory}
            disabled={formState.name.length === 0}></Button>
        </Card>
      </>
    </View>
  );
};
