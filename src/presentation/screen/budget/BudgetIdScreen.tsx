import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {BudgetStackParams} from '../../navigation/budgetNavigation/BudgetNavigation';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';

export const BudgetIdScreen = () => {
  const params =
    useRoute<RouteProp<BudgetStackParams, 'BudgetIdScreen'>>().params;

  const {budgetId, user, cliente, product, total, createdAt} = params;

  return (
    <>
      <BackButton />
      <Card>
        <Text>Fecha: {createdAt}</Text>
        <Text>Presupuesto-Id: {budgetId}</Text>
        <Text>Cliente: {cliente?.name}</Text>
        <Text style={{fontWeight: 'bold'}}>Productos:</Text>
        {product.map((item: any) => (
          <View
            key={item._id}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10, fontSize: 12}}>•</Text>
            <Text>Nombre: {item.productId.name}, </Text>
            <Text>Cantidad: {item.quantity}, </Text>
            <Text>Precio: {item.productId.value} </Text>
          </View>
        ))}
        <Text>Total: {total}</Text>
        <Text>Responsable: {user.name}</Text>
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, {backgroundColor: '#f23939'}]}
          onPress={() => console.log('Borrar')}>
          <Text style={styles.text}>Eliminar</Text>
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
    width: '100%',
    padding: 15,
    marginTop: 30,
  },
  text: {
    color: '#fff',
  },
});
