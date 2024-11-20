import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {ClientStackParams} from '../../navigation/clientNavigation/clientNavigation';

export const ClientId = () => {
  const params = useRoute<RouteProp<ClientStackParams, 'ClientId'>>().params;
  return (
    <View>
      <Text>
        Client Id: {params ? JSON.stringify(params) : 'No params available'}
      </Text>
    </View>
  );
};
