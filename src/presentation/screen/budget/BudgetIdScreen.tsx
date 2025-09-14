import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import {BudgetStackParams} from '../../navigation/budgetNavigation/BudgetNavigation';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {deleteBudgetById} from '../../../actions/budget/deleteBudgetById';
import {getBudgetById} from '../../../actions/budget/getBudgetById';
import {Budget} from '../../../infrastructure/budget.response';
import {Loading} from '../../components/loading/Loading';

export const BudgetIdScreen = () => {
  const navigation = useNavigation();
  const params =
    useRoute<RouteProp<BudgetStackParams, 'BudgetIdScreen'>>().params;
  const [budgetId, setBudgetId] = useState<Budget>();
  const [formState, setFormState] = useState<Budget>();

  const [up, setUp] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getBudgetById(params.budgetId)
      .then(elem => {
        const bud = elem?.budgetById;
        if (bud) {
          setBudgetId(bud);
          setFormState(bud);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = () => {
    deleteBudgetById(params.budgetId)
      //      .then(() => setClientId(null))
      .then(() => {
        Alert.alert(
          'Presupuesto borrado con éxito', // Título del Alert
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

  if (loading) return <Loading />;

  return (
    <>
      <BackButton />
      <Card>
        {up ? (
          <Text>Aca hay que realizar la edicion</Text>
        ) : (
          <>
            <Text>Fecha: {budgetId?.createdAt}</Text>
            <Text>Presupuesto-Id: {budgetId?._id}</Text>
            <Text>Cliente: {budgetId?.client?.name}</Text>
            <Text style={{fontWeight: 'bold'}}>Productos:</Text>
            {budgetId?.product.map((item: any) => (
              <View
                key={item._id}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10, fontSize: 12}}>•</Text>
                <Text>Nombre: {item.productId.name}, </Text>
                <Text>Cantidad: {item.quantity}, </Text>
                <Text>Precio: {item.productId.value} </Text>
              </View>
            ))}
            <Text>Total: {budgetId?.total}</Text>
            <Text>Responsable: {budgetId?.user.name}</Text>
            <Text style={{color: budgetId?.state ? 'green' : 'red'}}>
              Estado: {budgetId?.state ? 'Activo' : 'Inactivo'}
            </Text>
          </>
        )}
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={budgetId?.state === false}
          style={[
            styles.btn,
            {backgroundColor: budgetId?.state ? '#f23939' : '#ccc'},
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
