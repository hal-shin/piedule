import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { type Pie, type Slice } from '@prisma/client';
import dayjs from 'dayjs';
import React from 'react';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { sortByStartTime } from '@/utils/time';
import { Section } from './ClockSection';
import { DeleteSliceButton } from './DeleteSliceButton';
import { EditSliceButton } from './EditSliceButton';

interface ClockEventsProps {
  pie: Pie;
  slices: Array<Slice>;
}

export const ClockEventsSection = ({ pie, slices }: ClockEventsProps) => {
  const isDark = useIsDarkMode();
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Section title="Events">
      <VStack alignItems="flex-start">
        {slices.length === 0 && <Text>No events yet.</Text>}
        {slices.sort(sortByStartTime).map((slice) => {
          const ft = dayjs(`2000-01-01 ${slice.start}`);
          const tt = dayjs(`2000-01-01 ${slice.end}`);
          const mins = tt.diff(ft, 'minutes', true);
          const totalHours = Math.floor(mins / 60);
          const totalMins = dayjs().minute(mins).minute();

          return (
            <Flex
              key={slice.id}
              bgColor={bgColor}
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
                  minHeight="20px"
                  minWidth="20px"
                  bgColor={slice.color ?? ''}
                  mr={2}
                  borderWidth={isDark ? '2px' : 0}
                  borderColor="white"
                />
                <Text mr={4}>{slice.name}</Text>
              </Flex>
              <Flex align="center" gap={4}>
                <Box textAlign="end">
                  <Text whiteSpace="nowrap">
                    {slice.start} to {slice.end}
                  </Text>
                  <Text whiteSpace="nowrap" fontSize="0.75rem">
                    {totalHours
                      ? `${totalHours} hour${totalHours !== 1 ? 's' : ''}`
                      : ''}
                    {totalMins
                      ? `${totalHours > 0 ? ' and ' : ''} ${totalMins} minute${
                          totalMins !== 1 ? 's' : ''
                        }`
                      : ''}
                  </Text>
                </Box>
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
