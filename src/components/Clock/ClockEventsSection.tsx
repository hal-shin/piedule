import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Pie, Slice } from '@prisma/client';
import React from 'react';
import { sortByStartTime } from '@/utils/time';
import { Section } from './ClockSection';
import { DeleteSliceButton } from './DeleteSliceButton';
import { EditSliceButton } from './EditSliceButton';

interface ClockEventsProps {
  pie: Pie;
  slices: Array<Slice>;
}

export const ClockEventsSection = ({ pie, slices }: ClockEventsProps) => {
  return (
    <Section title="Events">
      <VStack alignItems="flex-start">
        {slices.length === 0 && <Text>No events yet.</Text>}
        {slices.sort(sortByStartTime).map((slice) => {
          return (
            <Flex
              key={slice.id}
              bgColor="gray.100"
              px={4}
              py={2}
              borderRadius={8}
              width="100%"
              justify="space-between"
            >
              <Flex align="center">
                <Box
                  height="20px"
                  width="20px"
                  bgColor={slice.color || ''}
                  mr={2}
                />
                <Text>{slice.name}</Text>
              </Flex>
              <Flex align="center">
                <Text mr={4}>
                  {slice.start} to {slice.end}
                </Text>
                <HStack>
                  <EditSliceButton slice={slice} pie={pie} />
                  <DeleteSliceButton slice={slice} />
                </HStack>
              </Flex>
            </Flex>
          );
        })}
      </VStack>
    </Section>
  );
};
