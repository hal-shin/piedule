import { VStack } from '@chakra-ui/react';
import { Pie } from '@prisma/client';
import React from 'react';
import { api } from '@/utils/api';
import { Section } from './ClockSection';

interface ClockSettingsSectionProps {
  pie: Pie;
}

export const ClockSettingsSection = ({ pie }: ClockSettingsSectionProps) => {
  const updatePie = api.pie.return(
    <Section title="Settings">
      <VStack></VStack>
    </Section>,
  );
};
