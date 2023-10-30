import '@/libs/dayjs';
import '@/styles/globals.css';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Footer } from '@/components/Layout/Footer';
import { Navbar } from '@/components/Layout/Navbar';
import { NAVBAR_HEIGHT } from '@/constants';
import { theme } from '@/theme';
import { api } from '@/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Flex minHeight="100vh" flexDir="column" align="stretch">
          <Navbar />
          <Flex as="main" pt={NAVBAR_HEIGHT + 'px'} flex={1} overflowX="hidden">
            <Component {...pageProps} />
          </Flex>
          <Footer />
        </Flex>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
