import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Container } from '@/components/Container';
import { APP_NAME, NAVBAR_HEIGHT } from '@/constants';

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  return (
    <Container
      bgColor="blue.50"
      minHeight={NAVBAR_HEIGHT + 'px'}
      display="flex"
      borderTopRadius={8}
      mt={8}
      px={4}
      py={6}
    >
      <Flex flex={1} alignItems="flex-start">
        <Heading size="md">{APP_NAME}</Heading>
      </Flex>
      <Box flex={2}>
        <Text>
          {APP_NAME} is a planner app that helps you visualize your entire day
          on a 24-hour clock.
        </Text>
      </Box>
    </Container>
  );
};
