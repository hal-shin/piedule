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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ClockView } from '@/components/Clock/ClockView';
import { Container } from '@/components/Container';
import { Loading } from '@/components/Loading';
import { api } from '@/utils/api';

export default function Dashboard() {
  const router = useRouter();
  const pies = api.pie.getAll.useQuery();

  const selectedSlug = router.query.slug as string;
  const pieIndex = pies.data?.findIndex((pie) => pie.slug === selectedSlug);

  if (pies.isLoading) return <Loading />;

  return (
    <Box width="100%" mt={8}>
      <Tabs variant="soft-rounded" colorScheme="green" index={pieIndex}>
        <Container>
          <Flex mb={2}>
            <Heading size="md" flex={1}>
              Schedules
            </Heading>
            <Button
              as={Link}
              href="/schedules/create"
              variant="ghost"
              style={{ textDecoration: 'none' }}
              minW="108px"
              position="sticky"
              right={0}
              ml={pies.data?.length ? 2 : 0}
            >
              + Add New
            </Button>
          </Flex>

          <TabList overflowX="auto" position="relative" py={2}>
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
