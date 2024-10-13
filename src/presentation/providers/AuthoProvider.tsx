/* eslint-disable react/react-in-jsx-scope */
import {PropsWithChildren, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {RootStackParams} from '../navigation/appNavigation/AppNavigation';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {status} = useAuthStore();

  useEffect(() => {
    if (status === 'unAuthorized') {
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthNavigation'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'RouteNavigation'}],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return <>{children}</>;
};
