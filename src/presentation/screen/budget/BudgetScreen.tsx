import React, {useCallback, useState} from 'react';
import {Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Budget, ProductItem} from '../../../infrastructure/budget.response';
import {getBudget} from '../../../actions/budget/getBudget';
import {Card} from '../../components/card/Card';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {User} from '../../../infrastructure/user.response';
import {Client} from '../../../infrastructure/client.response';
import {Loading} from '../../components/loading/Loading';

export type BudgetScreenParams = {
  //BudgetId seria la url de la pantalla
  BudgetIdScreen: {
    budgetId?: string;
    user: User;
    cliente: Client;
    product: ProductItem[];
    total: number;
    createdAt?: string; // ISO date string
  };
  //NewBudget seria la pantalla
  NewBudgetScreen: undefined;
};

export const BudgetScreen = () => {
  const [budget, setBudget] = useState<Budget[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<BudgetScreenParams>>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getBudget()
        .then(elem => setBudget(elem?.allBudget || []))
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={styles.newClient}
        onPress={() => navigation.navigate('NewBudgetScreen')}>
        <Text>Agregar nuevo</Text>
      </Pressable>
      {budget.map(item => (
        <Pressable
          key={item._id}
          onPress={() =>
            navigation.navigate('BudgetIdScreen', {
              budgetId: item._id,
              user: item.user,
              cliente: item.client,
              product: item.product, // Esto es un array de objetos con productId y quantity
              total: item.total,
              createdAt: item.createdAt, // ISO date string
            })
          }>
          <Card>
            <Text>User: {item.user.name}</Text>
            <Text>Cliente: {item.client?.name}</Text>
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
