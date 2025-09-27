import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import {BudgetStackParams} from '../../navigation/budgetNavigation/BudgetNavigation';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {deleteBudgetById} from '../../../actions/budget/deleteBudgetById';
import {getBudgetById} from '../../../actions/budget/getBudgetById';
import {
  ApiBudgetUpdateSend,
  Budget,
} from '../../../infrastructure/budget.response';
import {Loading} from '../../components/loading/Loading';
import {updateBudgetById} from '../../../actions/budget/updateBudgetById';
import {getProduct} from '../../../actions/product/getProduct';
import {getClient} from '../../../actions/client/getClient';
import {Client} from '../../../infrastructure/client.response';
import {Product} from '../../../infrastructure/product.response';
import {Picker} from '@react-native-picker/picker';

export const BudgetIdScreen = () => {
  const navigation = useNavigation();
  const params =
    useRoute<RouteProp<BudgetStackParams, 'BudgetIdScreen'>>().params;
  const [budgetId, setBudgetId] = useState<Budget>();
  const [formState, setFormState] = useState<Budget | any>();

  const [up, setUp] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [client, setClient] = useState<Client[]>([]);
  const [product, setProduct] = useState<Product[]>([]);

  // productId -> quantity (string para TextInput)
  const [selected, setSelected] = useState<Record<string, string>>({});

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

  // Cargar clientes y setear default
  useEffect(() => {
    setLoading(true);
    getClient()
      .then(elem => {
        const cli = elem?.allClient || [];
        setClient(cli);
        const firstId = cli.length > 0 && cli[0]?._id ? cli[0]._id : '';
        setFormState((prev: any) => ({...prev, client: firstId})); // ✅ client, no "prod"
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  // Cargar productos y setear default
  useEffect(() => {
    setLoading(true);
    getProduct()
      .then(elem => {
        const prod = elem?.allProduct || [];
        setProduct(prod);
        const firstId = prod.length > 0 && prod[0]?._id ? prod[0]._id : '';
        setFormState((prev: any) => ({...prev, product: firstId})); // ✅ product, no "prod"
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = () => {
    setUp(prev => {
      const next = !prev;
      // si estamos entrando a edición y hay clientes cargados
      if (!prev && next && client.length) {
        setFormState((prevFs: any) => {
          const curr = prevFs?.client;
          const currId = typeof curr === 'string' ? curr : curr?._id;
          return {...prevFs, client: currId || client[0]._id}; // ← usa el del budget o el primero
        });
      }
      return next;
    });
  };

  const handleConfirm = async () => {
    // construir productos desde la selección de la UI
    const productsPayload = Object.entries(selected)
      .map(([productId, qtyStr]) => ({
        productId,
        quantity: Math.max(1, parseInt(qtyStr || '1', 10)),
      }))
      .filter(it => Number.isFinite(it.quantity) && it.quantity > 0);

    if (productsPayload.length === 0) {
      Alert.alert('Seleccioná al menos un producto');
      return;
    }

    // 👇 tomar el id desde formState.client (string o objeto populado)
    const clientId =
      typeof formState?.client === 'string'
        ? formState.client
        : formState?.client?._id;

    const payload: ApiBudgetUpdateSend = {
      client: clientId || undefined,
      products: productsPayload,
    };

    try {
      const res = await updateBudgetById(params.budgetId, payload);
      // refrescar la vista con lo que devuelve el back
      if (res) {
        setBudgetId(res.budget);
        setFormState(res.budget);
        Alert.alert('Presupuesto actualizado con exito', '', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
        setUp(false); // salir del modo edición, si querés
      }
    } catch (e) {
      console.error(e);
      Alert.alert(
        'Error',
        e instanceof Error ? e.message : 'Error al actualizar',
      );
    }
  };

  // toggle selección
  const toggleProduct = (id: string) => {
    setSelected(prev => {
      const next = {...prev};
      if (next[id]) delete next[id]; // des-seleccionar
      else next[id] = '1'; // seleccionar con cantidad 1
      return next;
    });
  };

  // cambiar cantidad
  const changeQty = (id: string, t: string) => {
    // solo dígitos; permití vacío mientras se tipea
    const cleaned = t.replace(/[^\d]/g, '');
    setSelected(prev => ({...prev, [id]: cleaned}));
  };

  const ready =
    !!budgetId && // ya tengo el presupuesto
    client.length > 0 && // ya tengo clientes
    product.length > 0; // ya tengo productos

  if (!ready) return <Loading />;

  return (
    <>
      <BackButton />
      <Card>
        {up ? (
          <>
            <Text style={{marginTop: 1, color: '#ccc'}}>Cliente:</Text>
            <Picker
              style={{
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 8,
                marginTop: 5,
              }}
              selectedValue={
                typeof formState?.client === 'string'
                  ? formState.client
                  : formState?.client?._id
              }
              onValueChange={(val: string) =>
                setFormState((prev: any) => ({...prev, client: val}))
              }
              dropdownIconColor="#000">
              {client.map(elem => (
                <Picker.Item
                  key={elem._id}
                  label={elem.name}
                  value={elem._id}
                />
              ))}
            </Picker>

            <Text style={{marginTop: 12, color: '#ccc'}}>
              Productos (múltiple):
            </Text>

            {/* Lista simple con “checkbox” y cantidad */}
            <View style={{marginTop: 6}}>
              {product.map(p => {
                const isOn = !!selected[String(p._id)];
                return (
                  <View
                    key={p._id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderBottomColor: '#333',
                      borderBottomWidth: 1,
                      gap: 10,
                    }}>
                    <Pressable
                      onPress={() => toggleProduct(String(p._id))}
                      style={{
                        width: 22,
                        height: 22,
                        borderWidth: 1,
                        borderColor: '#888',
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isOn ? '#4caf50' : 'transparent',
                      }}>
                      {isOn ? (
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          ✓
                        </Text>
                      ) : null}
                    </Pressable>

                    <View style={{flex: 1}}>
                      <Text style={{color: 'tomato'}}>{p.name}</Text>
                    </View>

                    {isOn && (
                      <TextInput
                        keyboardType="numeric"
                        value={selected[String(p._id)] ?? ''}
                        onChangeText={t => changeQty(String(p._id), t)}
                        style={{
                          width: 64,
                          borderWidth: 1,
                          borderColor: '#666',
                          borderRadius: 6,
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          color: 'blue',
                          textAlign: 'center',
                        }}
                        placeholder="1"
                        placeholderTextColor="#777"
                      />
                    )}
                  </View>
                );
              })}
            </View>

            <Button title="Confirmar" onPress={handleConfirm}></Button>
          </>
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
