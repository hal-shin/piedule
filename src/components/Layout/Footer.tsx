import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { Container } from '@/components/Container';
import { APP_NAME, GITHUB_LINK, NAVBAR_HEIGHT } from '@/constants';

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  return (
    <Container
      bgColor="blue.50"
      minHeight={NAVBAR_HEIGHT + 'px'}
      display="flex"
      borderTopRadius={8}
      mt={16}
      px={4}
      py={6}
    >
      <Box flex={1} alignItems="flex-start">
        <Heading size="md">{APP_NAME}</Heading>
        <IconButton
          as={'a'}
          aria-label="GitHub"
          icon={<FaGithub />}
          href={GITHUB_LINK}
          variant="ghost"
          fontSize="22px"
          colorScheme="alphaWhite"
          mx={0}
        />
      </Box>
      <Box flex={2}>
        <Text>
          {APP_NAME} is a planner app that helps you visualize your entire day
          on a 24-hour clock.
        </Text>
      </Box>
    </Container>
  );
};
