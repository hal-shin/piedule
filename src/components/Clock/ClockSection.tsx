import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

interface SectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <Box>
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      {children}
    </Box>
  );
};
