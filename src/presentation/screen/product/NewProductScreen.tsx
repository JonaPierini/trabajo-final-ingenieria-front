import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {ProductCreatePayload} from '../../../infrastructure/product.response';

export const NewProductScreen = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState({
    precio: 0,
    stock: 0,
  });
  const [formState, setFormState] = useState<ProductCreatePayload>({
    name: '',
    value: values.precio,
    stock: 0,
    description: '',
    state: true,
    category: '',
  });

  const handleNewProduct = () => {};

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
            <Text style={styles.label}>Precio:</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                setValues({
                  ...values,
                  precio: values.precio > 0 ? values.precio - 1 : 0,
                })
              }>
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.value}>{values.precio}</Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                setValues({
                  ...values,
                  precio: values.precio + 1,
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
                  stock: values.stock > 0 ? values.stock - 1 : 0,
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

          <Button title="Confirmar" onPress={handleNewProduct}></Button>
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
