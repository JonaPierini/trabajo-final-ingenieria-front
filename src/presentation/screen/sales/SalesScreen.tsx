import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {User} from '../../../infrastructure/user.response';
import {Client} from '../../../infrastructure/client.response';
import {ProductItem, Sale} from '../../../infrastructure/sale.response';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {getSale} from '../../../actions/sale/getSale';
import {Loading} from '../../components/loading/Loading';
import {Card} from '../../components/card/Card';

export type SaleScreenParams = {
  //BudgetId seria la url de la pantalla
  SaleIdScreen: {
    saleId?: string;
    user: User;
    cliente: Client;
    product: ProductItem[];
    state: boolean;
    total: number;
    createdAt?: string; // ISO date string
  };
  //NewBudget seria la pantalla
  NewSaleScreen: undefined;
};

export const SalesScreen = () => {
  const [sale, setSale] = useState<Sale[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<SaleScreenParams>>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getSale()
        .then(elem => setSale(elem?.allSale || []))
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={styles.newClient}
        onPress={() => navigation.navigate('NewSaleScreen')}>
        <Text>Agregar nuevo</Text>
      </Pressable>
      {sale.map(item => (
        <Pressable
          key={item._id}
          onPress={() =>
            navigation.navigate('SaleIdScreen', {
              saleId: item._id,
              user: item.user,
              cliente: item.client,
              product: item.product, // Esto es un array de objetos con productId y quantity
              state: item.state,
              total: item.total,
              createdAt: item.createdAt, // ISO date string
            })
          }>
          <Card>
            <Text>User: {item.user.name}</Text>
            <Text>Cliente: {item.client?.name}</Text>
            <Text style={{color: item?.state ? 'green' : 'red'}}>
              Estado: {item?.state ? 'Activo' : 'Inactivo'}
            </Text>
            <Text>
              Creado el: {new Date(item.createdAt!).toLocaleDateString()}
            </Text>
            <Text>--------------------</Text>
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
  newClient: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
