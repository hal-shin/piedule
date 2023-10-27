import { Text, VStack } from '@chakra-ui/react';
import { Pie, Slice } from '@prisma/client';
import React from 'react';
import { ClockSettingsSection } from '@/components/Clock/ClockSettingsSection';
import { Container } from '@/components/Container';
import { Loading } from '@/components/Loading';
import { api } from '@/utils/api';
import { Clock } from './Clock';
import { ClockActionsSection } from './ClockActionsSection';
import { ClockEventsSection } from './ClockEventsSection';

interface ClockViewProps {
  pie: Pie & { slices: Array<Slice> };
}

export const ClockView = ({ pie }: ClockViewProps) => {
  const slices = api.slice.getAll.useQuery({ pieId: pie.id });

  if (slices.isLoading) return <Loading />;
  if (!slices.data) return 'Something went wrong!';

  return (
    <>
      <Container>
        <Text color="gray.500">{pie.description}</Text>
      </Container>
      <Clock pie={pie} data={slices.data} />
      <Container>
        <VStack align="stretch" gap={12}>
          {slices.data && <ClockEventsSection pie={pie} slices={slices.data} />}
          <ClockActionsSection pie={pie} slices={slices.data} />
          <ClockSettingsSection pie={pie} />
        </VStack>
      </Container>
    </>
  );
};
