import { Container, ContainerProps, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

interface SectionProps extends FlexProps {
  container?: boolean;
  containerProps?: ContainerProps;
  children: React.ReactNode;
}

export const Section = ({
  container,
  containerProps,
  children,
  ...rest
}: SectionProps) => {
  return (
    <Flex flexDir="column" py={{ base: 8, md: 24 }} {...rest}>
      {container ? (
        <Container maxW="container.xl" {...containerProps}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Flex>
  );
};
