import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Pie, Slice } from '@prisma/client';
import React from 'react';
import { Clock } from '@/components/Clock/Clock';
import { Container } from '@/components/Container';
import { sortByStartTime } from '@/utils/time';

interface ClockViewProps {
  pie: Pie & { slices: Array<Slice> };
}

export const ClockView = ({ pie }: ClockViewProps) => {
  return (
    <div>
      <Clock name={pie.name} data={pie.slices} />
      <Container>
        <Box mb={4}>
          <Heading size="md" pb={4}>
            Actions
          </Heading>
          <HStack>
            <Button
              as={Link}
              href={`/schedules/${pie.id}/slice/create`}
              style={{ textDecoration: 'none' }}
            >
              Add Event
            </Button>
            <Button colorScheme="blue" variant="solid">
              Edit Schedule
            </Button>
            <Button colorScheme="red" variant="solid">
              Delete Schedule
            </Button>
          </HStack>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Events
          </Heading>
          <VStack alignItems="flex-start">
            {pie.slices.length === 0 && <Text>No events yet.</Text>}
            {pie.slices.sort(sortByStartTime).map((slice) => {
              return (
                <Flex
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
                  <Text>
                    {slice.start} to {slice.end}
                  </Text>
                </Flex>
              );
            })}
          </VStack>
        </Box>
      </Container>
    </div>
  );
};
