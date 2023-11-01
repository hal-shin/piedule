import {
  As,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import {
  HiListBullet,
  HiMiniChartPie,
  HiMiniListBullet,
  HiMiniPaintBrush,
  HiOutlineListBullet,
  HiQueueList,
  HiSquare3Stack3D,
} from 'react-icons/hi2';
import { Section } from '@/components/Homepage/Section';

interface FeaturesSectionProps {}

export const FeaturesSection = ({}: FeaturesSectionProps) => {
  return (
    <Section container bgColor="red.400">
      <Heading size="2xl" color="white" mb={8} textAlign="center">
        Features
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={{ base: 8, md: 8 }}
        mx={{ base: 0, sm: 8, md: 0 }}
      >
        {[
          {
            title: 'Visualize Your Day',
            description: `Visualizing your day helps you understand where your time goes. 
              Take back control with knowledge.`,
            icon: HiMiniChartPie,
          },
          {
            title: 'Multiple Schedules',
            description: `Create different schedules for different days or different purposes.`,
            icon: HiSquare3Stack3D,
          },
          {
            title: 'Customize Your Pie',
            description: `Pie time slices are color adjustable to suit your own preferences.`,
            icon: HiMiniPaintBrush,
          },
        ].map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </SimpleGrid>
    </Section>
  );
};

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: As | undefined;
}) => {
  return (
    <Card
      variant="outlined"
      borderRadius="9999px"
      height="auto"
      width="100%"
      paddingTop="100%"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        height="100%"
        pt={{ base: '15%', sm: '20%', md: '15%', lg: '15%', xl: '20%' }}
        px={4}
      >
        <CardHeader textAlign="center">
          <Icon as={icon} color="red.400" mr={4} boxSize={8} />
          <Heading fontSize={{ base: '1.5rem', xl: '1.625rem' }}>
            {title}
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <Text textAlign="center" fontSize="lg">
            {description}
          </Text>
        </CardBody>
      </Box>
    </Card>
  );
};
