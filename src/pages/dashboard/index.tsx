import { Link } from '@chakra-ui/next-js';
import {
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Clock } from '@/components/Clock';
import { api } from '@/utils/api';

export default function Dashboard() {
  const router = useRouter();
  const pies = api.pie.getAll.useQuery();

  return (
    <Container border="1px solid red" maxW="container.lg">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          {pies.data?.map((pie) => (
            <Tab key={`pie-tab-${pie.id}`}>{pie.name}</Tab>
          ))}
          <Tab>Test</Tab>
          <Button
            as={Link}
            href="/dashboard/schedules/create"
            variant="ghost"
            colorScheme="green"
            style={{ textDecoration: 'none' }}
          >
            + Add New
          </Button>
        </TabList>
        <TabPanels>
          {pies.data?.map((pie) => (
            <TabPanel key={`pie-${pie.id}`}>
              <Clock name={pie.name} data={pie.slices} />
              <Button
                as={Link}
                href={`/dashboard/schedules/${pie.id}/slice/create`}
                style={{ textDecoration: 'none' }}
              >
                Add Time Slice
              </Button>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
