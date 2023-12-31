import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ClockView } from '@/components/Clock/ClockView';
import { Container } from '@/components/Container';
import { Loading } from '@/components/Loading';
import { api } from '@/utils/api';

export default function Dashboard() {
  const router = useRouter();
  const pies = api.pie.getAll.useQuery();

  const selectedSlug = router.query.slug as string;
  const pieIndex = pies.data?.findIndex((pie) => pie.slug === selectedSlug);

  useEffect(() => {
    if (!router.query.slug && pies.data && pies.data[0]) {
      void router.push({
        pathname: '/schedules',
        query: {
          slug: pies.data[0].slug,
        },
      });
    }

    // eslint-disable-next-line
  }, [router.query.slug]);

  if (pies.isLoading)
    return (
      <Flex justify="center" width="100%" mt={4}>
        <Loading />
      </Flex>
    );

  return (
    <Box width="100%" mt={8}>
      <Tabs variant="soft-rounded" colorScheme="green" index={pieIndex}>
        <Container>
          <Flex mb={2} align="center">
            <Heading size="md" flex={1}>
              Schedules
            </Heading>
            <Button
              as={Link}
              href="/schedules/create"
              variant="ghost"
              style={{ textDecoration: 'none' }}
            >
              + Add New
            </Button>
          </Flex>

          <TabList position="relative" overflow="auto">
            {pies.data?.length === 0 && (
              <Text>
                You don&apos;t have any schedules yet. Please create one!
              </Text>
            )}
            {pies.data?.map((pie) => (
              <Tab
                key={`pie-tab-${pie.id}`}
                id={pie.slug}
                onClick={() =>
                  router.push({
                    pathname: '/schedules',
                    query: {
                      slug: pie.slug,
                    },
                  })
                }
              >
                {pie.name}
              </Tab>
            ))}
          </TabList>
        </Container>
        <TabPanels>
          {pies.data?.map((pie) => (
            <TabPanel key={`pie-${pie.id}`} id={pie.slug} p={0}>
              <ClockView pie={pie} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
