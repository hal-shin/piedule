import { CircularProgress, CircularProgressProps } from '@chakra-ui/react';
import React from 'react';

interface LoadingProps extends CircularProgressProps {}

export const Loading = (props: LoadingProps) => {
  return <CircularProgress {...props} />;
};
