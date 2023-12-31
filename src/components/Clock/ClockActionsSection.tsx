import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { Button, HStack, type ButtonProps } from '@chakra-ui/react';
import { type Pie, type Slice } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { DeleteClockButton } from '@/components/Clock/DeleteClockButton';
import { Section } from './ClockSection';

const BUTTON_SIZE: ButtonProps['size'] = 'md';

interface ClockActionsSectionProps {
  pie: Pie;
  slices: Array<Slice>;
}

export const ClockActionsSection = ({ pie }: ClockActionsSectionProps) => {
  const router = useRouter();

  return (
    <Section title="Actions">
      <HStack flexWrap="wrap">
        <Button
          as={Link}
          href={`/schedules/${pie.slug}/slices/create`}
          style={{ textDecoration: 'none' }}
          leftIcon={<AddIcon />}
          size={BUTTON_SIZE}
        >
          Add Event
        </Button>
        <Button
          colorScheme="blue"
          variant="solid"
          leftIcon={<EditIcon />}
          size={BUTTON_SIZE}
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
        <DeleteClockButton pie={pie} />
      </HStack>
    </Section>
  );
};
