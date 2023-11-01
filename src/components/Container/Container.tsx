import {
  Container as ChakraContainer,
  type ContainerProps as ChakraContainerProps,
} from '@chakra-ui/react';
import React from 'react';

interface ContainerProps extends ChakraContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children, ...rest }: ContainerProps) => {
  return (
    <ChakraContainer maxW="container.sm" {...rest}>
      {children}
    </ChakraContainer>
  );
};
