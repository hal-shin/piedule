import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  type IconProps,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { Clock } from '@/components/Clock';
import { useIsLoggedIn } from '@/hooks';

export const HeroSection = () => {
  const isLoggedIn = useIsLoggedIn();
  const blobColor = useColorModeValue('red.50', 'red.400');

  console.log('isLoggedIn:', isLoggedIn);

  return (
    <Container maxW={'6xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              // _after={{
              //   content: "''",
              //   width: 'full',
              //   height: '30%',
              //   position: 'absolute',
              //   bottom: 1,
              //   left: 0,
              //   bg: 'red.400',
              //   zIndex: -1,
              // }}
            >
              Visualize your day
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              with a pie chart!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Piedule is a personal day planning app in the shape of a pie!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            {!isLoggedIn ? (
              <Button
                onClick={() => signIn(undefined, { callbackUrl: '/schedules' })}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                bg={'red.400'}
                _hover={{ bg: 'red.500' }}
              >
                Get Started
              </Button>
            ) : (
              <Button
                as={Link}
                href="/schedules"
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                bg={'red.400'}
                _hover={{ bg: 'red.500', textDecor: 'none' }}
              >
                Go to Dashboard
              </Button>
            )}
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={-1}
            color={blobColor}
          />
          <Box position={'relative'} width={'full'}>
            <Clock
              name="Monday"
              settings={{ showUnscheduled: true }}
              data={[
                {
                  name: 'Sleep',
                  start: '00:00',
                  end: '07:00',
                  color: '#023047',
                },
                {
                  name: 'Breakfast',
                  start: '07:00',
                  end: '08:00',
                  color: '#fb8500',
                },
                {
                  name: 'School',
                  start: '08:00',
                  end: '12:00',
                  color: '#219ebc',
                },
                {
                  name: 'Lunch',
                  start: '12:00',
                  end: '13:00',
                  color: '#fb8500',
                },
                {
                  name: 'Part-Time Job',
                  start: '13:00',
                  end: '16:00',
                  color: '#ffb703',
                },
                {
                  name: 'Free Time',
                  start: '16:00',
                  end: '18:30',
                  color: '#3a5a40',
                },
                {
                  name: 'Dinner',
                  start: '18:30',
                  end: '19:30',
                  color: '#fb8500',
                },
                {
                  name: 'Study',
                  start: '19:30',
                  end: '23:00',
                  color: '#8ecae6',
                },
                {
                  name: 'Sleep',
                  start: '23:00',
                  end: '24:00',
                  color: '#023047',
                },
              ]}
              width="100%"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
