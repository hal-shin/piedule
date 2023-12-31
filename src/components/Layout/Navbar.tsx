import { Link } from '@chakra-ui/next-js';
import {
  Button,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { Container } from '@/components/Container';
import { DarkModeButton } from '@/components/Layout/DarkModeButton';
import { APP_NAME, NAVBAR_HEIGHT } from '@/constants';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      position="fixed"
      top={0}
      zIndex={50}
      width="100%"
    >
      <Container
        display="flex"
        boxSizing="border-box"
        height={NAVBAR_HEIGHT + 'px'}
        justifyContent="space-between"
        alignItems="center"
        maxW="container.sm"
        bgColor={bgColor}
        borderBottomRadius={{ base: 0, md: 8 }}
        boxShadow="sm"
      >
        <Heading
          as={Link}
          href="/"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          size="lg"
        >
          {APP_NAME}
        </Heading>
        <HStack flex={1} ml={8}>
          <Button
            as={Link}
            href={`/schedules`}
            style={{ textDecoration: 'none' }}
            variant="link"
          >
            My Schedules
          </Button>
        </HStack>
        <Flex gap={4}>
          {!isAuthenticated ? (
            <Button
              onClick={() => signIn(undefined, { callbackUrl: '/schedules' })}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={() => signIn(undefined, { callbackUrl: '/schedules' })}
            >
              Logout
            </Button>
          )}
          <DarkModeButton />
        </Flex>
      </Container>
    </Flex>
  );
};
