import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export const Span = (props: Props) => {
  return (
    <Text onPress={props.onPress} style={[styles.span, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  span: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 26,
    color: '#46466A',
  },
});
