import { Box, Flex, Switch, Text, VStack } from '@chakra-ui/react';
import { type Pie } from '@prisma/client';
import React from 'react';
import { api } from '@/utils/api';
import { Section } from './ClockSection';

interface ClockSettingsSectionProps {
  pie: Pie;
}

export const ClockSettingsSection = ({ pie }: ClockSettingsSectionProps) => {
  const utils = api.useUtils();
  const updatePie = api.pie.updateSettings.useMutation({
    onSuccess: () => {
      void utils.pie.getAll.invalidate();
    },
  });

  const HideUnscheduledOption = () => {
    return (
      <SettingsItem
        title="Hide unscheduled labels"
        description="For a cleaner visual"
      >
        <Switch
          isChecked={!Boolean(pie.showUnscheduled)}
          onChange={() => {
            console.log('Clicked');
            updatePie.mutate({
              id: pie.id,
              showUnscheduled: !pie.showUnscheduled,
            });
          }}
        />
      </SettingsItem>
    );
  };

  return (
    <Section title="Settings">
      <VStack align="stretch">
        <HideUnscheduledOption />
      </VStack>
    </Section>
  );
};

const SettingsItem = ({
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex>
      <Box flex={1}>
        <Text fontWeight="bold">{title}</Text>
        <Text color="gray.500">{description}</Text>
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
};
