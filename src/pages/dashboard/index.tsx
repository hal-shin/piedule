import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Clock } from '@/components/Clock';
import { Container } from '@/components/Container';
import { api } from '@/utils/api';

export default function Dashboard() {
  const pies = api.pie.getAll.useQuery();

  return (
    <Box width="100%">
      <Tabs variant="soft-rounded" colorScheme="green" mt={4}>
        <Container>
          <TabList overflowX="auto" position="relative">
            {pies.data?.map((pie) => (
              <Tab key={`pie-tab-${pie.id}`}>{pie.name}</Tab>
            ))}
            <Button
              as={Link}
              href="/dashboard/schedules/create"
              variant="ghost"
              colorScheme="green"
              style={{ textDecoration: 'none' }}
              minW="108px"
              position="sticky"
              right={0}
              bgColor="white"
              ml={2}
            >
              + Add New
            </Button>
          </TabList>
        </Container>
        <TabPanels>
          {pies.data?.map((pie) => (
            <TabPanel key={`pie-${pie.id}`}>
              <Clock name={pie.name} data={pie.slices} />
              <Container>
                <Button
                  as={Link}
                  href={`/dashboard/schedules/${pie.id}/slice/create`}
                  style={{ textDecoration: 'none' }}
                >
                  Add Time Slice
                </Button>
              </Container>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
