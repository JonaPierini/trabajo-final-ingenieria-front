import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import {CategoryStackParams} from '../../navigation/categoryNavigation/CategoryNavigation';
import {Category} from '../../../infrastructure/category.response';
import {getCategoryById} from '../../../actions/category/getCategoryById';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';

import {Loading} from '../../components/loading/Loading';
import {deleteCategoryById} from '../../../actions/category/deleteUserById';
import {updateCategoryById} from '../../../actions/category/updateCategoryById';

export const CategoryIdScreen = () => {
  const navigation = useNavigation();

  const params =
    useRoute<RouteProp<CategoryStackParams, 'CategoryIdScreen'>>().params;
  const [categoryId, setCategoryId] = useState<Category>();
  const [loading, setLoading] = useState<boolean>(true);

  const [up, setUp] = useState<Boolean>(false);
  const [formState, setFormState] = useState<Category>({
    name: '',
    user: {
      _id: '',
      name: '',
    },
    state: true,
  });

  useEffect(() => {
    setLoading(true);
    getCategoryById(params.categoryId)
      .then(elem => {
        const cat = elem?.categoryById;
        if (cat) {
          setCategoryId(cat);
          setFormState({
            _id: cat._id,
            name: cat.name,
            user: cat.user,
            state: cat.state,
          });
        }
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = () => {
    deleteCategoryById(params.categoryId)
      //      .then(() => setUserId(null))
      .then(() => {
        Alert.alert(
          'Categoria borrada con éxito', // Título del Alert
          '', // Mensaje del Alert
          [
            {
              text: 'OK', // Texto del botón
              onPress: () => navigation.goBack(), // Acción al presionar OK
            },
          ],
        );
      })
      .catch(e => console.log(e));
  };

  const handleEdit = () => {
    setUp(prev => !prev);
  };

  const handleConfirm = () => {
    updateCategoryById(params.categoryId, formState) // Envía el ID y los datos actualizados
      .then(() => {
        {
          setCategoryId(formState); // Actualiza el estado local con los nuevos valores
          Alert.alert('Categoria actualizado con exito', '', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
          setUp(false); // Sale del modo edición
        }
      })
      .catch(e => {
        Alert.alert(`${e.message}`);
      });
  };

  if (loading) return <Loading />;

  return (
    <>
      <BackButton />
      <Card>
        {up ? (
          <>
            <TextInput
              placeholder={categoryId?.name}
              value={formState?.name}
              onChangeText={name =>
                setFormState(prev => (prev ? {...prev, name: name} : prev))
              }
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#ccc'}}>Estado:</Text>
              <Text style={{marginRight: 5, marginLeft: 5}}>
                {formState?.state ? 'Activo' : 'Inactivo'}
              </Text>
              <Switch
                value={formState.state}
                onValueChange={state =>
                  setFormState(prev => (prev ? {...prev, state: state} : prev))
                }
              />
            </View>
            <Button title="Confirmar" onPress={handleConfirm}></Button>
          </>
        ) : (
          <>
            <Text>Nombre: {categoryId?.name}</Text>
            <Text>Creador: {categoryId?.user?.name}</Text>
            <Text style={{color: categoryId?.state ? 'green' : 'red'}}>
              Estado: {categoryId?.state ? 'Activo' : 'Inactivo'}
            </Text>
          </>
        )}
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={categoryId?.state === false}
          style={[
            styles.btn,
            {backgroundColor: categoryId?.state ? '#f23939' : '#ccc'},
          ]}
          onPress={handleDelete}>
          <Text style={styles.text}>Eliminar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, {backgroundColor: '#1476bc'}]}
          onPress={handleEdit}>
          <Text style={styles.text}>Editar</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  btn: {
    alignItems: 'center',
    width: '50%',
    padding: 15,
    marginTop: 30,
  },
  text: {
    color: '#fff',
  },
});
