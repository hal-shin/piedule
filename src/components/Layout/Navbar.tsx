import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { APP_NAME, NAVBAR_HEIGHT } from '@/constants';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      height={NAVBAR_HEIGHT + 'px'}
      position="fixed"
      top={0}
      zIndex={50}
      width="100vw"
    >
      <Container
        maxW="container.sm"
        display="flex"
        justifyContent="space-between"
        bgColor="orange.100"
        borderBottomRadius={8}
        py={2}
        px={2}
      >
        <Heading>{APP_NAME}</Heading>
        <Flex>
          {!isAuthenticated ? (
            <Button
              onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
