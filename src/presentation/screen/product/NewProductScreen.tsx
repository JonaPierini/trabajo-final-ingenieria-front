import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ProductCreatePayload} from '../../../infrastructure/product.response';
import {getCategory} from '../../../actions/category/getCategory';
import {Category} from '../../../infrastructure/category.response';
import {newProduct} from '../../../actions/product/newProduct';

export const NewProductScreen = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState({
    value: 1,
    stock: 1,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [formState, setFormState] = useState<ProductCreatePayload>({
    name: '',
    value: values.value,
    stock: values.stock,
    description: '',
    state: true,
    category: '',
  });

  useEffect(() => {
    getCategory()
      .then(elem => {
        const cats = elem?.allCategory || [];
        setCategories(cats); // esto dispara un render, pero no lo necesitamos para setear formState
        const firstId: string =
          cats.length > 0 && cats[0]?._id ? cats[0]._id : '';
        // usar versión funcional para evitar stale state
        setFormState(prev => ({
          ...prev,
          category: firstId, // default seguro
        }));
      })
      .catch(e => console.log(e));
  }, []);

  const handleNewProduct = () => {
    const product = {
      ...formState,
      value: values.value,
      stock: values.stock,
    };
    newProduct(product)
      .then(() => {
        Alert.alert('Producto creado con éxito', '', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(e => {
        console.log(e);
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
          <View>
            <Text style={styles.label}>Valor:</Text>
            <TouchableOpacity
              style={styles.btn}
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
              style={styles.btn}
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
              style={styles.btn}
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
              style={styles.btn}
              onPress={() =>
                setValues({
                  ...values,
                  stock: values.stock + 1,
                })
              }>
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Descripcion"
            value={formState.description}
            onChangeText={description =>
              setFormState({...formState, description})
            }
          />
          <Text style={{marginTop: 1, color: '#ccc'}}>Categoria:</Text>
          <Picker
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 5,
            }}
            selectedValue={formState.category}
            onValueChange={itemValue =>
              setFormState({...formState, category: itemValue})
            }
            dropdownIconColor="#000">
            {categories.map(elem => (
              <Picker.Item key={elem._id} label={elem.name} value={elem._id} />
            ))}
          </Picker>

          <Button
            title="Confirmar"
            onPress={handleNewProduct}
            disabled={
              formState.name.length === 0 || formState.description.length === 0
            }></Button>
        </Card>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginRight: 8,
  },
  value: {
    fontSize: 16,

    minWidth: 30,
    textAlign: 'center',
  },
  btn: {
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
