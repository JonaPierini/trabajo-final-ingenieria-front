import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeUserStackParams} from '../../navigation/homeUserNavigation/HomeUserNavigation';

export const HomeScreenUser = () => {
  const {logout, user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<HomeUserStackParams>>();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>ROL: {user?.rol}</Text>
        </View>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.centerContent}
        onPress={() =>
          navigation.navigate('HomeScreenUserId', {
            userId: user?._id ?? '',
            name: user?.name ?? '',
            email: user?.email ?? '',
            rol: user?.rol ?? '',
            state: user?.state ?? false,
            password: user?.password ?? '',
          })
        }>
        <Text style={styles.welcomeText}>Bienvenido {user?.name}</Text>
        <Icon name={'user-circle'} size={150} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: '#1e88e5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  roleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
