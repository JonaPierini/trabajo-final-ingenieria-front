import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import {BackButton} from '../../components/backButton/BackButton';
import {Card} from '../../components/card/Card';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {getProduct} from '../../../actions/product/getProduct';
import {Product} from '../../../infrastructure/product.response';
import {getClient} from '../../../actions/client/getClient';
import {Client} from '../../../infrastructure/client.response';
import {newBudget} from '../../../actions/budget/newBudget';
import {Loading} from '../../components/loading/Loading';

export const NewBudgetScreen = () => {
  const navigation = useNavigation();
  const [client, setClient] = useState<Client[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [formState, setFormState] = useState<any>({
    client: '',
    product: '',
    quantity: 1,
    state: true,
  });

  // productId -> quantity (string para TextInput)
  const [selected, setSelected] = useState<Record<string, string>>({});

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

  const handleNewProduct = () => {
    // construir payload: [{ productId, quantity }]
    const productPayload = Object.entries(selected).map(
      ([productId, qtyStr]) => ({
        productId,
        quantity: Math.max(1, Number(qtyStr) || 1),
      }),
    );

    const payload = {
      client: formState.client,
      product: productPayload,
      state: formState.state,
    };

    newBudget(payload)
      .then(() => {
        Alert.alert('Presupuesto creado con éxito', '', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(e => {
        console.log(e);
        Alert.alert('Error', e.message);
      });
  };

  if (loading) return <Loading />;

  return (
    <View>
      <BackButton />
      <Card>
        <Text style={{marginTop: 1, color: '#ccc'}}>Cliente:</Text>
        <Picker
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 5,
          }}
          selectedValue={formState.client} // ✅ string
          onValueChange={(val: string) =>
            setFormState((prev: any) => ({...prev, client: val}))
          }
          dropdownIconColor="#000">
          {client.map(elem => (
            <Picker.Item key={elem._id} label={elem.name} value={elem._id} />
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
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>✓</Text>
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

        <Button title="Confirmar" onPress={handleNewProduct} />
      </Card>
    </View>
  );
};
