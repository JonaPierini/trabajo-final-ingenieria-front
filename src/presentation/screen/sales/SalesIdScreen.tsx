import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, Pressable, StyleSheet} from 'react-native';
import {SaleStackParams} from '../../navigation/salesNavigation/SalesNavigation';
import {Sale} from '../../../infrastructure/sale.response';
import {Client} from '../../../infrastructure/client.response';
import {Product} from '../../../infrastructure/product.response';
import {getSaleById} from '../../../actions/sale/getSaleById';
import {deleteSaleById} from '../../../actions/sale/deleteSaleById';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Loading} from '../../components/loading/Loading';

export const SalesIdScreen = () => {
  const navigation = useNavigation();
  const params = useRoute<RouteProp<SaleStackParams, 'SaleIdScreen'>>().params;
  const [loading, setLoading] = useState<boolean>(true);
  const [SaleId, setSaleId] = useState<Sale>();
  const [formState, setFormState] = useState<Sale | any>();
  const [client, setClient] = useState<Client[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  // productId -> quantity (string para TextInput)
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => {
    setLoading(true);
    getSaleById(params.saleId)
      .then(elem => {
        const sale = elem?.saleById;
        if (sale) {
          setSaleId(sale);
          setFormState(sale);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = () => {
    deleteSaleById(params.saleId)
      //      .then(() => setClientId(null))
      .then(() => {
        Alert.alert(
          'Venta borrada con éxito', // Título del Alert
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

  if (loading) return <Loading />;

  return (
    <>
      <BackButton />
      <Card>
        <Text style={{textAlign: 'center', fontWeight: '900'}}>VENTA</Text>
        <Text>Fecha: {SaleId?.createdAt}</Text>
        <Text>Venta-Id: {SaleId?._id}</Text>
        <Text>Cliente: {SaleId?.client?.name}</Text>
        <Text style={{fontWeight: 'bold'}}>Productos:</Text>
        {SaleId?.product.map((item: any) => (
          <View
            key={item._id}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 10, fontSize: 12}}>•</Text>
            <Text>Nombre: {item.productId.name}, </Text>
            <Text>Cantidad: {item.quantity}, </Text>
            <Text>Precio: {item.productId.value} </Text>
          </View>
        ))}
        <Text>Total: {SaleId?.total}</Text>
        <Text>Responsable: {SaleId?.user.name}</Text>
        <Text style={{color: SaleId?.state ? 'green' : 'red'}}>
          Estado: {SaleId?.state ? 'Activo' : 'Inactivo'}
        </Text>
      </Card>
      <View style={styles.btnContainer}>
        <Pressable
          disabled={SaleId?.state === false}
          style={[
            styles.btn,
            {backgroundColor: SaleId?.state ? '#f23939' : '#ccc'},
          ]}
          onPress={handleDelete}>
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
