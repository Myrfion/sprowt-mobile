import React from 'react';
import {ScrollView as NativeScrollView, StyleSheet} from 'react-native';
import {ErrorHandler} from './ErrorHandler';

type Props = {
  children: React.ReactNode;
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 16,
  },
});

export const ScrollView = ({children}: Props) => (
  <ErrorHandler>
    <NativeScrollView style={styles.root}>{children}</NativeScrollView>
  </ErrorHandler>
);
