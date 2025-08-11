import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {Category} from '../../../infrastructure/category.response';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {getCategory} from '../../../actions/category/getCategory';
import {Loading} from '../../components/loading/Loading';
import {Card} from '../../components/card/Card';

export type CategoryScreenParams = {
  CategoryIdScreen: {
    categoryId?: string;
  };
  NewCategoryScreen: undefined;
};

export const CategoryScreen = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<CategoryScreenParams>>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getCategory()
        .then(elem => {
          setCategory(elem?.allCategory || []);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) return <Loading />;

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={styles.newClient}
        onPress={() => navigation.navigate('NewCategoryScreen')}>
        <Text>Agregar nuevo</Text>
      </Pressable>
      {category.map(item => (
        <Pressable
          key={item._id}
          onPress={() =>
            navigation.navigate('CategoryIdScreen', {
              categoryId: item._id,
            })
          }>
          <Card>
            <Text>Nombre: {item.name}</Text>
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
  newClient: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
