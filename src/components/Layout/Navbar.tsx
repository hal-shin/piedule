import { Button, Flex, Heading } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { Container } from '@/components/Container';
import { APP_NAME, NAVBAR_HEIGHT } from '@/constants';

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

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
        bgColor="orange.100"
        borderBottomRadius={8}
      >
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
          size="lg"
        >
          {APP_NAME}
        </Heading>
        <Flex>
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
        </Flex>
      </Container>
    </Flex>
  );
};
