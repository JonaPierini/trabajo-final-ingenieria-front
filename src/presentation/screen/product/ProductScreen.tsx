import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {Card} from '../../components/card/Card';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Product} from '../../../infrastructure/product.response';
import {Loading} from '../../components/loading/Loading';
import {getProduct} from '../../../actions/product/getProduct';

export type ProductScreenParams = {
  ProductIdScreen: {
    productId?: string;
    name: string;
    description: string;
    category: {
      _id: string;
      name: string;
    };
    user: {
      _id: string;
      name: string;
    };
    value: number;
    stock: number;
    state: boolean;
  };
  NewProductScreen: undefined;
};

export const ProductScreen = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<ProductScreenParams>>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getProduct()
        .then(elem => setProduct(elem?.allProduct || []))
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) return <Loading />;
  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={styles.newUser}
        onPress={() => navigation.navigate('NewProductScreen')}>
        <Text>Agregar nuevo</Text>
      </Pressable>
      {product.map(item => (
        <Pressable
          key={item._id}
          onPress={() =>
            navigation.navigate('ProductIdScreen', {
              productId: item._id,
              name: item.name,
              description: item.description,
              category: {
                _id: item.category._id,
                name: item.category.name,
              },
              user: {
                _id: item.user._id,
                name: item.user.name,
              },
              value: item.value,
              stock: item.stock,
              state: item.state,
            })
          }>
          <Card>
            <Text>Nombre: {item.name}</Text>
            <Text>Categoria: {item.category.name}</Text>
            <Text>Precio: {item.value}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text style={{color: item.state ? 'green' : 'red'}}>
              Estado: {item.state ? 'Activo' : 'Inactivo'}
            </Text>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10,
  },
  newUser: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
