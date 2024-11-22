import {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from 'react-native';

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  height?: number;
}

export const Card = ({style, children, height}: Props) => {
  return <View style={[styles.mainView, style, {height}]}>{children}</View>;
};

export interface ThemeColors {
  cardBackground: string;
}
export const colors: ThemeColors = {
  cardBackground: 'white',
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
