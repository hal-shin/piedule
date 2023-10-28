import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { Container } from '@/components/Container';
import { APP_NAME, GITHUB_LINK, NAVBAR_HEIGHT } from '@/constants';

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  const bgColor = useColorModeValue('blue.50', 'blue.700');

  return (
    <Container
      bgColor={bgColor}
      minHeight={NAVBAR_HEIGHT + 'px'}
      borderTopRadius={8}
      mt={16}
      px={4}
      py={4}
    >
      <Flex>
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
        <VStack flex={2} align="stretch">
          <Text>
            {APP_NAME} is a planner app that helps you visualize your entire day
            on a 24-hour clock.
          </Text>
          <Text>© {dayjs().year()} Hal Shin. All rights reserved.</Text>
        </VStack>
      </Flex>
    </Container>
  );
};
