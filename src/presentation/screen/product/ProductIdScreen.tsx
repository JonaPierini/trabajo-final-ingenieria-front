import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {ProductStackParams} from '../../navigation/productNavigation/ProductNavigation';
import {Product} from '../../../infrastructure/product.response';
import {getProductById} from '../../../actions/product/getProductById';
import {Loading} from '../../components/loading/Loading';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {deleteProductById} from '../../../actions/product/deleteProductById';
import {Picker} from '@react-native-picker/picker';
import {Category} from '../../../infrastructure/category.response';
import {getCategory} from '../../../actions/category/getCategory';
import {updateProductById} from '../../../actions/product/updateProductById';

export const ProductIdScreen = () => {
  const navigation = useNavigation();

  const params =
    useRoute<RouteProp<ProductStackParams, 'ProductIdScreen'>>().params;

  const [productId, setProductId] = useState<Product | null>(null);
  const [values, setValues] = useState({
    value: 1,
    stock: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [up, setUp] = useState<Boolean>(false);
  const [formState, setFormState] = useState<Product>({
    name: params.name,
    description: params.description,
    category: {
      _id: params.category._id,
      name: params.category.name,
    },
    user: {
      _id: params.user._id,
      name: params.user.name,
    },
    value: params.value,
    stock: params.stock,
    state: params.state,
  });

  useEffect(() => {
    getCategory()
      .then(elem => {
        const cats = elem?.allCategory || [];
        setCategories(cats); // esto dispara un render, pero no lo necesitamos para setear formState
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setLoading(true);
    getProductById(params.productId)
      .then(elem => setProductId(elem?.productById ?? null))
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = () => {
    deleteProductById(params.productId)
      //      .then(() => setClientId(null))
      .then(() => {
        Alert.alert(
          'Producto borrado con éxito', // Título del Alert
          '', // Mensaje del Alert (puedes dejarlo vacío)
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
    // Usar la categoría actualmente seleccionada en el form
    const selectedCategoryId = formState.category?._id || params.category._id;

    const selectedCategoryName =
      categories.find(c => c._id === selectedCategoryId)?.name ??
      formState.category?.name ??
      params.category.name;

    // Payload que espera el backend: category = ObjectId (string)
    const payload = {
      name: formState.name,
      description: formState.description,
      category: selectedCategoryId, // <-- STRING, no objeto
      value: values.value,
      stock: values.stock,
      state: formState.state,
    };

    // Si tu tipo de API pide Partial<Product> (category objeto), usamos un cast puntual
    updateProductById(params.productId, payload as unknown as Partial<Product>)
      .then(() => {
        // Actualizamos lo que mostramos en pantalla con la categoría elegida
        setProductId(
          prev =>
            prev && {
              ...prev,
              name: formState.name,
              description: formState.description,
              value: formState.value,
              stock: formState.stock,
              state: formState.state,
              category: {_id: selectedCategoryId, name: selectedCategoryName},
            },
        );

        // Mantener formState en sync (sigue siendo objeto como te gusta tiparlo)
        setFormState(prev => ({
          ...prev,
          category: {_id: selectedCategoryId, name: selectedCategoryName},
        }));

        Alert.alert('Producto actualizado con exito', '', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
        setUp(false);
      })
      .catch(e => Alert.alert(`${e.message}`));
  };

  if (loading) return <Loading />;

  return (
    <>
      <BackButton />
      <Card>
        {up ? (
          <>
            <TextInput
              placeholder={productId?.name}
              style={{color: 'tomato'}}
              value={formState.name}
              onChangeText={name => setFormState({...formState, name})}
            />
            <TextInput
              autoCapitalize={'none'}
              placeholder={productId?.description}
              style={{color: 'tomato'}}
              value={formState.description}
              onChangeText={description =>
                setFormState({...formState, description})
              }
            />
            <View>
              <Text style={styles.label}>Valor:</Text>
              <TouchableOpacity
                style={styles.btnValue}
                onPress={() =>
                  setValues({
                    ...values,
                    value: values.value > 1 ? values.value - 1 : 1,
                  })
                }>
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.value}>{values.value}</Text>

              <TouchableOpacity
                style={styles.btnValue}
                onPress={() =>
                  setValues({
                    ...values,
                    value: values.value + 1,
                  })
                }>
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.label}>Cantidad:</Text>
              <TouchableOpacity
                style={styles.btnValue}
                onPress={() =>
                  setValues({
                    ...values,
                    stock: values.stock > 1 ? values.stock - 1 : 1,
                  })
                }>
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.value}>{values.stock}</Text>

              <TouchableOpacity
                style={styles.btnValue}
                onPress={() =>
                  setValues({
                    ...values,
                    stock: values.stock + 1,
                  })
                }>
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 1, color: '#ccc'}}>Categoria:</Text>
            <Picker
              style={{
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 8,
                marginTop: 5,
              }}
              selectedValue={formState.category._id} // usamos el _id actual
              onValueChange={(categoryId: string) => {
                const picked = categories.find(c => c._id === categoryId);
                setFormState({
                  ...formState,
                  category: {
                    _id: categoryId,
                    name: picked?.name ?? formState.category.name,
                  },
                });
              }}
              dropdownIconColor="#000">
              {categories.map(elem => (
                <Picker.Item
                  key={elem._id}
                  label={elem.name}
                  value={elem._id}
                />
              ))}
            </Picker>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: '#ccc'}}>Estado:</Text>
              <Text style={{marginRight: 5, marginLeft: 5}}>
                {formState.state ? 'Activo' : 'Inactivo'}
              </Text>
              <Switch
                value={formState.state}
                onValueChange={value =>
                  setFormState({...formState, state: value})
                }
              />
            </View>
            <Button title="Confirmar" onPress={handleConfirm}></Button>
          </>
        ) : (
          <>
            <Text>Nombre: {productId?.name}</Text>
            <Text>Descripicon: {productId?.description}</Text>
            <Text>Categoria: {productId?.category.name}</Text>
            <Text>Creada por: {productId?.user.name}</Text>
            <Text style={{color: productId?.state ? 'green' : 'red'}}>
              Estado: {productId?.state ? 'Activo' : 'Inactivo'}
            </Text>
          </>
        )}
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={productId?.state === false}
          style={[
            styles.btn,
            {backgroundColor: productId?.state ? '#f23939' : '#ccc'},
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
  label: {
    fontSize: 14,
    marginRight: 8,
  },
  value: {
    fontSize: 16,

    minWidth: 30,
    textAlign: 'center',
  },
  btnValue: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
