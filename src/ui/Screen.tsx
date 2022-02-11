import React from 'react';
import {View} from './View';
import {ErrorHandler} from './ErrorHandler';

type Props = {
  children: React.ReactNode;
};

export const Screen = ({children}: Props) => (
  <ErrorHandler>
    <View flexDirection="column" paddingHorizontal="m" flex={1} bg="background">
      {children}
    </View>
  </ErrorHandler>
);
