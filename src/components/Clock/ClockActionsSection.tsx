import { Link } from '@chakra-ui/next-js';
import { Button, HStack } from '@chakra-ui/react';
import { Pie, Slice } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { Section } from './ClockSection';

interface ClockActionsSectionProps {
  pie: Pie;
  slices: Array<Slice>;
}

export const ClockActionsSection = ({
  pie,
  slices,
}: ClockActionsSectionProps) => {
  const router = useRouter();

  return (
    <Section title="Actions">
      <HStack>
        <Button
          as={Link}
          href={`/schedules/${pie.slug}/slices/create`}
          style={{ textDecoration: 'none' }}
        >
          Add Event
        </Button>
        <Button
          colorScheme="blue"
          variant="solid"
          onClick={() =>
            router.push({
              pathname: '/schedules/edit',
              query: {
                id: pie.id,
                name: pie.name,
                description: pie.description,
              },
            })
          }
        >
          Edit Schedule
        </Button>
        <Button colorScheme="red" variant="solid">
          Delete Schedule
        </Button>
      </HStack>
    </Section>
  );
};
