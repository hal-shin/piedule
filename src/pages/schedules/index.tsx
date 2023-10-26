import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { ClockView } from '@/components/Clock/ClockView';
import { Container } from '@/components/Container';
import { api } from '@/utils/api';

export default function Dashboard() {
  const pies = api.pie.getAll.useQuery();

  return (
    <Box width="100%" mt={8}>
      <Tabs variant="soft-rounded" colorScheme="green">
        <Container>
          <Heading size="md" mb={2}>
            Schedules
          </Heading>
          <TabList overflowX="auto" position="relative" py={2}>
            {pies.data?.map((pie) => (
              <Tab key={`pie-tab-${pie.id}`}>{pie.name}</Tab>
            ))}
            <Button
              as={Link}
              href="/schedules/create"
              variant="ghost"
              style={{ textDecoration: 'none' }}
              minW="108px"
              position="sticky"
              right={0}
              bgColor="white"
              ml={pies.data?.length ? 2 : 0}
            >
              + Add New
            </Button>
          </TabList>
        </Container>
        <TabPanels>
          {pies.data?.map((pie) => (
            <TabPanel key={`pie-${pie.id}`} p={0}>
              <ClockView pie={pie} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
