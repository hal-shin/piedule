import { Spinner, type SpinnerProps } from '@chakra-ui/react';
import React from 'react';

interface LoadingProps extends SpinnerProps {}

export const Loading = (props: LoadingProps) => {
  return <Spinner color="blue.500" {...props} />;
};
